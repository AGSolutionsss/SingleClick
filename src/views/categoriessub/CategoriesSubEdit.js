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

const CategoriesSubEdit = () => {
    const classes = useStyles();
    let history = useHistory();
    
    const [categoriesSub, setCategoriesSub] = useState({
        category_id: "",
        subcategory: "",
        subcategory_status: "",
    });
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){
    
          window.location = "/login";
          
        }else{
    
        }
        axios({
          url: baseURL+"/panel-fetch-sub-categories-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
            setCategoriesSub(res.data.categoriessub);
          
        });
    }, []);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){
    
          window.location = "/login";
          
        }else{
    
        }
        axios({
          url: baseURL+"/panel-fetch-categories",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
            setCategories(res.data.categories);
          
        });
    }, []);

    const onInputChange = (e) =>{
        setCategoriesSub({
            ...categoriesSub,
            [e.target.name]: e.target.value,
        });
    }

    const onSubmit = (e) => {
        let data = {
            category_id: categoriesSub.category_id,
            subcategory: categoriesSub.subcategory,
            subcategory_status: categoriesSub.subcategory_status,
        };
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/panel-update-sub-categories/" + id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                toast.success("Categories Sub Created Successfully", {
                    type: 'Success',
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    onClose: () => history.push('/category-sub-list')
                });
                
            }else{
                toast.error("Categories Sub not Created Successfully", {
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
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="category_id"
                                                required
                                                onChange={e => onInputChange(e)}
                                                value={categoriesSub.category_id}
                                                label='Category Name'
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {categories.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.category}
                                                </MenuItem>
                                            ))} 
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12} style={{display:'flex',justifyContent:'space-evenly'}}>
                                            <TextField
                                                name="subcategory"
                                                required
                                                onChange={e => onInputChange(e)}
                                                value={categoriesSub.subcategory}
                                                label='Sub Category Name'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="subcategory_status"
                                                required
                                                onChange={e => onInputChange(e)}
                                                value={categoriesSub.subcategory_status}
                                                label='Category Status'
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
                                                <Link to="category-sub-list">
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

export default CategoriesSubEdit;
