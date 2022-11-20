// Componente para abstraccion en TodoList, porque se vuelve complejo

import React from 'react'


/* el todo como argumento de función es de dentro de TodoList que dentro tiene el objeto
creado llamado todo1
*/
export default function Todo({todo, todoDelete, todoToggleComp, setTodoEdit}) {
  return (
    <div className='card mt-2'>
    <div className='card-body'>
        <h3 className='card-title text-right'>
            {todo.title}
            <button className={`btn btn-sm ${todo.completed ? 'btn-outline-success ml-3' : 'btn-success ml-3'} `} onClick={() => todoToggleComp(todo.id)}>
            {
              todo.completed ? 'Terminado' : 'Terminar'
            }  
            </button>
        </h3>
        <p className='card-text text-right'>
            {todo.description}
        </p>
        <hr />
        <div className='d-flex justify-content-end'>
        <button 
        onClick={() => setTodoEdit(todo)}
        className='btn btn-sm btn-outline-primary mr-2' 
        >Editar
        </button>
        <button className='btn btn-sm btn-outline-danger' onClick={() => todoDelete(todo.id)}>Eliminar</button>
        </div>
    </div>
</div>
  )
}
