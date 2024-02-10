import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import axios from 'axios';
import { Card, CardContent, Divider, Grid, makeStyles, Typography, MenuItem, Button,Box } from '@material-ui/core';
import {FormControl} from '@material-ui/core';
import { baseURL } from '../../../../api/index';
import {gridSpacing} from '../../../../store/constant';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AgrawalSamaj from './../../../../assets/images/logo.png';
import './style.css'
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {},
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[600],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    margin: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    },
    forgot: {
        textDecoration: 'none',
        color: theme.palette.purple.main
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    title: {
        color: theme.palette.grey[600]
    },
    login: {
        backgroundColor: '#a41460',
        '&:hover': {
            backgroundColor: '#f770b5'
        }
    },
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
    startAdornment: {
        color: theme.palette.grey[500],
        marginTop: '18px',
        width: 'auto'
    }
}));

const profile_type = [
    {
      value: "0",
      label: "Business",
    },
    {
      value: "1",
      label: "Service",
    },
];

const Index = (props, { className, ...rest }) => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = React.useState(null);
    let history = useHistory();
    const [profile, setProfile] = useState({
        name: "",
        company_name: "",
        mobile: "",
        email: "",
        profile_type: "",
        category: "",
        sub_category: "",
        whatsapp: "",
        website: "",
        photo: "",
        about_us: "",
        area: "",
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        
        axios({
          url: baseURL+"/panel-fetch-register-categories",
          method: "GET",
        }).then((res) => {
          
            setCategories(res.data.categories);
          
        });
    }, []);

    const [categoriesSub, setCategoriesSub] = useState([]);

    useEffect(() => {
        
        axios({
          url: baseURL+"/panel-fetch-register-sub-categories-by-value/" + profile.category,
          method: "GET",
          
        }).then((res) => {
          
            setCategoriesSub(res.data.categoriessub);
          
        });
    }, [profile.category]);

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if (inputtxt.match(phoneno) || inputtxt.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    const validateOnlyText = (inputtxt) => {

        var re = /^[A-Za-z ]+$/;
        if (inputtxt === "" || re.test(inputtxt)) {
            return true;
        } else {
            return false;
        }
    }

    const onInputChange = (e) => {
        if (e.target.name == "mobile") {
            if (validateOnlyDigits(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "company_name") {
            if (validateOnlyText(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "whatsapp") {
            if (validateOnlyDigits(e.target.value)) {
                setProfile({
                    ...profile,
                    [e.target.name]: e.target.value,
                });
            }
        }else{
            setProfile({
                ...profile,
                [e.target.name]: e.target.value,
            });
        }
    };
    
    const handleSubmit = (e) => {

        const data = new FormData();
        data.append("name", profile.name);
        data.append("company_name", profile.company_name);
        data.append("mobile", profile.mobile);
        data.append("email", profile.email);
        data.append("profile_type", profile.profile_type);
        data.append("category", profile.category);
        data.append("sub_category", profile.sub_category);
        data.append("whatsapp", profile.whatsapp);
        data.append("website", profile.website);
        data.append("about_us", profile.about_us);
        data.append("area", profile.area);
        data.append("photo", selectedFile);
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
            axios({
                url: baseURL+"/panel-create-profile",
                method: "POST",
                data,
            }).then((res) => {
                if (res.data.code == 200) {
                    toast.success("User Created Succssfully", {
                           
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        onClose: () => history.push('/login')
                    });
                }
                else if (res.data.code == 401) {
                    toast.error("Name Duplicate Entry", {
                        type: 'error',
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                }
                else if (res.data.code == 402) {
                    toast.error("Mobile No  Duplicate Entry", {
                        type: 'error',
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }else if (res.data.code == 403) {
                    toast.error("Email Id  Duplicate Entry", {
                        type: 'error',
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
                else {
                    toast.error("Duplicate Entry", {
                        type: 'error',
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            })
        }
    }


    return (
        <Grid container justifyContent="space-between" alignItems="center" className={classes.root}>
            <Grid item container justifyContent="center" md={12} style={{ backgroundColor: '#cfc3c2', padding: '40px 0px' }}>
                <Card className={classes.card} style={{ padding: '20px', width: '90%', boxshadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} >
                    <CardContent className={classes.content}>
                        <Grid container direction="column" spacing={2} justifyContent="center">
                            <Grid item xs={3}>
                                <Grid container>
                                    <Grid item className={classes.icon}>
                                        <RouterLink to="#" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                            <img alt="Auth method" src={AgrawalSamaj}  style={{ marginRight: '5px',width:'180px'}} />
                                        </RouterLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <form id="addIndiv" autoComplete="off">
                                    <Grid container spacing={5}>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField
                                                    name="name"
                                                    label="Full Name"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={profile.name}
                                                    variant="standard"
                                                    required
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField
                                                    name="name"
                                                    label="Company Name"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={profile.company_name}
                                                    variant="standard"
                                                    required
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                            <TextField
                                                name="profile_type"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.profile_type}
                                                variant="standard"
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                label='Profile'
                                                fullWidth
                                            >
                                                {profile_type.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            </FormControl>
                                        </Grid>
                                        
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                            <TextField
                                                name="category"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.category}
                                                variant="standard"
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                label='Category'
                                                fullWidth
                                            >
                                            {categories.map((option) => (
                                                <MenuItem key={option.category} value={option.category}>
                                                    {option.category}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField
                                                    name="sub_category"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={profile.sub_category}
                                                    variant="standard"
                                                    select
                                                    SelectProps={{
                                                        MenuProps: {},
                                                    }}
                                                    required
                                                    label='Sub Category'
                                                    fullWidth
                                                >
                                                {categoriesSub.map((option) => (
                                                    <MenuItem key={option.subcategory} value={option.subcategory}>
                                                        {option.subcategory}
                                                    </MenuItem>
                                                ))}
                                                </TextField>
                                            </FormControl>
                                        </Grid>

                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                            <TextField
                                                name="mobile"
                                                required
                                                variant="standard"
                                                inputProps={{ maxLength: 10,minLength: 10  }}
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.mobile}
                                                label='Mobile No'
                                                fullWidth
                                            />
                                            </FormControl>
                                        </Grid>

                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField
                                                    name="email"
                                                    required
                                                    type="email"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={profile.email}
                                                    label='Email Id'
                                                    variant="standard"
                                                    fullWidth
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                            <TextField
                                                name="whatsapp"
                                                inputProps={{ maxLength: 10,minLength: 10  }}
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.whatsapp}
                                                label='Whats App'
                                                variant="standard"
                                                fullWidth
                                            />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField
                                                    name="website"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={profile.website}
                                                    label='Website'
                                                    variant="standard"
                                                    fullWidth
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12} >
                                            <FormControl fullWidth variant="outlined">
                                                <TextField
                                                name="area"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.area}
                                                label='Area'
                                                variant="standard"
                                                fullWidth
                                            />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField
                                                name="photos"
                                                type="file"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                                value={profile.photos}
                                                label='User Image'
                                                variant="standard"
                                                fullWidth
                                            />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                            <TextField
                                                name="about_us"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.about_us}
                                                multiline
                                                label='About You'
                                                variant="standard"
                                                fullWidth
                                            />
                                            </FormControl>
                                        </Grid>
                                        
                                    </Grid>
                                </form>
                            </Grid>
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
                                theme="dark"
                            />
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item container direction="column" alignItems="center" xs={12}>
                                    <Typography component={RouterLink} variant="subtitle1" className={classes.title}>

                                    </Typography>
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
                                            onClick={handleSubmit}
                                        >
                                        Submit
                                        </Button>
                                    </Grid>
                                    <Grid item lg={2} md={6} sm={6} xs={12}>
                                        <Link to="login">
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
                        

                    </CardContent>
                </Card>
            </Grid>

        </Grid>

    );
};

export default Index;
