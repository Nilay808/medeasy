// @version 1.0 @author [Neelay Goswami](nl339853@dal.ca)

import * as ReactBootStrap from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Product.css";
import Layout from '../../components/Layout/Layout';

// Function to Display all the products already added in the database by admin
// And Having Add, Update and Delete product button in the page
function Items() {
  let navigate = useNavigate();
  const [productInfo, setproductInfo] = useState([]);
  // const [productDelete, setproductDelete] = useState([]);
  const api_url = 'http://localhost:7000/productlist/';
  
// function to redirect to add product page
  const handleClick = (product) => {
    // const temp = JSON.stringify(product);
    // console.log("Product id on items page", product);
    navigate(`/items/${product}`);
  };

// function to handle delete request on button click
  const HandleDelete = (productdelete) => {
    // const temp = JSON.stringify(product);
    // console.log("Product id on items page", product);
    axios.delete(api_url+productdelete).then((res) => {
      // console.table("Result", JSON.stringify(res));
      axios.get(api_url).then((res)=>{
        alert("Product Deleted from Inventory",productdelete.Name)
        setproductInfo(res.data)
      })
    });    
  };

// useEffect function to get all the product details from the database
  useEffect(() => {
    axios.get(api_url).then((res) => {
      // console.table("Result", JSON.stringify(res));
      setproductInfo(res.data);
    });
  },[]);

  return (
    <>
      <div className="Items">
        {/* <header></header> */}
        {/* <Navbar></Navbar> */}
        <Layout>
        <br />
        <ReactBootStrap.Button
          variant="primary"
          onClick={() => {
            navigate("/addProduct");
          }}
        id="Button">
          Add Product
        </ReactBootStrap.Button>
        <br/>
        {productInfo.map((product) => {
          return (
            // Card Structure to get all the details from the backend and show it in the frontend
            <div class="body">
             
              <ReactBootStrap.Card style={{ width: "18rem",fill:"Highlight" }} key={product._id} >
                <ReactBootStrap.Card.Img variant="top" src={product.ImageURL}  class="responsive"/>
                <ReactBootStrap.Card.Body>
                  <ReactBootStrap.Card.Title>
                  <h5>Name: {product.Name}</h5>
                  </ReactBootStrap.Card.Title>
                  <ReactBootStrap.Card.Text>
                  <p>Brand Name: {product.Brands}</p>  
                  </ReactBootStrap.Card.Text>
                  <ReactBootStrap.Card.Text>
                  <p>Type: {product.ProductType}</p>  
                  </ReactBootStrap.Card.Text>
                  <ReactBootStrap.Card.Text>
                  <p>Price in Cad: {product.Price}</p>  
                  </ReactBootStrap.Card.Text>
                  <ReactBootStrap.Card.Text>
                  <p>Description: {product.ProductDescription}</p>
                  </ReactBootStrap.Card.Text>
                  <ReactBootStrap.Card.Text>
                  <p>Quantity: {product.ProductQuantity}</p> 
                  </ReactBootStrap.Card.Text>
                  <ReactBootStrap.Button
                    id="Button"
                    variant="primary"
                    onClick={() => handleClick(product._id)}>
                    Update Product
                  </ReactBootStrap.Button>
                  
                  <br />
                  <ReactBootStrap.Button id="Button" variant="primary" onClick={() => HandleDelete(product._id)}>
                    Delete Product
                  </ReactBootStrap.Button>
                </ReactBootStrap.Card.Body>
              </ReactBootStrap.Card>

              {/* </ReactBootStrap.Col> */}
              {/* ))} */}
              {/* </ReactBootStrap.Row> */}
              {/* </ReactBootStrap.Row> */}
              {/* <br/> */}
              {/* <ol>
                <h2>{product.productname}</h2>
                <h2>{product.manufacturer}</h2>
                <h2>{product.productprice}</h2>
                <h2>{product.productdescription}</h2>
                <h2>{product.productdescription}</h2>
                <h2>{product.productquantity}</h2>
              </ol> */}
           
            </div>
          );
        })}
        </Layout>
      </div>
      
    </>
  );
}

export default Items;
