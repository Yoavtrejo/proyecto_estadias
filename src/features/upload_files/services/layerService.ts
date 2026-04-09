import api from "@/api/axiosconfig";

export const uploadLayer = async (
    nombre: string,
    estado: string,
    municipio: string,
    categoria: string,
    tipoGeometria: string,
    archivo: File
) => {
    const formData = new FormData();
    formData.append("nombre_capa", nombre);
    formData.append("estado", estado);
    formData.append("municipio", municipio);
    formData.append("categoria", categoria);
    formData.append("tipo_geometria", tipoGeometria);
    formData.append("archivo_original", archivo);

    const response = await api.post("/capa/subir-capa/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};