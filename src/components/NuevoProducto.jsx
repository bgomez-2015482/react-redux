import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//ACTIONS DE REDUX
import { crearNuevoProductoAction } from '../actions/productoActions';

const NuevoProducto = ({ history }) => {

    // STATE DEL COMPONENTE
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    // UTILIZAR ESE DISPATCH Y TE CREA UNNA FUNCIÓN
    const dispatch = useDispatch();

    // ACCEDER AL STATE DEL STORE
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error)

    // MANDAR A LLAMAR EL ACTION DE productoAction
    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));

    //CUANDO EL USUARIO HAGA SUBMIT
    const submitNuevoProducto = e => {
        e.preventDefault();

        // VALIDAR FORMUARIO
        if (nombre.trim() === '' || precio <= 0) {
            return;
        }
        // SI NO HAY ERRORES

        //CREAR EL NUEVO PRODUCTO
        agregarProducto({
            nombre,
            precio
        });

        // REDIRECCIONAR
        history.push('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>
                        {cargando ? <p>Cargando...</p> : null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoProducto;