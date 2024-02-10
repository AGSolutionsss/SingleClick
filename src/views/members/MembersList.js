import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import {baseURL} from "../../api/index";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import axios from "axios";

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

const MembersList = () => {
    const classes = useStyles();
    const [userList, setMembersList] = useState([]);

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


        fetch(baseURL+'/panel-fetch-member-list', requestOptions)
        .then(response => response.json())
        .then(data => {
            let res = data.user;
            let tempRows = [];
            for (let i = 0; i < res.length; i++) {
          
                tempRows.push([
                    i+1,
                    res[i]["name"],
                    res[i]["company_name"],
                    res[i]["mobile"],
                    (res[i]["profile_type"] == 0 ? "Business" : "Service"),
                    res[i]["status"],
                    res[i]["id"]
                ]);
              
            }
            setMembersList(tempRows)
        }); 
    }, []);

    const onUpdate = (e, value) => {
        e.preventDefault();
        axios({
            url: baseURL+"/panel-update-member-status/"+value,
            method: "PUT",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                
                toast.success("Status Updated Successfully", {
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
                let response = res.data.user;
                let tempRows = [];
                for (let i = 0; i < res.length; i++) {
            
                    tempRows.push([
                        i+1,
                        response[i]["name"],
                        response[i]["company_name"],
                        response[i]["mobile"],
                        (response[i]["profile_type"] == 0 ? "Business" : "Service"),
                        response[i]["status"],
                        response[i]["id"]
                    ]);
                
                }
                setMembersList(tempRows);
            }
        });
    }

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
        "Name",
        "Company",
        "Mobile",
        "Profile",
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
                            <Tooltip title="Status" placement="top">
                                <IconButton aria-label="Status" style={{display:localStorage.getItem("user_type_id") == 3 ? "" : "none"}}>
                                    <EditIcon onClick={(e) => onUpdate(e, value)}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="View" placement="top">
                                <IconButton aria-label="View" >
                                    <Link to={"members-view?id="+value}>
                                        <VisibilityIcon/>
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
                    {userList.length > 0 && (
                        <MUIDataTable
                        data={userList}
                        columns={columnData}
                        options={option}
                    
                        />
                    )}
                    {userList.length <= 0 && (
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

export default MembersList;
