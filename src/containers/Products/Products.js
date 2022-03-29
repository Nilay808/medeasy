import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchResults from "../SearchResults/SearchResults";
import {
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  CardMedia,//FormRow
} from "@material-ui/core";

const Products = (props) => {
  let navigate = useNavigate();
  const [med, setMed] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7000/api/v1/Products", {
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
  const productDisplay = (id) => {
    navigate(`/ProductDisplay/${id}`);
  };
  console.log("===========", med);
  
  return med && med.length > 0 ? (
    <div>
      <Layout>
        {med.map((medy) => {
          return (
            <div style={{ display: "flex" }}>
              <Container style={{ marginBlockStart: "20px" }}>
                <Grid container spacing={6}>
                  <Grid item md={4} xs="auto">
                  {/* <FormRow> */}
                    <Card
                      variant="outlined"
                      sx={{ maxWidth: 330 }}
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="center"
                    >
                      <CardActionArea>
                        <CardMedia
                          onClick={() => {
                            productDisplay(medy._id);
                          }}
                          component="img"
                          height="200"
                          image={medy.ImageURL}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h4" component="div">
                            Name:{medy.Name}
                          </Typography>
                          <Typography gutterBottom variant="h4" component="div">
                            Brand:{medy.Brands}
                          </Typography>
                          <Typography gutterBottom variant="h4" component="div">
                            Dose:{medy.Dose}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="div">
                            Price:${medy.Price}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    {/* </FormRow> */}
                  </Grid>
                </Grid>
              </Container>
            </div>
          );
        })}
        )
      </Layout>
    </div>
  ) : (
    <h1>Empty Medicines</h1>
  );
};

export default Products;
