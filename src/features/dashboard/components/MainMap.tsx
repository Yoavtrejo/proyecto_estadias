import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import  bbox from '@turf/bbox';
import { CENTROIDES_MUNICIPIOS } from '@/constants/municipiosCentroides';

interface MainMapProps {
  estadoActivo: string;
  municipioActivo: string;
  capaGeoJSON: any | null; 
}

export const MainMap: React.FC<MainMapProps> = ({ estadoActivo, municipioActivo, capaGeoJSON }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  // 1. INICIALIZAR EL MAPA (Se ejecuta solo una vez)
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', 
      center: [-102.5528, 23.6345], 
      zoom: 4,
      pitch: 45, 
      bearing: -17.6 
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
  }, []);

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
    if (!map.current || !capaGeoJSON) return;

    const caja = bbox(capaGeoJSON) as [number, number, number, number];
    
    map.current.fitBounds(caja, {
      padding: 50, 
      duration: 1500
    });

    const mapInstance = map.current;
    
    if (mapInstance.getSource('capa-dinamica')) {
      (mapInstance.getSource('capa-dinamica') as maplibregl.GeoJSONSource).setData(capaGeoJSON);
    } else {
      mapInstance.addSource('capa-dinamica', {
        type: 'geojson',
        data: capaGeoJSON
      });

      mapInstance.addLayer({
        id: 'predios-3d',
        type: 'fill-extrusion', 
        source: 'capa-dinamica',
        paint: {
          'fill-extrusion-color': '#2563eb',
          'fill-extrusion-height': ['coalesce', ['get', 'altura_m'], 0],
          
          'fill-extrusion-opacity': 0.8
        }
      });
    }
  }, [capaGeoJSON]);

  return (
    <div className="w-full h-full min-h-[600px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};