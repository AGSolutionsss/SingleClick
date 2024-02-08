import React, { useState } from "react";
import clsx from 'clsx';
import { Formik } from 'formik';
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    makeStyles,
    OutlinedInput,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { baseURL } from '../../../../api/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const FirebaseLogin = (props, { className, ...rest }) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = React.useState(false);
    let history = useHistory();

    const [showButtonotp, setshowButtonotp] = React.useState(false);

    const [showButtonsubmit, setshowButtonSubmit] = React.useState(true);

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    
        const validateOnlyDigits = (inputtxt) => {

 
            var phoneno = /^\d+$/;
            if(inputtxt.match(phoneno) || inputtxt.length==0){
                return true;
                  }
                else
                  {
                  
                  return false;
                  }
        };

        const onInputChange = (e) =>{
            if(e.target.name=="username"){
                if(validateOnlyDigits(e.target.value)){
                    setUser({
                      ...user,
                      [e.target.name]: e.target.value,
                    });
                }
            }else{
                setUser({
                    ...user,
                    [e.target.name]: e.target.value,
                });
            }
        }

        const onCheckMobile = (e) =>{
            let data = {
                username: user.username,
            }
            var v = document.getElementById("addIndiv").checkValidity();
            var v = document.getElementById("addIndiv").reportValidity();
            e.preventDefault();
            if (v) {
                axios({
                  url: baseURL+"/panel-check-mobile-no",
                  method: "POST",
                  data,
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("login")}`,
                  },
                }).then((data) => {
                  
                    if (data.code == '400') {
                        toast.warning("Mobile No is not Registered", {
                            
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                        setshowButtonotp(false);
                        setshowButtonSubmit(true);
                    }else{
                        toast.success("OTP Sent to Mobile No", {
                           
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                        setshowButtonotp(true);
                        setshowButtonSubmit(false);
                        
                    }
                });
            }
        }

        const onSubmit = (e) => {
            let data = {
                username: user.username,
                password: user.password,
            }

            var v = document.getElementById("addIndiv").checkValidity();
            var v = document.getElementById("addIndiv").reportValidity();
            e.preventDefault();
            if (v) {
                axios({
                  url: baseURL+"/panel-login",
                  method: "POST",
                  data,
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("login")}`,
                  },
                }).then((res) => {
                  
                    if (res.data.code == '401') {
                        toast.error("Username or password is incorrect", {
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
                    }else if (res.data.code == '402') {
                        toast.error("User is inactive", {
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
                    }else  {
                        console.log('debug',res);
                        localStorage.setItem("name", res.data.UserInfo.user.name);
                        localStorage.setItem("user_type_id", res.data.UserInfo.user.user_type);
                        localStorage.setItem("agrawal_image", res.data.UserInfo.user.photo);
                        localStorage.setItem("login", res.data.UserInfo.token);
                        history.push("/dashboard");
                    }
                });
            }else{
                toast.error("Please Enter a Field", {
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

        }

    return (
        <React.Fragment>
            <Formik>
                <form id="addIndiv" noValidate className={clsx(classes.root, className)} {...rest}>
                    {showButtonsubmit ?
                    <FormControl
                        fullWidth
                        className={classes.loginput}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-email-login">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            value={user.username}
                            name="username"
                            required
                            onChange={(e) => onInputChange(e)}
                            label='username'
                            inputProps={{ maxLength: 10, minLength: 10 }}
                        />
                    </FormControl>
                    : ''}
                    {showButtonotp ?
                     <FormControl
                        fullWidth
                        className={classes.loginput}
                        variant="outlined"
                    >
                    <InputLabel htmlFor="outlined-adornment-password-login">OTP</InputLabel>     
                    <OutlinedInput
                        id="outlined-adornment-password-login"
                        type={showPassword ? 'text' : 'password'}
                        value={user.password}
                        name="password"
                        onChange={(e) => onInputChange(e)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label='Password'
                        inputProps={{
                            classes: {
                                notchedOutline: classes.notchedOutline
                            }
                        }}
                    />     
                    </FormControl>
                    : ''}
                    
                    <Box mt={2} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {showButtonotp ?
                        <Button
                            disableElevation
                            onClick={(e) => onSubmit(e)}
                            fullWidth
                            size="small "
                            type="submit"
                            variant="contained"
                            className={classes.login}
                            style={{ flex: 1, marginRight: '8px' }}
                        >
                            Sign in
                        </Button>
                    : ''}
                    {showButtonsubmit ?
                        <Button
                            disableElevation
                            onClick={(e) => onCheckMobile(e)}
                            fullWidth
                            size="small"
                            type="button"
                            variant="contained"
                            className={classes.login}
                            style={{ flex: 1, color: '#fff' }}
                        >
                            Send OTP
                        </Button>
                    : '' }
                    </Box>
                    <h4 style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', color: '#868688', fontWeight: '200' }}>Not a Member ! </h4>
                    <span>
                        <a href='register' style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                            Sign Up
                        </a>
                    </span>
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
                </form>
            </Formik>
        </React.Fragment>
    );
};

export default FirebaseLogin;
