
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import {
  CardContent,
  Grid,
  Typography,
  CardMedia,
  CardActions,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";


function Cart(props) {
  let navigate = useNavigate();
  function routeChange() {
    navigate("/Checkout");
  }

  function handleButton(props) {
    localStorage.setItem("cartItems", JSON.stringify(cartState));
    return routeChange();
  }

  const removeFromCart = (medy) => {
    const productID = medy.id;
    console.log("cart Items-0-0-0", medy);
    fetch(`http://localhost:7000/api/v1/removeCartItem/${productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ medy }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("-=-=-=-=", data);

        setCartState(data);
      });
  };
  const updateCart = (item, type) => {
    if (type === "ADD") {
      console.log("+++", item);
      const productID = item.id;
      fetch(`http://localhost:7000/api/v1/updateCartItems/${productID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("-=-=-=-=", data);
          const email = data.email;
          fetch(`http://localhost:7000/api/v1/getCartItems/${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setCartState(data);
            });
        });
    } else if (type === "SUB") {
      console.log("+++", item);
      const productID = item.id;
      fetch(`http://localhost:7000/api/v1/decreaseCartItems/${productID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("-=-=-=-=", data);
          const email = data.email;
          fetch(`http://localhost:7000/api/v1/getCartItems/${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("data======", data);
              setCartState(data);
            });
        });
    }
  };

  const [cartState, setCartState] = useState([]);
  useEffect(() => {
    const email = "testuser@gmail.com";
    fetch(`http://localhost:7000/api/v1/getCartItems/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data of cart======", data);
        setCartState(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return cartState && Object.keys(cartState).length > 0 ? (
    <div>
      <Layout> </Layout>
      {cartState.CartItems.map((medy) => {
        return (
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={medy.ImageURL}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      Name:{medy.Name}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                      Brands:{medy.Brands}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="div">
                      Dose:{medy.Dose}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      ${medy.Price}
                    </Typography>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          updateCart(medy, "ADD");
                        }}
                        align="center"
                      >
                        +
                      </Button>
                    </CardActions>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      {medy.quantity}
                    </Typography>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          updateCart(medy, "SUB");
                        }}
                      >
                        -
                      </Button>

                      <IconButton aria-label="delete">
                        <DeleteIcon
                          onClick={() => {
                            removeFromCart(medy);
                          }}
                        />
                      </IconButton>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Button
              size="small"
              onClick={() => {
                handleButton(cartState);
              }}
            >
              Checkout
            </Button>
          </Container>
        );
      })}
    </div>
  ) : (
    <Typography gutterBottom variant="h4" component="div">
      Your Cart is Empty!!!!
    </Typography>
  );
}

export default Cart;
