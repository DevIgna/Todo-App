import React, {useState, useEffect} from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const initialTodos =[
    {
        id: Math.random(),
        title: '',
        description: '',
        completed: false
    }

];
// Puedo hacerlo dentro de App, pero como no tiene nada que
// ver con componentes, lo hago afuera para mejor legibilidad.
const localTodos = JSON.parse(localStorage.getItem('todos'));

const App = () =>{

    /* Hago que el estado inicial lo cargo condicionalmente, puedo hacerlo con un if
    pero hay una mejor y abreviadad
    */
    const [todos, setTodos] = useState(localTodos || initialTodos);
    // Escribo los edit en la App.js porque necesito un estado global
    // para la comunicación de componentes, ya que quiero que cuando
    // toque en el boton 'Editar', todo lo escrito en esa tarea se 
    // imprima al componente form y así editarlo.
    const [todoEdit, setTodoEdit] = useState(null);

    // Función para eliminar una tarea
    const todoDelete = (id) =>{
        // como funciona: si todoEdit es null, nada 
        // del condicional se ejecuta luego del &&
        // pero si no es null, se completa la condicional
        if(todoEdit && id === todoEdit.id){
            // para que salga del formulario cuando eliminamos una tarea
            setTodoEdit(null)
        }
        const changedTodos = todos.filter(todo => todo.id !== id)
        
        setTodos(changedTodos)
    };

    // funcion para ser intermitente entre completado y no completado
    const todoToggleComp = (id) =>{
        // Varias Formas: 
        // forma : 1
        // const changedTodos = todos.map(todo => {
        //     const todoEdit = {
        //         ...todo,
        //         completed: !todo.completed
                
        //     }
        //     if (todo.id === id){
        //         return todoEdit;
        //     }else{
        //         return todo
        //     }
        // })

        // forma : 2 , recomendable por ser redeable
        const changedTodos = todos.map(todo =>(
            todo.id === id 
            ? {...todo, completed: !todo.completed}
            : todo
        ));

        // forma : 3 igual que la 2 pero mas compactado

        // const changedTodos = todos.map(todo =>todo.id === id ? {...todo, completed: !todo.completed}: todo);


        setTodos(changedTodos);
    }

    const todoAdd = (form) =>{

        const newTodo = {
            id: Date.now(),
            ...form,
            completed: false
        }

        const changedTodos = [
            // Escribo newTodo arriba para que las tareas
            // se imprima arriba de las tareas anteriores
            newTodo,
            ...todos
        ]

        setTodos(changedTodos)
    }

    const todoUpdate = (todoEdit) =>{

       
        const changedTodos = todos.map((todo) => (
            todo.id === todoEdit.id
            ? todoEdit 
            : todo
        ))
        setTodos(changedTodos);
    }


    useEffect(() => {
        /* según la consola de google chrome, en localstorage se guardan
        object Object, esto es un problema ya que localstorage guarda
        solo strings. Para solucionar esto, utilizo el JSON stringify
        */
        localStorage.setItem('todos', JSON.stringify(todos))

    }, [todos])
    
    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-8">
                    {/* <h1>Lista de Tareas</h1> */}
                    <TodoList 
                    todos={todos}
                    todoDelete={todoDelete}
                    todoToggleComp={todoToggleComp}
                    setTodoEdit={setTodoEdit}
                    />
                </div>
                <div className="col-4">
                    <TodoForm
                    todoAdd={todoAdd}
                    todoEdit={todoEdit}
                    todoUpdate={todoUpdate}
                    setTodoEdit={setTodoEdit}
                    />
                </div>
            </div>
        </div>
    )
}

export default App;