import { ExpressionSpecification } from 'maplibre-gl';

export const CATEGORY_COLORS: Record<string, string> = {
    'CATASTRO': '#3B82F6',
    'EQUIPAMIENTO': '#F59E0B',
    'VEGETACION': '#22C55E',
    'VIAS': '#64748B',
    'HIDROLOGIA': '#0EA5E9',
    'ALTIMETRIA': '#A8A29E',
    'DEFAULT': '#94A3B8',
}

export const get3DExtrusionPaintStyle = (categoria: string) => {
    const color = CATEGORY_COLORS[categoria] || CATEGORY_COLORS['DEFAULT'];
    return {
        'fill-extrusion-color': color,
        'fill-extrusion-height': ['coalesce', ['get', 'altura_m'], 0] as ExpressionSpecification,
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': 0.8,
    };
}

export const getLinePaintStyle = (categoria: string) => {
    const color = CATEGORY_COLORS[categoria] || CATEGORY_COLORS['DEFAULT'];
    return {
        'line-color': color,
        'line-width': 2,
        'line-opacity': 0.8,
    };
};

export const getPointPaintStyle = (categoria: string) => {
  const color = CATEGORY_COLORS[categoria] || CATEGORY_COLORS['DEFAULT'];
  
  return {
    'circle-color': color,
    'circle-radius': 6,
    'circle-stroke-width': 2, 
    'circle-stroke-color': '#ffffff', 
    'circle-opacity': 0.9
  };
};