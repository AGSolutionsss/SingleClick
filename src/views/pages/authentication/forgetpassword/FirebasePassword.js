import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import  { useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    makeStyles,
    OutlinedInput,
    Typography
} from '@material-ui/core';
import useScriptRef from '../../../../hooks/useScriptRef';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { baseURL } from '../../../../api/index';
import { NotificationManager } from "react-notifications";


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

const FirebasePassword = (props, { className, ...rest }) => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const scriptedRef = useScriptRef();
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    let navigate = useHistory();

    const isMounted = useRef(true);
    useEffect(() => {
        return()=>{
            isMounted.current = false;
        };
    },[]);
        const handleClickShowPassword = () => {
            setShowPassword(!showPassword);
        };

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        fetch(
            encodeURI(baseURL + '/panel-check-status'),
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then((data) => {

                if (JSON.stringify(data).includes("ok")) {


                } else {

                    navigate.push("/maintenance");
                    console.log("mainataniace")
                    toast.warning('We are currently at Maintenance', {
                        type: 'info',
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
            .catch((err) => {
                console.log('Please enter username/mobile no correct')
                toast.error('Please enter username/mobile no correct', {
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

            });

        return (
            <>
                <React.Fragment>
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
                />
                    <Formik
                        initialValues={{
                            phone: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            phone: Yup.string().max(255).required('Username is required'),

                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                                if (scriptedRef.current) {

                                    let formData = new FormData();
                                    formData.append('phone', values.phone);
                                    fetch(
                                        encodeURI(baseURL + '/panel-send-password'),
                                        {
                                            method: "POST",
                                            body: formData
                                        }
                                    )
                                        .then((response) => response.json())
                                        .then((data) => {
                                            if(data.code == '200'){
                                                
                                                toast.success("New Password is sent to your Email Id", {

                                                    position: "top-right",
                                                    autoClose: 5000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: 'colored',
                                                });

                                                navigate.push("/login");
                                                
                                            }else{
                                                
                                                toast.error("Mobile No is not correct", {
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
                                        .catch((err) => {
                                            
                                                toast.error("Mobile no is not correct", {
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
                                            
                                        });


                                }
                            } catch (err) {
                                
                                if (scriptedRef.current) {
                                    setStatus({ success: false });
                                    setErrors({ submit: err.message });
                                    console.log("Mobile no is not correct")
                                    toast.error("Mobile no is not correct", {
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
                                    setSubmitting(false);
                                }
                            }
                        }}
                    >

                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} className={clsx(classes.root, className)} {...rest}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.phone)}
                                    className={classes.loginput}
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="outlined-adornment-email-login">Mobile No</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-login"
                                        value={values.phone}
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label='phone'
                                        inputProps={{
                                            classes: {
                                                notchedOutline: classes.notchedOutline
                                            }
                                        }}
                                    />
                                    {touched.phone && errors.phone && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {' '}
                                            {errors.phone}{' '}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                {errors.submit && (
                                    <Box mt={3}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Box>
                                )}

                                <Box mt={2}>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        className={classes.login}
                                    >
                                        Submit
                                    </Button>

                                </Box>


                            </form>
                        )}
                    </Formik>
                </React.Fragment></>
        );
    };

    export default FirebasePassword;
