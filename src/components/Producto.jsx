import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// REDUX
import { useDispatch } from 'react-redux';
import { borrarProdcuctoAction, obtenerProductoEditar } from '../actions/productoActions';

const Producto = ({ producto }) => {
    const { nombre, precio, id } = producto

    const dispatch = useDispatch();
    const history = useHistory(); // HABILITAR HISTORY PARA REDIRECCION

    // CONFIRMAR SI DESEA ELIMINAR
    const confirmarEliminarProducto = id => {

        //PREGUNTAR AL USUARIO
        Swal.fire({
            title: 'Estas seguro?',
            text: "El producto que se elimine no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // PASARLO AL ACTION
                dispatch(borrarProdcuctoAction(id));
            }
        })
    }

    //FUNCION QUE REDIRIGE DE FORMA PROGRAMADA
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.id}`)
    }

    return (
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold"> $ {precio}</span></td>
            <td className="acciones">
                <button
                    type="button"
                    onClick={() => redireccionarEdicion(producto)}
                    className="btn btn-primary mr-2">
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >Eliminar</button>
            </td>
        </tr>
    );
}

export default Producto;