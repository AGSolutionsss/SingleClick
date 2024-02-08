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

const gender = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
];

const blood = [
    {
        value: "A +",
        label: "A +",
    },
    {
        value: "A -",
        label: "A -",
    },
    {
        value: "B +",
        label: "B +",
    },
    {
        value: "B -",
        label: "B -",
    },
    {
        value: "O +",
        label: "O +",
    },
    {
        value: "O -",
        label: "O -",
    },
    {
        value: "AB +",
        label: "AB +",
    },
    {
        value: "AB -",
        label: "AB -",
    },
];

const identification = [
    {
      value: "Aadhar",
      label: "Aadhar",
    },
    {
      value: "PassPort",
      label: "PassPort",
    },
    {
        value: "PanCard",
        label: "PanCard",
      },
];

const married = [
    {
        value: "Yes",
        label: "Yes",
    },
    {
        value: "No",
        label: "No",
    },
];

const mailaddress = [
    {
        value: "Residence",
        label: "Residence",
    },
    {
        value: "Office",
        label: "Office",
    },
];

const Index = (props, { className, ...rest }) => {
    const classes = useStyles();

    var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  
  var todayback = yyyy + "-" + mm + "-" + dd;
  var d = document.getElementById("f_mdob");
  var d = document.getElementById("f_mfdob");
  if (d) {
    document.getElementById("f_mdob").setAttribute("max", todayback);
    document.getElementById("f_mfdob").setAttribute("max", todayback);
    
  }
    
    

    const [formData, setFormData] = useState({

        appli_name: "",
        appli_gender: "",
        appli_mno: "",
        appli_email: "",
        f_mgotra:"",
        f_mstate: "",
        f_mdob: "",
        f_mblood: "",
        f_mqualiself: "",
        f_nativeplace: "",
        proof_iden: "",
        f_mannidate: "",
        f_msname: "",
        f_msmno: "",
        f_msdob: "",
        f_msblood: "",
        f_mqualispouse: "",
        married: "",
        f_mfname: "",
        f_mfmno: "",
        f_mfdob: "",
        f_moffiadd: "",
        f_moffiland: "",
        f_mofficity: "",
        f_moffipin: "",
        f_mresadd: "",
        f_mresland: "",
        f_mrescity: "",
        f_mrespin: "",
        mailaddress: "",
        f_mresibang: "",
        office_phone: "",
        org_name: "",
        org_type: "",
        org_product: "",
        whats_app: "",
        agrawal_image: "",
        upload_doc_proof: "",
        otpcode: "",
        f_motherorga:"",
        priceaga: "",
        f_mmemno: "",
        f_mintrophone: "",
        f_mintroadd: "",
        donateblood: "",
        f_mintroby: "",
    });

    const [otpSent, setOtpSent] = useState(false);
    const [topping, setTopping] = useState("5100")

    const handleSendOtp = () => {
        const data = new FormData();
        data.append("appli_mno", formData.appli_mno);
        axios({
            url: baseURL+"/web-registerotp",
            method: "POST",
            data,
        })

            .then((res) => {
                if (res.data.code == 200) {
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
                    setOtpSent(true);
                } else {
                    toast.warning("Failed to send OTP", {
                            
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
            })
            .catch((error) => {
                console.error('Error sending OTP:', error);
            });
    };



    const [selectedFile, setSelectedFile] = React.useState(null);
    const [selectedFiledoc, setSelectedFileDoc] = React.useState(null);
    const handleSubmit = (e) => {

        const data = new FormData();
        data.append("appli_name", formData.appli_name);
        data.append("appli_gender", formData.appli_gender);
        data.append("appli_mno", formData.appli_mno);
        data.append("appli_email", formData.appli_email);
        data.append("f_mgotra", formData.f_mgotra);
        data.append("f_mdob", formData.f_mdob);
        data.append("f_mblood", formData.f_mblood);
        data.append("f_mqualiself", formData.f_mqualiself);
        data.append("f_mqualispouse", formData.f_mqualispouse);
        data.append("f_msblood", formData.f_msblood);
        data.append("f_nativeplace", formData.f_nativeplace);
        data.append("f_mstate", formData.f_mstate);
        data.append("proof_iden", formData.proof_iden);
        data.append("f_mannidate", formData.f_mannidate);
        data.append("f_msname", formData.f_msname);
        data.append("f_msdob", formData.f_msdob);
        data.append("married", formData.married);
        data.append("gender", formData.gender);
        data.append("f_mfname", formData.f_mfname);
        data.append("f_mfmno", formData.f_mfmno);
        data.append("f_msmno", formData.f_msmno);
        data.append("f_mfdob", formData.f_mfdob);
        data.append("f_moffiadd", formData.f_moffiadd);
        data.append("f_moffiland", formData.f_moffiland);
        data.append("f_mofficity", formData.f_mofficity);
        data.append("f_moffipin", formData.f_moffipin);
        data.append("f_mresadd", formData.f_mresadd);
        data.append("f_mresland", formData.f_mresland);
        data.append("f_mrescity", formData.f_mrescity);
        data.append("f_mrespin", formData.f_mrespin);
        data.append("mailaddress", formData.mailaddress);
        data.append("f_mresibang", formData.f_mresibang);
        data.append("office_phone", formData.office_phone);
        data.append("org_name", formData.org_name);
        data.append("org_type", formData.org_type);
        data.append("org_product", formData.org_product);
        data.append("whats_app", formData.whats_app);
        data.append("agrawal_image", selectedFile);
        data.append("upload_doc_proof", selectedFiledoc);
        data.append("otpcode", formData.otpcode);
        data.append("priceaga", formData.priceaga);
        data.append("f_motherorga", formData.f_motherorga);
        data.append("f_mmemno", formData.f_mmemno);
        data.append("f_mintrophone", formData.f_mintrophone);
        data.append("f_mintroadd", formData.f_mintroadd);
        data.append("donateblood", formData.donateblood);
        data.append("f_mintroby", formData.f_mintroby);
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
            axios({
                url: baseURL+"/web-insert-register",
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
                    });
                    if(formData.priceaga == '11100'){
                        window.location='https://easebuzz.in/quickpay/txtnulgirt';
                    }else{
                        window.location='https://easebuzz.in/quickpay/cdnfsvlmyl';
                    }
                    
                }
                else if (res.data.code == 400) {
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
                else if (res.data.code == 401) {
                    toast.error("OTP Dosnot Match", {
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

        if (e.target.name == "appli_mno") {
            if (validateOnlyDigits(e.target.value)) {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
            }
        } else if (e.target.name == "appli_name") {

            if (validateOnlyText(e.target.value)) {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
            }

        } else if (e.target.name == "f_mfname") {

            if (validateOnlyText(e.target.value)) {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
            }

        } else if (e.target.name == "office_phone") {
            if (validateOnlyDigits(e.target.value)) {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
            }
        } else if (e.target.name == "whats_app") {
            if (validateOnlyDigits(e.target.value)) {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "f_mfmno") {
            if (validateOnlyDigits(e.target.value)) {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "f_mrespin") {
            if (validateOnlyDigits(e.target.value)) {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "f_moffipin") {
            if (validateOnlyDigits(e.target.value)) {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "f_mmemno") {
            if (validateOnlyDigits(e.target.value)) {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "f_mintrophone") {
            if (validateOnlyDigits(e.target.value)) {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "f_msmno") {
            if (validateOnlyDigits(e.target.value)) {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
            }
        }else if (e.target.name == "priceaga"){
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
            setTopping(e.target.value)
            
            console.log("priceaga1",e.target.value);
        }
        
        else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    }



    const [states, setStates] = useState([]);
    useEffect(() => {
        
        var theLoginToken = localStorage.getItem('login');       
            
        const requestOptions = {
                method: 'GET', 
                headers: {
                'Authorization': 'Bearer '+theLoginToken
                }             
        };     


        fetch(baseURL+'/fetch-web-state', requestOptions)
        .then(response => response.json())
        .then(data => setStates(data.statedata)); 
    }, []);

    const [gottras, setGotras] = useState([]);
    useEffect(() => {
        
        var theLoginToken = localStorage.getItem('login');       
            
        const requestOptions = {
                method: 'GET', 
                headers: {
                'Authorization': 'Bearer '+theLoginToken
                }             
        };     


        fetch(baseURL+'/fetch-web-gotra', requestOptions)
        .then(response => response.json())
        .then(data => setGotras(data.gotradata)); 
    }, []);


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
                                                    name="appli_name"
                                                    label="Name"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={formData.appli_name}
                                                    variant="standard"
                                                    required

                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField
                                                    name="appli_gender"
                                                    label="Gender"
                                                    select
                                                    SelectProps={{
                                                        MenuProps: {},
                                                    }}
                                                    onChange={(e) => onInputChange(e)}
                                                    value={formData.appli_gender}
                                                    variant="standard"
                                                    required

                                                    >
                                                    {gender.map((option) => (
                                                        <MenuItem key={option.label} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                    </TextField>
                                            </FormControl>
                                        </Grid>
                                        
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField
                                                    name="f_mgotra"
                                                    required
                                                    variant="standard"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={formData.f_mgotra}
                                                    select
                                                    SelectProps={{
                                                        MenuProps: {},
                                                    }}
                                                    label='Gotra'
                                                    fullWidth
                                                >
                                                    
                                                    {gottras.map((gotraItem) => (
                                                        <MenuItem key={gotraItem.gotra_name} value={gotraItem.gotra_name}>
                                                            {gotraItem.gotra_name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField
                                                    id="standard-basic"
                                                    name='f_mstate'
                                                    label="State"
                                                    required
                                                    variant="standard"
                                                    select
                                                    value={formData.f_mstate}
                                                    onChange={onInputChange}
                                                    SelectProps={{
                                                        MenuProps: {},
                                                    }}
                                                >
                                                    {states.map((stateItem) => (
                                                        <MenuItem key={stateItem.state_name} value={stateItem.state_name}>
                                                            {stateItem.state_name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </FormControl>
                                        </Grid>

                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField required name="appli_mno" label="Mobile No" variant="standard" onChange={(e) => onInputChange(e)}
                                                    value={formData.appli_mno} inputProps={{ maxLength: 10,minLength: 10  }} />
                                            </FormControl>
                                        </Grid>

                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField id="standard-basic" type='email' required name="appli_email" onChange={(e) => onInputChange(e)}
                                                    value={formData.appli_email} label="Email Address" variant="standard" />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField
                                                    id="f_mdob"
                                                    name="f_mdob"
                                                    label="Date of Birth"
                                                    type="date"
                                                    required
                                                    variant="standard"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={formData.f_mdob}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField
                                                    name="f_mblood"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={formData.f_mblood}
                                                    select
                                                    SelectProps={{
                                                        MenuProps: {},
                                                    }}
                                                    label='Blood Group'
                                                    variant="standard"
                                                    fullWidth
                                                >
                                                {blood.map((option) => (
                                                    <MenuItem key={option.label} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                                </TextField>
                                            </FormControl>
                                        </Grid>
                                    </Grid><br/><br/>


                                    <Grid container spacing={5}>
                                        <Grid item lg={3} md={6} sm={6} xs={12} >
                                            <FormControl fullWidth variant="outlined">
                                                <TextField id="standard-basic" name='f_mqualiself' label="Qualification" required variant="standard" onChange={(e) => onInputChange(e)}
                                                    value={formData.f_mqualiself} />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField
                                                    name="proof_iden"
                                                    required
                                                    onChange={(e) => onInputChange(e)}
                                                    value={formData.proof_iden}
                                                    select
                                                    SelectProps={{
                                                        MenuProps: {},
                                                    }}
                                                    label='Proof Identification'
                                                    variant="standard"
                                                    fullWidth
                                                >
                                                {identification.map((option) => (
                                                    <MenuItem key={option.label} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                                </TextField>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField id="standard-basic" InputLabelProps={{
                                                        shrink: true,
                                                    }} name='upload_doc_proof' label="Upload your document proof" required variant="standard" type='file' onChange={(e) => setSelectedFileDoc(e.target.files[0])} />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl fullWidth variant="outlined">
                                                <TextField id="standard-basic" InputLabelProps={{
                                                        shrink: true,
                                                    }} name='agrawal_image'  label="Profile Image" required variant="standard" type='file' onChange={(e) => setSelectedFile(e.target.files[0])} />
                                            </FormControl>
                                        </Grid>
                                    </Grid><br></br>

                                    <Grid container spacing={2} alignItems="center" justifyContent="center">

                                        <Grid item xs={12}>
                                            <h5>Family Information</h5><hr></hr> <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            name="married"
                                                            required
                                                            onChange={(e) => onInputChange(e)}
                                                            value={formData.married}
                                                            select
                                                            SelectProps={{
                                                                MenuProps: {},
                                                            }}
                                                            label='Are you married'
                                                            variant="standard"
                                                            fullWidth
                                                        >
                                                        {married.map((option) => (
                                                            <MenuItem key={option.label} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                        </TextField>
                                                        
                                                    </FormControl>
                                                </Grid>

                                                { formData.married == "Yes" && (
                                                    <Grid item xs={12}>

                                                        <FormControl fullWidth>
                                                            <h5>Spouse Information</h5>
                                                            <Grid container spacing={2}>
                                                                <Grid item lg={3} md={6} sm={6} xs={12}>
                                                                    <FormControl fullWidth variant="outlined">
                                                                        <TextField 
                                                                            id="f_mannidate" 
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                            type="date" 
                                                                            name='f_mannidate' 
                                                                            label="Anniversery" 
                                                                            variant="standard" 
                                                                            onChange={(e) => onInputChange(e)}
                                                                            value={formData.f_mannidate} 
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item lg={3} md={6} sm={6} xs={12}>
                                                                    <TextField id="spouse-name" label="Spouse Name" name="f_msname" variant='standard' fullWidth onChange={(e) => onInputChange(e)}
                                                                        value={formData.f_msname} />
                                                                </Grid>
                                                                <Grid item lg={3} md={6} sm={6} xs={12}>
                                                                    <TextField id="spouse-mobile" label="Spouse Mobile Number" name="f_msmno" variant='standard' inputProps={{ maxLength: 10,minLength: 10  }} fullWidth onChange={(e) => onInputChange(e)}
                                                                        value={formData.f_msmno} />
                                                                </Grid>
                                                                <Grid item lg={3} md={6} sm={6} xs={12}>
                                                                    <FormControl fullWidth variant="outlined">
                                                                        <TextField
                                                                            id="f_msdob"
                                                                            label="Spouse's Date of Birth"
                                                                            name="f_msdob"
                                                                            variant='standard'
                                                                            fullWidth
                                                                            onChange={(e) => onInputChange(e)}
                                                                            value={formData.f_msdob}
                                                                            type="date"
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item lg={3} md={6} sm={6} xs={12}>
                                                                    <TextField
                                                                        name="f_msblood"
                                                                        onChange={(e) => onInputChange(e)}
                                                                        value={formData.f_msblood}
                                                                        select
                                                                        SelectProps={{
                                                                            MenuProps: {},
                                                                        }}
                                                                        label='Spouse Blood'
                                                                        variant='standard'
                                                                        fullWidth
                                                                    >
                                                                        {blood.map((option) => (
                                                                            <MenuItem key={option.label} value={option.value}>
                                                                                {option.label}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                </Grid>
                                                                
                                                                <Grid item lg={3} md={6} sm={6} xs={12}>
                                                                    <TextField id="spouse-qualification" label="Qualification (Spouse)" name="f_mqualispouse" variant='standard' fullWidth onChange={(e) => onInputChange(e)}
                                                                        value={formData.f_mqualispouse} />
                                                                </Grid>
                                                            </Grid>
                                                        </FormControl>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid item container xs={12} spacing={2}>
                                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField required name="f_mfname" label="Father Name" variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.f_mfname} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField 
                                                        required 
                                                        id="f_mfdob" 
                                                        name="f_mfdob" 
                                                        label="DOB" 
                                                        variant="standard"
                                                        onChange={(e) => onInputChange(e)}
                                                        value={formData.f_mfdob}
                                                        type="date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField required name="f_mfmno" label=" Father's Mobile No" inputProps={{ maxLength: 10,minLength: 10  }} variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.f_mfmno} />
                                                </FormControl>

                                            </Grid>
                                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField id="standard-basic" name='f_nativeplace' label="Nativeplace" required variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.f_nativeplace} />
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} alignItems="center" justifyContent="center">

                                            <Grid item xs={12}>
                                                <h5>Contact</h5><hr></hr>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField required name="f_mresadd" label="Residential Address" variant="standard" value={formData.f_mresadd} onChange={(e) => onInputChange(e)}/>
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={7} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField required name="f_mresland" label="Landmark" variant="standard" value={formData.f_mresland} onChange={(e) => onInputChange(e)}/>
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField required name="f_mrescity" label="City" variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.f_mrescity} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField required name="f_mrespin" inputProps={{ maxLength: 6,minLength: 6  }} label="Pincode" variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.f_mrespin} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField name="f_moffiadd" label="Office Address" variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.f_moffiadd} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={5} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField name="f_moffiland" label="Landmark" variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.f_moffiland} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField name="f_mofficity" label="City" variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.f_mofficity} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField name="f_moffipin" label="Pincode" inputProps={{ maxLength: 6,minLength: 6  }} variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.f_moffipin} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField name="office_phone" label="Office No" variant="standard" inputProps={{ maxLength: 10,minLength: 10  }} onChange={(e) => onInputChange(e)}
                                                        value={formData.office_phone} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField required name="whats_app" label="Whats App" inputProps={{ maxLength: 10,minLength: 10  }} variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.whats_app} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField
                                                        name="mailaddress"
                                                        required
                                                        onChange={(e) => onInputChange(e)}
                                                        value={formData.mailaddress}
                                                        select
                                                        SelectProps={{
                                                            MenuProps: {},
                                                        }}
                                                        label='Mail Address'
                                                        variant="standard"
                                                        fullWidth
                                                    >
                                                    {mailaddress.map((option) => (
                                                        <MenuItem key={option.label} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                    </TextField>
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField required name="f_mresibang" label="Since Resident in Bangalore (Year)" inputProps={{ maxLength: 4,minLength: 4  }} variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.f_mresibang} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField
                                                    name="donateblood"
                                                    required
                                                    onChange={(e) => onInputChange(e)}
                                                    value={formData.donateblood}
                                                    select
                                                    SelectProps={{
                                                        MenuProps: {},
                                                    }}
                                                    label='Donate Blood'
                                                    variant="standard"
                                                    fullWidth
                                                >
                                                {married.map((option) => (
                                                    <MenuItem key={option.label} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                                </TextField>
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                                            <Grid item xs={12}>
                                                <h5>Introduction</h5><hr></hr>
                                            </Grid>
                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField required name="f_mintroby" label="Introducd By (Member Name)" variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.f_mintroby} />
                                                </FormControl>
                                            </Grid>

                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField required name="f_mmemno" inputProps={{ maxLength: 4  }} label="Membership No. of Introducer" variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.f_mmemno} />
                                                </FormControl>
                                            </Grid>

                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField required name="f_mintrophone" inputProps={{ maxLength: 10,minLength: 10  }} label="Phone No. of Introducer" variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.f_mintrophone} />
                                                </FormControl>
                                            </Grid>

                                            <Grid item lg={9} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <TextField required name="f_mintroadd" label="Address of Introducer" variant="standard" onChange={(e) => onInputChange(e)}
                                                        value={formData.f_mintroadd} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                                <FormControl fullWidth variant="standard">
                                                    <TextField
                                                        name="f_motherorga"
                                                        required
                                                        onChange={(e) => onInputChange(e)}
                                                        value={formData.f_motherorga}
                                                        select
                                                        SelectProps={{
                                                            MenuProps: {},
                                                        }}
                                                        label='Member of any Other Organizations'
                                                        variant="standard"
                                                        fullWidth
                                                    >
                                                    {married.map((option) => (
                                                        <MenuItem key={option.label} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                    </TextField>
                                                </FormControl>
                                            </Grid>
                                             {
                                                formData.f_motherorga == "Yes" ?
                                                <>
                                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                                    <FormControl fullWidth variant="outlined">
                                                        <TextField name="org_name" label="Organization Name" variant="standard" onChange={(e) => onInputChange(e)}
                                                            value={formData.org_name} />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                                    <FormControl fullWidth variant="outlined">
                                                        <TextField  name="org_type" label="Organization Type" variant="standard" onChange={(e) => onInputChange(e)}
                                                            value={formData.org_type} />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                                    <FormControl fullWidth variant="outlined">
                                                        <TextField  name="org_product" label="Organizations Product" variant="standard" onChange={(e) => onInputChange(e)}
                                                            value={formData.org_product} />
                                                    </FormControl>
                                                </Grid>
                                                </>
                                                : ""
                                             }   
                                            <Grid item lg={3} md={3} sm={3} xs={3} mt={2}>
                                                <label style={{fontSize: "16px"}}>
                                                    <strong>
                                                        Life Member
                                                    </strong>
                                                </label>
                                            </Grid>    
                                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                                <label style={{fontSize: "16px"}}>
							                                    
                                                    Entry Fee:  100.00
                                                
                                                </label>
                                            </Grid>    
                                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                                <label style={{fontSize: "16px"}}>
							                        Membership:  5,000.00
                                                </label>
                                            </Grid>
                                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                                <label style={{fontSize: "16px"}} ><input type="radio" name="priceaga" checked={topping === "5100"} onChange={(e) => onInputChange(e)} value="5100" defaultValue="5100"  /> 5,100.00</label>
                                            </Grid>
                                            <Grid item lg={3} md={3} sm={3} xs={3} mt={2}>
                                                <label style={{fontSize: "16px"}}>
                                                    <strong>
                                                        Patron Life Member
                                                    </strong>
                                                </label>
                                            </Grid>    
                                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                                <label style={{fontSize: "16px"}}>
							                                    
                                                    Entry Fee:  100.00
                                                
                                                </label>
                                            </Grid>    
                                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                                <label style={{fontSize: "16px"}}>
							                        Membership:  11,000.00
                                                </label>
                                            </Grid>
                                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                                <label style={{fontSize: "16px"}} ><input type="radio" name="priceaga" checked={topping === "11100"} value="11100" onChange={(e) => onInputChange(e)} defaultValue="11100" /> 11,100.00</label>
                                            </Grid>
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
                        

                        {!otpSent && (
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
                                                onClick={handleSendOtp}
                                            >
                                            Send OTP
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                            
                        )}

                        {otpSent && (
                            <Box mt={2}>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item lg={2} md={6} sm={6} xs={12}>
                                        <FormControl fullWidth variant="outlined">
                                            <TextField 
                                                required
                                                name="otpcode"
                                                label="Enter OTP" 
                                                variant="standard" 
                                                onChange={(e) => onInputChange(e)}
                                                value={formData.otpcode} 
                                            />
                                        </FormControl>
                                    </Grid>
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
                                </Grid>
                            </Grid>
                        </Box>
                        )}

                    </CardContent>
                </Card>
            </Grid>

        </Grid>

    );
};

export default Index;
