import './App.css';
import AddBooks from './components/AddBooks/AddBooks';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import CheckOut from './components/CheckOut/CheckOut';
import OrderedBooks from './components/OrderedBooks/OrderedBooks';
import ManageBooks from './components/ManageBooks/ManageBooks';
import Header from './components/Header/Header';
import Admin from './components/Admin/Admin';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext, useState } from 'react';
export const UserContext = createContext({});

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>

      <Router>
        <Header />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
          <PrivateRoute path="/bookInfo/:bookId">
            <CheckOut />
          </PrivateRoute>
          <Route path="/addBooks">
            <AddBooks />
          </Route>
          <Route path="/manageBooks">
            <ManageBooks />
          </Route>
          <PrivateRoute path="/orderedBooks">
            <OrderedBooks />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
