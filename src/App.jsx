import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Products from './pages/Product'
import ProductList from './pages/ProductList'
import Success from './pages/Success'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
   return(
      <Router>
        <Switch>
          <Route exact path = "/">
            <Home />
          </Route>
          <Route path = "/login">
            <Login />
          </Route>
          <Route path = "/register">
            <Register />
          </Route>
          <Route path = "/cart">
            <Cart />
          </Route>
          <Route path = "/success">
            <Success />
          </Route>
          <Route path = "/product/:id">
            <Products />
          </Route>
          <Route path = "/product-list">
            <ProductList />
          </Route>
        </Switch>
      </Router>
   ) 
}

export default App;
