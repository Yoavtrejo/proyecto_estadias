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
  capaGeoJSON: FeatureCollection | null; 
  onPolygonClick?: (propiedades: any) => void; 
  predioSeleccionado?: any; 
}

export const MainMap: React.FC<MainMapProps> = ({ 
  estadoActivo, 
  municipioActivo, 
  capaGeoJSON,
  onPolygonClick,
  predioSeleccionado
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const estiloMapaClaro = MapStyles.white; 

  // 1. INICIALIZACIÓN DEL MAPA
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
  }, [estiloMapaClaro]);

  // 2. EFECTO DE VUELO AL MUNICIPIO SELECCIONADO
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

  // 3. EFECTO PARA CARGAR CAPA, TURF.JS Y EVENTOS DE CLIC
  useEffect(() => {
    if (!map.current || !capaGeoJSON) return;

    try {
      // Filtro de Seguridad: Convertir string si es necesario
      const dataParseada = typeof capaGeoJSON === 'string' ? JSON.parse(capaGeoJSON) : capaGeoJSON;

      if (!dataParseada.features || dataParseada.features.length === 0) return;

      // Filtro de Seguridad: Ignorar geometrías corruptas o nulas
      const featuresValidos = dataParseada.features.filter((feature: any) => 
        feature.geometry && feature.geometry.type
      );

      if (featuresValidos.length === 0) return;

      const geojsonLimpio: FeatureCollection = {
        type: 'FeatureCollection',
        features: featuresValidos
      };

      // Calcular BBOX con los datos limpios
      const caja = bbox(geojsonLimpio) as [number, number, number, number];
      map.current.fitBounds(caja, { padding: 50, duration: 1500 });

      const mapInstance = map.current;
      const primerFeature = geojsonLimpio.features[0];
      const tipoGeometria = primerFeature.geometry.type; 
      const categoriaExtraida = primerFeature?.properties?.categoria_origen || 'DEFAULT';
      
      if (mapInstance.getLayer('capa-renderizada')) mapInstance.removeLayer('capa-renderizada');
      if (mapInstance.getSource('fuente-datos')) mapInstance.removeSource('fuente-datos');

      mapInstance.addSource('fuente-datos', {
        type: 'geojson',
        data: geojsonLimpio 
      });

      // Dibujar la capa
      if (tipoGeometria.includes('LineString')) {
        mapInstance.addLayer({
          id: 'capa-renderizada', type: 'line', source: 'fuente-datos',
          paint: getLinePaintStyle(String(categoriaExtraida))
        });
      } else if (tipoGeometria.includes('Polygon')) {
        mapInstance.addLayer({
          id: 'capa-renderizada', type: 'fill-extrusion', source: 'fuente-datos',
          paint: get3DExtrusionPaintStyle(String(categoriaExtraida))
        });
      } else if (tipoGeometria.includes('Point')) {
        mapInstance.addLayer({
          id: 'capa-renderizada', type: 'circle', source: 'fuente-datos',
          paint: getPointPaintStyle(String(categoriaExtraida))
        });
      }

      // ========================================================
      // ¡AQUÍ ESTÁN LOS EVENTOS DE CLIC QUE SE HABÍAN BORRADO!
      // ========================================================
      
      // Cursor de manita interactivo
      mapInstance.on('mouseenter', 'capa-renderizada', () => {
        mapInstance.getCanvas().style.cursor = 'pointer';
      });
      mapInstance.on('mouseleave', 'capa-renderizada', () => {
        mapInstance.getCanvas().style.cursor = '';
      });

      // El Clic mágico que le avisa al Dashboard
      mapInstance.on('click', 'capa-renderizada', (e) => {
        if (e.features && e.features.length > 0 && onPolygonClick) {
          onPolygonClick(e.features[0].properties);
        }
      });

    } catch (error) {
      console.error("Error al procesar la capa GeoJSON:", error);
    }

  }, [capaGeoJSON, onPolygonClick]); 


  // 4. EFECTO DE RESALTADO UNIVERSAL (Borde Neón)
  useEffect(() => {
    if (!map.current || !map.current.getSource('fuente-datos')) return;

    const mapInstance = map.current;
    const highlightLayerId = 'capa-resaltada';

    if (!predioSeleccionado) {
      if (mapInstance.getLayer(highlightLayerId)) {
        mapInstance.removeLayer(highlightLayerId);
      }
      return;
    }

    const idElemento = predioSeleccionado.OBJECTID || predioSeleccionado.arcgis_id || predioSeleccionado.id;
    if (!idElemento) return;

    const tipoGeometria = mapInstance.querySourceFeatures('fuente-datos')[0]?.geometry?.type;

    if (mapInstance.getLayer(highlightLayerId)) {
      mapInstance.setFilter(highlightLayerId, ['==', ['get', 'OBJECTID'], idElemento]);
    } else {
      if (tipoGeometria?.includes('Polygon') || tipoGeometria?.includes('LineString')) {
        mapInstance.addLayer({
          id: highlightLayerId, type: 'line', source: 'fuente-datos',
          filter: ['==', ['get', 'OBJECTID'], idElemento],
          paint: { 'line-color': '#10b981', 'line-width': 4, 'line-opacity': 1 }
        });
      } else if (tipoGeometria?.includes('Point')) {
        mapInstance.addLayer({
          id: highlightLayerId, type: 'circle', source: 'fuente-datos',
          filter: ['==', ['get', 'OBJECTID'], idElemento],
          paint: {
            'circle-color': 'transparent',
            'circle-stroke-color': '#10b981',
            'circle-stroke-width': 4,
            'circle-radius': 10 
          }
        });
      }
    }
  }, [predioSeleccionado]); 


  return (
    <div className="w-full h-full min-h-[600px] rounded-lg overflow-hidden shadow-lg border border-gray-200 shrink-0">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};