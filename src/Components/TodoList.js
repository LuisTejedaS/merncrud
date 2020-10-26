import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getTodos} from '../api'
import {deleteTodo} from '../api'
import {useHistory} from "react-router-dom"

export const TodoList = ()=>{
    const[items, setItems] = useState([]);
    const history = useHistory();

    useEffect(() =>{
        const fetchItems = async () =>{
            const todos = await getTodos();
            setItems(todos)        
        }
        fetchItems();
    },[])

    const onDeleteClicked = async (event) =>{        
        console.log(event.target.dataset.user)
        await deleteTodo(event.target.dataset.user)
        window.location.reload();
     }

    return (
    <div className='container'>
        <div className='mt-3'>
            <h3>Todo List</h3>
            <table className='table table-striped mt-3'>
                <thead>
                    <tr>
                        <th>Text</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
            {
              items.map(todo => (
                <tr key={todo._id}>
                  <td>
                    {todo.text}
                  </td>
                  <td>
                    <Link to={`/edit/${todo._id}`}>Edit</Link>
                    <button className='btn btn-primary' data-user={`${todo._id}`} onClick={onDeleteClicked}  >Delete Todo</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
            </table>
        </div>
    </div>
    );
}