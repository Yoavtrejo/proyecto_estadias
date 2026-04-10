"use client";

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MaplibreComponentProps {
    center?: [number, number];
    zoom?: number;
    className?: string;
}

export default function MaplibreComponent({ 
    center = [-99.1332, 19.4326], // Default to Mexico City
    zoom = 5,
    className = "h-full w-full rounded-2xl"
}: MaplibreComponentProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (map.current) return; // Initialize only once
        if (!mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://demotiles.maplibre.org/style.json',
            center: center,
            zoom: zoom,
        });

        // Add controls
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [center, zoom]);

    return (
        <div ref={mapContainer} className={className} />
    );
}
