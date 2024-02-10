import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Button, Card, CardContent,TextField, Box  } from '@material-ui/core';
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

const ProfileEdit = () => {
    const classes = useStyles();
    let history = useHistory();
    const [selectedFile, setSelectedFile] = React.useState(null);
    
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
        photos: "",
        about_us: "",
        area: "",
    });

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

            axios({
                url: baseURL+"/panel-fetch-profile-edit",
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                
                setProfile(res.data.profile);
            });

        }
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

    const [categoriesSub, setCategoriesSub] = useState([]);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){
    
          window.location = "/login";
          
        }else{
    
        }
        axios({
          url: baseURL+"/panel-fetch-sub-categories-by-value/" + profile.category,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
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

    
    const onUpdate = (e) => {
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
        data.append("photos", selectedFile);
        
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/panel-update-profile?_method=PUT",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                toast.success("Profile updated Successfully", {
                    type: 'Success',
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                
            }else{
                toast.error("Profile is not updated", {
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
    };
       
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
                                    <Grid container spacing={gridSpacing} style={{justifyContent:'center'}}>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="name"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.name}
                                                label='Full Name'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="company_name"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.company_name}
                                                label='Company Name'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="profile_type"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.profile_type}
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                label='Profile Type'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {profile_type.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="category"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.category}
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                label='Category'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {categories.map((option) => (
                                                <MenuItem key={option.category} value={option.category}>
                                                    {option.category}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="sub_category"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.sub_category}
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                required
                                                label='Sub Category'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            >
                                            {categoriesSub.map((option) => (
                                                <MenuItem key={option.subcategory} value={option.subcategory}>
                                                    {option.subcategory}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="mobile"
                                                required
                                                inputProps={{ maxLength: 10,minLength: 10  }}
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.mobile}
                                                label='Mobile No'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="email"
                                                required
                                                type="email"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.email}
                                                label='Email Id'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="whatsapp"
                                                inputProps={{ maxLength: 10,minLength: 10  }}
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.whatsapp}
                                                label='Whats App'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="website"
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.website}
                                                label='Website'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                            
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="area"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.area}
                                                label='Area'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="photos"
                                                type="file"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                                value={profile.photos}
                                                label='User Image'
                                                className={classes.notchedOutline}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <img src={(profile.photo  === null || profile.photo === '' ? "https://singleclik.com/api/storage/app/public/no_image.jpg" : "https://singleclik.com/api/storage/app/public/user_images/"+profile.photo)} style={{width:'40px',height:'40px'}}/>
                                        </Grid>
                                        <Grid item lg={12} md={6} sm={6} xs={12}>
                                            <TextField
                                                name="about_us"
                                                required
                                                onChange={(e) => onInputChange(e)}
                                                value={profile.about_us}
                                                multiline
                                                label='About You'
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
                                                    onClick={(e) => onUpdate(e)}
                                                >
                                                Update
                                                </Button>
                                            </Grid>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <Link to="dashboard">
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

export default ProfileEdit;
