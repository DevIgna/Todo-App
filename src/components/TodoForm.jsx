// Componente para el formulario
// Al trabajar con formularios, los elementos se ordenan por linea de codigo porque
// se le van a agregar más propiedades, también para que sea legible

import React, { useState, useEffect } from 'react'

const initialForm = {
  title: '',
  description: ''
}


export default function TodoForm({ todoAdd, todoEdit, todoUpdate, setTodoEdit }) {
  const [form, setForm] = useState(initialForm);

  const { title, description } = form;

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null)


  const handlerChange = (e) => {

    const changedInput = {
      ...form,
      [e.target.name]: e.target.value

    }

    setForm(changedInput)
  }

  const handlerSubmit = (e) => {
    e.preventDefault();

    // que hace trim, me va a eliminar los espacios en blanco
    // convirtiendolos en cadena vacía.
    if (title.trim() === '') {
      setError('Indica un título');
      // return vacío para que se devuleva el formulario en sí
      // y no se agregue vacío
      return;
    }

    if (description.trim() === '') {
      setError('Indica una Descripción');
      return;
    }

    if(todoEdit){
      todoUpdate(form);
      setSuccess('Actualizado con éxito');

    }else{      
      // Agregar Tarea
      todoAdd(form);
      setSuccess('Agregado con éxito');
    }

    // Si el usuario agrega por error una tarea dos veces:
    setForm(initialForm);

    setTimeout(() =>{
      setSuccess(null)
    }, 2000);

    setError(null);
  }


  useEffect(() =>{
    /* Si todoEdit está en Null, nunca se ejecutará el setForm */
    if(todoEdit){
      setForm(todoEdit)
    }else{
      setForm(initialForm)
    }
  },[todoEdit]);

  return (
    <div>
      <h2 className='text-center display-5'>{todoEdit ? 'Actualizar Tarea' : 'Nueva Tarea'}</h2>
      
      {
        todoEdit && (
          <button 
          className='btn btn-sm btn-warning mb-2'
          onClick={() => setTodoEdit(null)}
          >
          Cancelar Edición
        </button>
        )
      }
      
     
      
      <form onSubmit={(e) => handlerSubmit(e)}>
        <input type="text"
          placeholder='Título'
          className='form-control'
          value={title}
          name='title'
          onChange={handlerChange}
          autoComplete='off'
        />

        <textarea
          placeholder='Descripción...'
          name="description"
          id="1"
          value={description}
          onChange={handlerChange}
          autoComplete='off'

          className='form-control mt-2'>

        </textarea>

        <button
          className='btn btn-primary btn-block mt-2'>
          {todoEdit ? 'Actualizar Tarea' : 'Agregar Tarea'}
        </button>

      </form>
      {
        error &&
        (
          <div className='alert alert-danger mt-2'>
            <b>{error}</b>
          </div>
        )
      }
      {
        success &&
        (

          <div className='alert alert-success mt-2'>{success}</div>

        )
      }
    </div>

  )
}
