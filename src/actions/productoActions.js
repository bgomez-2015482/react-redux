import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR
} from '../types'

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// CREAR NUEVOS PRODUCTOS
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());
        try {
            // INSERTAR EN LA API
            await clienteAxios.post('/productos', producto)

            // SI TODO SALE BIEN, ACTUAIZA EL STATE
            dispatch(agregarProductoExito(producto));

            // ALERTA
            Swal.fire(
                'Correcto',
                `Se ha agregado ${producto.nombre} correctamente`,
                'success'
            )
        } catch (error) {
            console.log(error);

            // SI HAY UN ERROR CAMBIAR EL STATE
            dispatch(agregarProductoError(true));

            // ALERTA
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

// SI EL PRODUCTO SE GUARDA EN LA BASE DE DATOS
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

// SI HUBO UN ERROR
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

// FUNCIÓN QUE DESCARGA LOS PRODUCTOS DE LA BASE DE DATOS
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargaProductosExitosa(respuesta.data));
        } catch (error) {
            dispatch(descargaProductosError());
        }
    }
};

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

// SELECCIONAR Y ELIMINAR EL PRODUCTO

export function borrarProdcuctoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());

            //SI SE ELIMINA MOSTRAR ALERTA
            Swal.fire(
                'Eliminado!',
                'El producto se slimino correctamente.',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError())
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: true
});

// COLOCAR PRODUCTO EN EDICIÓN
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch( obtenerProductoEditarAction(producto) )
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// EDITA UN REGISTRO EN LA API Y STATE
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch( editarProducto() );
        try {
            await clienteAxios.put(`productos/${producto.id}`, producto);
            dispatch( editarProductoExito(producto) )
        } catch (error) {
            console.log(error);
            dispatch( editarProductoError() )
        }
    }
}

const editarProducto = producto => ({
    type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type: PRODUCTO_EDITAR_ERROR,
    payload: true
});

