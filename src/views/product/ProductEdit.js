import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Card, CardContent,TextField,Button,Box  } from '@material-ui/core';
import {baseURL} from "../../api/index";
import {gridSpacing} from '../../store/constant';
import { useHistory } from "react-router-dom";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    loginput: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        '& > label': {
            top: '23px',
            left: 0,
            color: theme.palette.grey[500],
            '&[data-shrink="false"]': {
                top: '5px'
            }
        },
        '& > div > input': {
            padding: '30.5px 14px 11.5px !important'
        },
        '& legend': {
            display: 'none'
        },
        '& fieldset': {
            top: 0
        }
    },
    login: {
        backgroundColor: theme.palette.purple.main,
        '&:hover': {
            backgroundColor: theme.palette.purple.dark
        }
    },
    login2: {
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }
    },
}));

const status = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
];

const ProductEdit = () => {
    const classes = useStyles();
    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    const [selectedFile, setSelectedFile] = React.useState(null);
    const [product, setProduct] = useState({
        product_name: "",
        product_status: "",
        product_images: "",
    });

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){
    
          window.location = "/login";
          
        }else{
    
        }
        axios({
          url: baseURL+"/panel-fetch-product-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
            setProduct(res.data.product);
          
        });
    }, []);

    const onInputChange = (e) =>{
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    }

    const onSubmit = (e) => {
        const data = new FormData();
        data.append("product_name", product.product_name);
        data.append("product_status", product.product_status);
        data.append("product_images", selectedFile);

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/panel-update-product/"+id+'?_method=PUT',
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                toast.success("Product Updated Successfully", {
                    type: 'Success',
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    onClose: () => history.push('/category-list')
                });
                
            }else{
                toast.error("Product not Updated Successfully", {
                    type: 'error',
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            
        });
        }
    }

    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
            <Grid container>
                <Grid item xs={12}>
                    <Card >
                        <CardContent>
                            <form id="addIndiv" autoComplete="off">
                                <Grid item xs={12}>
                                    <Grid container mt={2} spacing={gridSpacing} style={{justifyContent:'center'}}>
                                        <Grid item lg={4} md={4} sm={4} xs={12}>
                                            <TextField
                                                name="product_name"
                                                required
                                                onChange={e => onInputChange(e)}
                                                value={product.product_name}
                                                label='Product Name'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={4} xs={12}>
                                            <TextField
                                                name="product_status"
                                                required
                                                onChange={e => onInputChange(e)}
                                                value={product.product_status}
                                                label='Product Status'
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {status.map((option) => (
                                                <MenuItem key={option.label} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))} 
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="product_images"
                                                type="file"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                                value={product.product_images}
                                                label='User Image'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={1} md={6} sm={6} xs={12}>
                                            <img src={(product.product_images  === null || product.product_images === '' ? "https://singleclik.com/api/storage/app/public/no_image.jpg" : "https://singleclik.com/api/storage/app/public/product_images/"+product.product_images)} style={{width:'40px',height:'40px'}}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Box mt={2}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <Button
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    className={classes.login}
                                                    onClick={(e) => onSubmit(e)}
                                                >
                                                Update
                                                </Button>
                                            </Grid>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <Link to="product-list">
                                                    <Button
                                                        fullWidth
                                                        size="large"
                                                        type="buton"
                                                        variant="contained"
                                                        className={classes.login2}
                                                    >
                                                    Cancel
                                                    </Button>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default ProductEdit;
