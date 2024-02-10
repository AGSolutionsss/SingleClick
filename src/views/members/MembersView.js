import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Button, Card, CardContent, Box  } from '@material-ui/core';
import {baseURL} from "../../api/index";
import {gridSpacing} from '../../store/constant';
import { useHistory } from "react-router-dom";
import axios from "axios";
import MUIDataTable from "mui-datatables";
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

const gridStyle = {
    border: '1px solid lightgray',
    padding: '24px',
}

const MembersView = () => {
    const classes = useStyles();
    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const [profile, setProfile] = useState([]);
    const [product, setProduct] = useState([]);
    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

            axios({
                url: baseURL+"/panel-fetch-member-by-id/"+id,
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                
                setProfile(res.data.user);
            });

        }
    }, []);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

            axios({
                url: baseURL+"/panel-fetch-product-by-id/"+id,
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                let response = res.data.product;
                let tempRows = [];
                for (let i = 0; i < res.length; i++) {
          
                    tempRows.push([
                        i+1,
                        <img src={(response[i]["product_images"]  === null || response[i]["product_images"] === '' ? "https://singleclik.com/api/storage/app/public/no_image.jpg" : "https://singleclik.com/api/storage/app/public/product_images/"+response[i]["product_images"])} style={{width:'40px',height:'40px'}}/>,
                        response[i]["product_name"],
                        response[i]["product_status"],
                        response[i]["id"]
                    ]);
                  
                }
                setProduct(tempRows);
            });

        }
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
        
    ]
       
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
                                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                    <Grid item lg={3} md={6} sm={6} xs={12} style={gridStyle}>
                                        <span>Name :  <b>{profile.name}</b> </span>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={6} xs={12} style={gridStyle}>
                                        <span>Company Name :  <b>{profile.company_name}</b> </span>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={6} xs={12} style={gridStyle}>
                                        <span>Mobile No :  <b>{profile.mobile}</b> </span>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={6} xs={12} style={gridStyle}>
                                        <span>Whats App :  <b>{profile.whatsapp}</b> </span>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={6} xs={12} style={gridStyle}>
                                        <span>Email Id :  <b>{profile.email}</b> </span>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={6} xs={12} style={gridStyle}>
                                        <span>Website :  <b>{profile.website}</b> </span>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={6} xs={12} style={gridStyle}>
                                        <span>Category :  <b>{profile.category}</b> </span>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={6} xs={12} style={gridStyle}>
                                        <span>Sub Category :  <b>{profile.sub_category}</b> </span>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={6} xs={12} style={gridStyle}>
                                        <span>Profile :  <b>{profile.profile_type == '0' ? 'Business' : 'Service'}</b> </span>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={6} xs={12} style={gridStyle}>
                                        <span>Area :  <b>{profile.area}</b> </span>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={12} style={gridStyle}>
                                        <span>About Us :  <b>{profile.about_us}</b> </span>
                                    </Grid>
                                </Grid>
                                <h3>Product/Services</h3>
                                <Grid container>
                                    <Grid item xs={12} >
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
                                <Box mt={2}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <Link to="members-list">
                                                    <Button
                                                        fullWidth
                                                        size="large"
                                                        type="buton"
                                                        variant="contained"
                                                        className={classes.login2}
                                                        
                                                    >
                                                    Back
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

export default MembersView;
