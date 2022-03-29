// @version 1.0 @author [Neelay Goswami](nl339853@dal.ca)

import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import {storage} from './firebase';
import "./Product.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Layout from '../../components/Layout/Layout';
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Items from "./Items";

import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

// This function is used for adding the product to the website inventory

function AddProduct() {
  const api_url = "http://localhost:7000/products";
  // const navigate = useNavigate;
  const [image,setImage] = useState(null);
  const [webimage,setWebImage] = useState("");
  const store = getStorage();
  const [progress,setProgress] = useState();
  // const [isurlgenerated, setGenerated] = useState(false);


  //State to store initial valus of all the product details
  const [productInfo, setproductInfo] = useState({
    Name: "",
    Brands: "",
    Dose: "",
    Price: "",
    ProductType: "",
    ProductDescription: "",
    ProductQuantity: "",
    ImageURL:"",
  });

//function to set Image 
  const handleImage= e =>
  {
    if(e.target.files[0]){
      console.log(e.target.files[0])
      setImage(e.target.files[0]);
    }
  };
  console.log("Imagename",image)

//function to upload image to firebase  
  const handleUpload = () =>
  {
    const storageRef = ref(store, 'images/' + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);
    // const uploadTask = ref(storage,'images/${image.name}').put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress)
        console.log('Upload is ' + progress + '% done');
      },
      error => {
        console.log(error);
      },
      () =>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          console.log("File available at ",downloadURL);
          setWebImage(downloadURL);
          // setGenerated(true);
        });
      }
    );
  }

  // function to submit details of the add product form

  function submit(e) {
    e.preventDefault();
    axios
      .post(api_url, {
        Name: productInfo.Name,
        Brands: productInfo.Brands,
        Dose: productInfo.Dose,
        Price: productInfo.Price,
        ProductType: productInfo.ProductType,
        ProductDescription: productInfo.ProductDescription,
        ProductQuantity: productInfo.ProductQuantity,
        ImageURL:webimage,
      })
      .then((res) => {
        // console.log(res.data);
        alert("Product Added")
      });
  }
  //function to handle each field of the form 
  function handle(e) {
    const newdata = { ...productInfo };
    newdata[e.target.id] = e.target.value;
    setproductInfo(newdata);
    console.log(newdata);
  }
 
  return (
    <div>
      <Layout>
      <Grid>
        <Card
          style={{
            maxWidth: 600,
            padding: "20px 20px",
            margin: "3em auto auto  auto",
          }}>
          // Form to add product to the database
          <CardContent>
            <Typography gutterBottom variant="h5">
              Add Product Page
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom>
            <h5>  Enter the Details required for the Product: </h5>
            </Typography>
            <form onSubmit={(e) => submit(e)}>
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField
                    onChange={(e) => handle(e)}
                    id="Name"
                    value={productInfo.Name}
                    placeholder="Enter Product Name"
                    label="Product Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <br/><br/> <br/> 
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => handle(e)}
                    id="Brands"
                    value={productInfo.Brands}
                    placeholder="Enter Brand Name"
                    label="Brand"
                    variant="outlined"
                    fullWidth
                    required
                  />
                  <br/><br/>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(e) => handle(e)}
                      id="Dose"
                      value={productInfo.Dose}
                      placeholder="Enter Dose if Medicine other wise enter 0"
                      label="Dose"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <br/>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(e) => handle(e)}
                      id="Price"
                      value={productInfo.Price}
                      type="number"
                      placeholder="Enter Product Price"
                      label="Product Price"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <br/>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(e) => handle(e)}
                      id="ProductType"
                      value={productInfo.ProductType}
                      placeholder="Enter Product Type"
                      label="Product Type"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <br/>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(e) => handle(e)}
                      id="ProductDescription"
                      value={productInfo.ProductDescription}
                      label="Product Description"
                      multiline
                      rows={4}
                      placeholder="Enter Product Description Here"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <br/>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(e) => handle(e)}
                      id="ProductQuantity"
                      value={productInfo.ProductQuantity}
                      type="number"
                      placeholder="Enter Product Quantity"
                      label="Product Quantity"
                      variant="outlined"
                      fullWidth
                      required 
                    />
                  </Grid>
                  <br/>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(e) => handleImage(e)}
                      id="ProductImage"
                      type="file"
                      // value={productInfo.ImageURL}
                      // placeholder="Select Product Image"
                      // label="Product Image"
                      variant="outlined"
                      
                      fullWidth
                      required
                    />
                    <ReactBootStrap.Button id="Button" onClick={handleUpload}> Upload</ReactBootStrap.Button>
                    <h4>File Upload Status: {progress}%</h4>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      id="Button"
                      fullWidth>
                      Add Product
                    </Button>
                  </Grid>
                </Grid>
                
              </Grid>
            </form>
            <br/>
            
          </CardContent>
        </Card>
      </Grid>
      </Layout>
    </div>
  );
}

export default AddProduct;
