/**
 *
 * @version 1.0
 * @author [Chandan Shukla](chandan.shukla@dal.ca)
 */


import React, {useState} from 'react';
import Layout from '../../components/Layout/Layout';
import {useNavigate} from "react-router-dom";
import * as uuid from "uuid";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PageTitle from '../../components/PageTitle/PageTitle';
import Button from '@material-ui/core/Button';
import { teal } from '@mui/material/colors';
import { makeStyles } from '@material-ui/core/styles';
import './OrderPlaced.css';

const useStyles = makeStyles({
root: {
    background: "#13878F",
    border: 0,
    color: 'white',
    height: 40,
    fontSize: 18,
    textTransform: 'none',
    fontWeight: 600,
    "&:hover": {
    background: "#11999E",
    color: "#fff"
    }
},
});
const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
const checkoutAmount = JSON.parse(localStorage.getItem("checkoutAmount"));
const cartItemsData = JSON.parse(localStorage.getItem("cartItems"));
const customerEmail = localStorage.getItem("Email");
const paymentStatus = localStorage.getItem("PaymentStatus");

function OrderPlaced(){


    let navigate = useNavigate(); 
    function routeChange(){ 
        navigate("/OrderDetails");
        localStorage.setItem("checkoutAmount","");
        localStorage.setItem("cartItems","");
    }
    
    const [oneTimeState,setOneTimeState] = useState("");
    const classes = useStyles();
    let orderItems = [];
    let authToken = "";
    if(localStorage.getItem("token")!=='undefined'){
        authToken = localStorage.getItem("token");
    }
    for(let idx=0;idx<cartItemsData.CartItems.length;idx++) {
        let items = {
            "quantity": cartItemsData.CartItems[idx].quantity,
            "price_data": {
                "currency": "cad",
                "unit_amount": cartItemsData.CartItems[idx].Price,
                "product_data": {
                    "name": cartItemsData.CartItems[idx].Name,
                    "description": "Product description",
                    "images": [
                        cartItemsData.CartItems[idx].ImageURL
                    ]
                },
                
            },
            "tax_rates": ["txr_1KiDYRLF0IW9HE4HAkINXJr6"]
        }
        orderItems.push(items);
    }
    let orderData = {
        "shippingInfo": {
            "firstName": shippingInfo.firstName,
            "lastName": shippingInfo.lastName,
            "streetAddress": shippingInfo.stAddress,
            "city": shippingInfo.city.name,
            "state": shippingInfo.stateName.name,
            "country": shippingInfo.countryName.name,
            "zipCode": shippingInfo.zip,
        },
        "shippingMethod": "Express",    
        orderItems,
        "orderStatus": "Processing",
        "userEmail": customerEmail,
        "paymentInfo": {
            "paymentId": uuid.v4(),
            "paymentMethod": "Stripe",
            "paymentStatus": "Successful"
        },
        "itemsAmount": checkoutAmount.orderSumCost.itemCost,
        "taxAmount": checkoutAmount.orderSumCost.tax,
        "shippingAmount": checkoutAmount.orderSumCost.shippingCost,
        "paymentAmount": checkoutAmount.orderSumCost.totalAmount,
    };

    if(paymentStatus === "Success"){
        axios.post('http://localhost:7000/api/v1/order/createNewOrder',orderData, {headers: {
            'Content-Type': 'application/json',
            "token": authToken
            }}).then((res) => {
                console.log(res);
            })
            localStorage.setItem("PaymentStatus","");
            
        
    }

    
    console.log(orderData);

    return(
        <div>
        {cartItemsData.success===true?
        <Layout>
            
            <PageTitle title="Order Placed" />
            <Grid 
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '30vh' }}><h1>Order Confirmation</h1></Grid>
            <Box sx={{ flexGrow: 1, mx:8 }} className="textFont" display="flex" justifyContent="center">
                <Grid item xs={12} lg={5} md={5}  >
                    {shippingInfo.firstName} {shippingInfo.lastName}, Thank you for your order!
                    

                </Grid>
    
            </Box>
            <Box sx={{ flexGrow: 1, mx:8,mt: 4 }} className="textFont" display="flex"  justifyContent="center">
                <Grid item xs={12} lg={5} md={5}  >
                    We've recieved your order and will contact you as soon as your package is shipped. please click below button for your order details.

                </Grid>
                
            </Box>
            <Box sx={{ flexGrow: 1, mx:8,mt: 4 }} className="textFont" display="flex"  justifyContent="center">
                <Button variant="contained"
                                className={classes.root} onClick={routeChange}>Order Details</Button>
            </Box>
            
            {/* <div className="container" style={{marginTop:"10%"}}>
                <div className="row text-center">
                    <h1>Order is placed</h1>
                </div>
                <div className="row text-center">
                    <div className="col-sm text-center">
                        <button type="button" className="btn btn-lg placeButton" onClick={routeChange}>Orders</button>
                    </div>
                </div>
            </div> */}
        </Layout>: <Layout><h1>Unauthorized Access</h1></Layout>}
        </div>
    );

}

export default OrderPlaced;