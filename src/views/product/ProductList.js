import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import {baseURL} from "../../api/index";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import {gridSpacing} from '../../store/constant';
import { Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    active: {
        backgroundColor: theme.palette.purple.main,
        '&:hover': {
            backgroundColor: theme.palette.purple.dark
        }
    },
    inactive: {
        backgroundColor: "green",
        '&:hover': {
            backgroundColor: "darkgreen"
        }
    },
}));

const ProductList = () => {
    const classes = useStyles();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

        }

        var theLoginToken = localStorage.getItem('login');       
            
        const requestOptions = {
                method: 'GET', 
                headers: {
                'Authorization': 'Bearer '+theLoginToken
                }             
        };     


        fetch(baseURL+'/panel-fetch-product-list', requestOptions)
        .then(response => response.json())
        .then(data => {
            let res = data.product;
            let tempRows = [];
            for (let i = 0; i < res.length; i++) {
          
                tempRows.push([
                    i+1,
                    <img src={(res[i]["product_images"]  === null || res[i]["product_images"] === '' ? "https://singleclik.com/api/storage/app/public/no_image.jpg" : "https://singleclik.com/api/storage/app/public/product_images/"+res[i]["product_images"])} style={{width:'40px',height:'40px'}}/>,
                    res[i]["product_name"],
                    res[i]["product_status"],
                    res[i]["id"]
                ]);
              
            }
            setProduct(tempRows)
        }); 
    }, []);

    const option = {
        filterType: "dropDown",
        selectableRows: false,
        viewColumns : false,
    }

    const columnData = [
        {
            name: "#",
            options: {
              filter: false,
              print:false,
              download:false,
            }
        },
        {
            name: "Image",
            options: {
              filter: false,
              print:false,
              download:false,
            }
        },
        "Product/Service",
        "Status",
        {
            name: "Actions",
            options:{
                filter: false,
                print:false,
                download:false,
                customBodyRender: (value) => {
                    return(
                        <div>
                            <Tooltip title="Edit" placement="top">
                                 <IconButton aria-label="Edit">
                                    <Link to={"product-edit?id="+value}>
                                        <EditIcon/>
                                    </Link>
                                 </IconButton>
                            </Tooltip>
                        </div>
                    );
                },
            },
        },
    ]
       
    return (
        <>
         
            <Grid container>
            <Box mt={2} mb={2}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Link to="product-add">
                                <Button
                                    fullWidth
                                    size="large"
                                    type="buton"
                                    variant="contained"
                                    className={classes.login2}
                                    
                                >
                                Add Product/Service
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Grid item xs={12}>
                {product.length > 0 && (
                    <MUIDataTable
                    data={product}
                    columns={columnData}
                    options={option}
                
                    />
                )}
                {product.length <= 0 && (
                    <MUIDataTable
                    columns={columnData}
                    options={option}
                    />
                )}
            </Grid>
        </Grid>
        
    </>
    );
};

export default ProductList;
