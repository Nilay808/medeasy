//Author of ProductDisplay are Dhruv Soni and Jainesh Ketan Desai
//This page shows ProductDisplay show product that is clicked and contains rating and review that customer has posted and customer can also give rating and review to particular.
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Container, Card, Button } from "react-bootstrap";
import "./css/ProductDisplay.css";
import { useNavigate } from "react-router-dom";

import {
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  CardMedia,
  CardActions,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";

import Avatar from "@mui/material/Avatar";

import Divider from "@mui/material/Divider";
import Root from "@mui/material/Divider";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

const Products = (props) => {
  let navigate = useNavigate();
  const params = useParams();
  const [value, setValue] = React.useState(0);
  const [text, setText] = React.useState("");
  const [Errvalue, setErrvalue] = React.useState(false);
  const [Errrtext, setErrrtext] = React.useState(false);
  const [med, setMed] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:7000/api/v1/Products/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((medicines) => {
        setMed(medicines);
      });
  }, []);
  
  const enterIntoCart = (medy) => {
   
      fetch("http://localhost:7000/api/v1/AddtoCart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: "testuser@gmail.com",
        productID: medy._id,
        Name: medy.Name,
        Dose: medy.Dose,
        Price: medy.Price,
        Image: medy.ImageURL,
        Brands: medy.Brands,
      }),
    })
      .then((res) => res.json())
      .then((item, err) => {
        if (item) {
          console.log("item after adding into cart------------", item);
          navigate("/Cart");
        } else {
          alert(err);
        }
      });
  };

  const handlechange = (event) => {
    setText(event.target.value);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (value===0) {
      // alert("Error")
      setErrvalue(true);
    }
    else{
      setErrvalue(false);
    }
    if(text===""){
      setErrrtext(true);
    }
    else{
      console.log("LLLLLL");

      axios
        .post("http://localhost:7000/postratingandreview", {
          rating: value,
          review: text,
          productID: med._id,
        })
        .then(() => {
          console.log("Data inserted");
          window.location.reload()
        })
        .catch((err) => {
          console.error(err);
        });

    }
  };
 
  const [response, setResponse] = useState([]);

  useEffect(() => {
    let api=`http://localhost:7000/reviewandrating/${params.id}`;

    axios
      .get(api)
      .then((res) => {
        console.log(res);

        setResponse(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return med ? (
    <div>
      <Layout>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={med.ImageURL}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography>Name: {med.Name}</Typography>
                    <Typography>Brand: {med.Brands}</Typography>
                    <Typography>Dose: {med.Dose}</Typography>
                    <Typography>Price: ${med.Price}</Typography>
                    <Typography>ProductType: {med.ProductType}</Typography>
                    <Typography>
                      Product Description: {med.ProductDescription}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      style={{ color: "" }}
                      onClick={() => {
                        enterIntoCart(med);
                      }}
                    >
                      AddtoCart
                    </Button>
                  </CardActions>
                  <div class="rating">
                    <form class="row g-3" type="submit">
                      <div class="form-group">
                        <Box
                          sx={{
                            "& > legend": { mt: 2 },
                          }}
                        >
                          <Typography component="legend">Rating</Typography>
                          <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
                        </Box>
                      </div>
                      {Errvalue ? <span> Not Valid rating</span> : ""}
                      <div class="form-group">
                        <Typography component="legend">Review</Typography>
                        <br></br>
                        <br></br>
                        <textarea
                          class="form-control"
                          placeholder="Leave a review here"
                          id="floatingTextarea"
                          value={text}
                          onChange={handlechange}
                        ></textarea>
                      </div>
                      {Errrtext ? <span> Not Valid review</span> : ""}
                     
                      <div>
                        <button class="button" onClick={handlesubmit}>
                          Submit
                        </button>
                      </div>

                      {/* <button type="button" onClick={handlesubmit}> Submit</button> */}
                    </form>
                  </div>
                  <div className="ratingandreviewboxforcomment">
                    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
                      {response.map((user) => {
                        return (
                          <StyledPaper
                            sx={{
                              my: 1,
                              mx: "auto",
                              p: 2,
                            }}
                          >
                            <Typography component="legend" align="center">
                              Review{" "}
                            </Typography>
                            <Grid container wrap="nowrap" spacing={2}>
                              <Grid item>
                                <Avatar>J</Avatar>
                              </Grid>
                              <Grid item xs>
                                <Typography align="left">
                                  {user.review}
                                </Typography>
                              </Grid>
                            </Grid>
                            <br></br>
                            <Box
                              sx={{
                                "& > legend": { mt: 2 },
                              }}
                            >
                              <Root>
                                <Divider>
                                  <Typography component="legend" align="left">
                                    Rating
                                  </Typography>
                                </Divider>
                              </Root>
                              <br></br>
                              <Rating
                                name="simple-controlled"
                                value={user.rating}
                                readOnly
                              />
                            </Box>
                            <br></br>
                          </StyledPaper>
                        );
                      })}
                    </Box>
                  </div>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </div>
  ) : (
    <Layout>
      <h1>Empty Medicines</h1>
    </Layout>
  );
};

export default Products;
