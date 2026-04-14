import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import bbox from '@turf/bbox'; 
import { get3DExtrusionPaintStyle, getLinePaintStyle, getPointPaintStyle } from '../utils/mapStyles';
import { CENTROIDES_MUNICIPIOS } from '@/constants/municipiosCentroides';
import { FeatureCollection } from 'geojson';
import { MapStyles } from '@/constants';

interface MainMapProps {
  estadoActivo: string;
  municipioActivo: string;
  capasActivas: { id: number, datos: any }[]; 
  onMapClick?: (elementos: any[]) => void; 
  elementosSeleccionados?: any[]; 
}

export const MainMap: React.FC<MainMapProps> = ({ 
  estadoActivo, 
  municipioActivo, 
  capasActivas,
  onMapClick,
  elementosSeleccionados = []
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const estiloMapaClaro = MapStyles.white; 

  const fuentesMontadas = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: estiloMapaClaro,
      center: [-102.5528, 23.6345], 
      zoom: 4,
      pitch: 45, 
      bearing: -17.6 
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    const mapInstance = map.current;

    mapInstance.on('click', (e) => {

      const featuresCliqueados = mapInstance.queryRenderedFeatures(e.point).filter(f => 
         f.layer.id.startsWith('capa-renderizada-')
      );

      if (featuresCliqueados.length > 0 && onMapClick) {
        
        const propiedades = featuresCliqueados.map(f => f.properties);
        onMapClick(propiedades);
      } else if (featuresCliqueados.length === 0 && onMapClick) {
        
        onMapClick([]);
      }
    });

  }, [estiloMapaClaro, onMapClick]);

  useEffect(() => {
    if (!map.current || !estadoActivo || !municipioActivo) return;
    const coordenadas = CENTROIDES_MUNICIPIOS[estadoActivo]?.[municipioActivo];
    if (coordenadas) {
      map.current.flyTo({
        center: coordenadas,
        zoom: 13,
        essential: true,
        duration: 2000 
      });
    }
  }, [estadoActivo, municipioActivo]);

  useEffect(() => {
    const mapInstance = map.current;
    if (!mapInstance) return;

    const idsActivosCurrent = new Set(capasActivas.map(c => c.id));

    fuentesMontadas.current.forEach(idFuente => {
      if (!idsActivosCurrent.has(idFuente)) {
        if (mapInstance.getLayer(`capa-resaltada-${idFuente}`)) mapInstance.removeLayer(`capa-resaltada-${idFuente}`);
        if (mapInstance.getLayer(`capa-renderizada-${idFuente}`)) mapInstance.removeLayer(`capa-renderizada-${idFuente}`);
        if (mapInstance.getSource(`fuente-datos-${idFuente}`)) mapInstance.removeSource(`fuente-datos-${idFuente}`);
        
        fuentesMontadas.current.delete(idFuente);
      }
    });

    capasActivas.forEach(capaActivaObj => {
      
      if (!fuentesMontadas.current.has(capaActivaObj.id)) {
        try {
          const dataParseada = typeof capaActivaObj.datos === 'string' ? JSON.parse(capaActivaObj.datos) : capaActivaObj.datos;
          if (!dataParseada.features || dataParseada.features.length === 0) return;

          const featuresValidos = dataParseada.features.filter((feature: any) => 
            feature.geometry && feature.geometry.type
          );
          if (featuresValidos.length === 0) return;

          const geojsonLimpio: FeatureCollection = {
            type: 'FeatureCollection',
            features: featuresValidos
          };

          const idCapaName = capaActivaObj.id;

          mapInstance.addSource(`fuente-datos-${idCapaName}`, {
            type: 'geojson',
            data: geojsonLimpio 
          });

          const primerFeature = geojsonLimpio.features[0];
          const tipoGeometria = primerFeature.geometry.type; 
          
          const categoriaExtraida = primerFeature?.properties?.categoria_origen || 'DEFAULT';

          if (tipoGeometria.includes('LineString')) {
            mapInstance.addLayer({
              id: `capa-renderizada-${idCapaName}`, type: 'line', source: `fuente-datos-${idCapaName}`,
              paint: getLinePaintStyle(String(categoriaExtraida))
            });
          } else if (tipoGeometria.includes('Polygon')) {
            mapInstance.addLayer({
              id: `capa-renderizada-${idCapaName}`, type: 'fill-extrusion', source: `fuente-datos-${idCapaName}`,
              paint: get3DExtrusionPaintStyle(String(categoriaExtraida))
            });
          } else if (tipoGeometria.includes('Point')) {
            mapInstance.addLayer({
              id: `capa-renderizada-${idCapaName}`, type: 'circle', source: `fuente-datos-${idCapaName}`,
              paint: getPointPaintStyle(String(categoriaExtraida))
            });
          }

          mapInstance.on('mouseenter', `capa-renderizada-${idCapaName}`, () => {
            mapInstance.getCanvas().style.cursor = 'pointer';
          });
          mapInstance.on('mouseleave', `capa-renderizada-${idCapaName}`, () => {
            mapInstance.getCanvas().style.cursor = '';
          });

          const caja = bbox(geojsonLimpio) as [number, number, number, number];
          mapInstance.fitBounds(caja, { padding: 50, duration: 1500 });

          fuentesMontadas.current.add(idCapaName);

        } catch (error) {
          console.error(`Error al procesar la capa GeoJSON con id ${capaActivaObj.id}:`, error);
        }
      }
    });

  }, [capasActivas]); 

  useEffect(() => {
    const mapInstance = map.current;
    if (!mapInstance) return;

    fuentesMontadas.current.forEach(idFuente => {
      const highlightLayerId = `capa-resaltada-${idFuente}`;
      if (mapInstance.getLayer(highlightLayerId)) {
        mapInstance.removeLayer(highlightLayerId);
      }
    });

    if (!elementosSeleccionados || elementosSeleccionados.length === 0) return;

    const identificadoresActivos = elementosSeleccionados.map(e => e.OBJECTID || e.arcgis_id || e.id).filter(Boolean);

    if (identificadoresActivos.length === 0) return;

    const filterConditions = ['any', 
      ...identificadoresActivos.map(id => ['==', ['get', 'OBJECTID'], id]),
      ...identificadoresActivos.map(id => ['==', ['get', 'arcgis_id'], id]),
      ...identificadoresActivos.map(id => ['==', ['get', 'id'], id])
    ];

    fuentesMontadas.current.forEach(idFuente => {
      const sourceName = `fuente-datos-${idFuente}`;
      const highlightLayerId = `capa-resaltada-${idFuente}`;

      if (!mapInstance.getSource(sourceName)) return;

      const geometriaRepresentativa = mapInstance.querySourceFeatures(sourceName)[0]?.geometry?.type;

      if (geometriaRepresentativa?.includes('Polygon') || geometriaRepresentativa?.includes('LineString')) {
        mapInstance.addLayer({
          id: highlightLayerId, type: 'line', source: sourceName,
          filter: filterConditions as maplibregl.FilterSpecification,
          paint: { 'line-color': '#10b981', 'line-width': 4, 'line-opacity': 1 }
        });
      } else if (geometriaRepresentativa?.includes('Point')) {
        mapInstance.addLayer({
          id: highlightLayerId, type: 'circle', source: sourceName,
          filter: filterConditions as maplibregl.FilterSpecification,
          paint: {
            'circle-color': 'transparent',
            'circle-stroke-color': '#10b981',
            'circle-stroke-width': 4,
            'circle-radius': 10 
          }
        });
      }
    });

  }, [elementosSeleccionados, capasActivas]); 

  return (
    <div ref={mapContainer} className="absolute inset-0 w-full h-full bg-slate-100" />
  );
};