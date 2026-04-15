//API constants
// export const BASE_URL = 'http://100.98.231.47:8001/';
export const BASE_URL = 'http://192.168.0.19:8001/';
export const API_URL = `${BASE_URL}api/`;


// export const BASE_URL = 'http://192.168.3.29:8001/';
// export const API_URL = `${BASE_URL}api/`;
//App constants
export const CATEGORIAS = [
  { value: 'ALTIMETRIA', label: 'Altimetría' },
  { value: 'CATASTRO', label: 'Catastro' },
  { value: 'EQUIPAMIENTO', label: 'Equipamiento Urbano' },
  { value: 'ESTRUCTURA', label: 'Estructura Urbana' },
  { value: 'HIDROLOGIA', label: 'Hidrología' },
  { value: 'INFRAESTRUCTURA', label: 'Infraestructura' },
  { value: 'TOPOGRAFIA', label: 'Topografía' },
  { value: 'USOS_PREDIO', label: 'Usos de Predio' },
  { value: 'VEGETACION', label: 'Vegetación' },
  { value: 'VIAS', label: 'Vías' },
  { value: 'IZUCAR', label: 'Izúcar' },
  { value: 'OTROS', label: 'Otros' },
];

export const GEOMETRIAS = [
  { value: 'PUNTOS', label: 'Puntos' },
  { value: 'LINEAS', label: 'Líneas' },
  { value: 'POLIGONOS', label: 'Polígonos' },
];

export const MapStyles = {
  white: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
};