import React, { useState } from 'react';
import uniqid from 'uniqid';

const Listadonombres = () => {

    const [nombre, setNombre] = useState('');
    const [listanombres, setListaNombres] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id,setId] = useState('')
    const [error, setError] = useState(null)

    const addNombre = (e)=>{
        e.preventDefault()
        if(!nombre.trim()){
            setError('El campo esta vacio')
            return
        }
        const nuevoNombre = {
            id: uniqid(),
            tituloNombre: nombre
        }
        setListaNombres([...listanombres,nuevoNombre])
        setNombre('');
        setError(null)
    }
    const deleteNombre = (id) =>{
        const nuevaArray = listanombres.filter( item => item.id !== id )
        setListaNombres(nuevaArray)
    }
    const editar = (item) =>{
        setModoEdicion(true)
        setNombre(item.tituloNombre)
        setId(item.id)

    }
    const editarNombre = (e) =>{
        e.preventDefault()
        const NuevoArray = listanombres
        .map( item => item.id === id ? {id:id, tituloNombre:nombre}: item)
        setListaNombres(NuevoArray)
        setModoEdicion(false)
        setNombre('')
    }


    return (
        <div className="m-3">
            <h2 className="text-center">Aplicación de Crud Básico</h2>
            <hr/><br/>
            <div className="row">
                <div className="col">
                    <h4 className="text-center">Listado de nombres</h4>
                    <u className="list-group">
                        {
                            listanombres.map( item => 
                                <li key={item.id} className="list-group-item">
                                    {item.tituloNombre}
                                    <button 
                                        className="btn btn-danger float-right"
                                        onClick={ () => {deleteNombre(item.id)} }
                                    
                                    >
                                        Eliminar
                                    </button>

                                    <button 
                                        className="btn btn-info mr-2 float-right"
                                        onClick={ () => {editar(item)} }
                                    
                                    >
                                        Editar
                                    </button>
                                </li>
                            )
                        }
                    </u>
                </div>
            </div>

            <div className="container mt-4">
                <div className="col">
                        <h4>Añadir Nombres</h4>
                        <form onSubmit={modoEdicion ? editarNombre : addNombre} className="form-group">
                            <input 
                                onChange={(e)=>{setNombre(e.target.value)}} 
                                className="form-control mb-3" 
                                type="text" 
                                placeholder="Introduce el nombre"
                                value={nombre}
                            />
                            <input 
                                className="btn btn-info btn-block" 
                                type="submit" 
                                value={modoEdicion ? 'Editar Nombre' : 'Resgistar Nombre'}
                            />
                        </form>
                        {
                            error !== null ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ):
                            (
                                <div></div>
                            )
                        }
                </div>
            </div>
            

        </div>
    )
}

export default Listadonombres;