import api from '@services/api';

export const getLayersByMunicipality = async (estado:string, municipio:string) => {
    const responde = await api.get('subir-capa/',{
        params:{ estado, municipio }
    });
    return responde.data;
}