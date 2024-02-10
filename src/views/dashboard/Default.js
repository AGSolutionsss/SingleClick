import React, { useEffect, useState } from "react";
import {Grid} from '@material-ui/core';
import {gridSpacing} from '../../store/constant';
import EarningCard from '../../ui-component/cards/EarningCard';
import TotalChartCard from '../../ui-component/cards/TotalChartCard';
import TotalCard from '../../ui-component/cards/TotalCard';
import {baseURL} from "../../api/index";

const Dashboard = () => {

    const [total_user, settotal_user] = useState("");
    const [total_member, settotal_member] = useState("");
    const [total_product, settotal_product] = useState("");
    
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
        fetch(baseURL+'/panel-fetch-dashboard', requestOptions)
        .then(response => response.json())
        .then(data => {
            settotal_user(data.total_user);
            settotal_member(data.total_member);
            settotal_product(data.total_product);
            
        }); 
    }, []);


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard total_user={total_user}/>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalChartCard total_member={total_member}/>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalCard total_product={total_product}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
