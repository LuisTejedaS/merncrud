import logo from './logo.svg';
import './App.css';
import {Route, Switch, Link} from 'react-router-dom'
import {TodoList} from './Components/TodoList'
import {CreateTodo} from './Components/CreateTodo'
import {EditTodo} from './Components/EditTodo'

function App() {
  return ( 
    <div>
      <nav className='navbar bg-light navbar-expand-lg navbar-light'>
        <ul className='navbar-nav mr-auto'>
          <li className='navbar-item'>
            <Link to= '/' className='nav-link'>Todos</Link>
          </li>
          <li className='navbar-item'>
            <Link to= '/create' className='nav-link'>Create Todo</Link>
          </li>
        </ul>
      </nav>
    <Switch>
      <Route exact path='/' component={TodoList} ></Route>
      <Route exact path='/edit/:id' component={EditTodo} ></Route>
      <Route exact path='/create' component={CreateTodo} ></Route>
    </Switch>
    </div>
  );
}

export default App;
