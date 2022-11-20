// Componente para la Lista

import React from 'react';
import Todo from './Todo';




const TodoList = ({todos, todoDelete, todoToggleComp,setTodoEdit}) =>{

    /* retorna un array de dos posiciones, donde la primera posicion es el estado y la segunda entrega una función para actualizar el estado */

    return(
        <div>
            <h2 className='text-center display-4'>Lista de Tareas</h2>
            {
                todos.length === 0 
                ? (
                    <div className='text-center alert alert-primary'>
                       <b> No hay Tareas. Por favor agrega una </b>
                    </div>
                )
                : (
                    todos?.map(todo =>(
                        <Todo 
                        todo={todo}
                        key={todo.id}
                        todoDelete={todoDelete}
                        todoToggleComp={todoToggleComp}
                        setTodoEdit={setTodoEdit}
                    />
                    ))
                )
                
            }

            
                
            

        </div>
    )
};

export default TodoList