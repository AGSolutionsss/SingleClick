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

const CategoriesSubAdd = () => {
    const classes = useStyles();
    let history = useHistory();
    
    const [categoriesSub, setCategoriesSub] = useState({
        category: "",
        subcategory: "",
    });

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
            category: categoriesSub.category,
            subcategory: categoriesSub.subcategory,
        };
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/panel-create-sub-categories",
            method: "POST",
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
                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="category"
                                                required
                                                onChange={e => onInputChange(e)}
                                                value={categoriesSub.category}
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
                                        <Grid item lg={6} md={6} sm={6} xs={12} style={{display:'flex',justifyContent:'space-evenly'}}>
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
                                                Submit
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

export default CategoriesSubAdd;
