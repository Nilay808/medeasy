/**
 *
 * @version 1.0
 * @author [Chandan Shukla](chandan.shukla@dal.ca)
 */

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './containers/Home/Home';
import Cart from './containers/Cart/Cart'
import Checkout from './containers/NewCheckout/Checkout'
import OrderPlaced from './containers/OrderPlaced/OrderPlaced';
import OrderDetails from './containers/OrderDetails/OrderDetails';
import Footer from './components/Footer/Footer';
import Payment from './containers/Payment/Payment';
import SearchResults from './containers/SearchResults/SearchResults';
import Products from "./containers/Products/Products";
import ProductDisplay from "./containers/Products/ProductDisplay";
import Registration from './containers/UserManagement/Registration/Registration';
import Login from './containers/UserManagement/Login/Login';
import ForgotPassword from './containers/UserManagement/ForgotPassword/ForgotPassword';
import Profile from './containers/UserManagement/Profile';
import AddProduct from './containers/Product/AddProduct';
import Items from './containers/Product/Items';
import UpdateProduct from './containers/Product/UpdateProduct';


function App() {
  
  return (

    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
		        <Route exact path="/Register" element={<Registration />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path = "/Profile" element= {<Profile />} />
            <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
          {<Route exact path="/Cart" element={<Cart />} />}
          <Route exact path="/Products" element={<Products />} />
          <Route
            exact
            path="/ProductDisplay/:id"
            element={<ProductDisplay />}
          />
          <Route exact path="/Checkout" element={<Checkout />} />
          <Route exact path="/Checkout/OrderPlaced" element={<OrderPlaced />} />
          <Route exact path="/Checkout/Payment" element={<Payment />} />
          <Route exact path="/OrderDetails" element={<OrderDetails />} />
          <Route exact path="/SearchResults" element={<SearchResults />} />
          <Route path="/items">
            <Route path=":productid" element={<UpdateProduct />}></Route>
            <Route index element={<Items></Items>}></Route>
          </Route>
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
