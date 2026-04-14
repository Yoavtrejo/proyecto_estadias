import Swal from 'sweetalert2';

// Configuramos los colores institucionales para que coincidan con tu Login
const COLORS = {
    primary: '#004A61', // Azul oscuro SICAT
    success: '#1D8348', // Verde SICAT
    danger: '#C0392B',
};

export const notify = {
    success: (title: string, text: string = '') => {
        return Swal.fire({
        icon: 'success',
        title,
        text,
        confirmButtonColor: COLORS.success,
        });
    },

    error: (title: string, text: string = 'Ocurrió un error inesperado') => {
        return Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonColor: COLORS.primary,
        });
    },

    confirm: async (title: string, text: string) => {
        const result = await Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: COLORS.danger,
        cancelButtonColor: COLORS.primary,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true // Pone el botón de cancelar a la izquierda
        });
        return result.isConfirmed;
    },

  // Un toast pequeño para avisos rápidos sin bloquear la pantalla
    toast: (title: string, icon: 'success' | 'error' | 'info' = 'success') => {
        const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        });
        return Toast.fire({ icon, title });
    }
};