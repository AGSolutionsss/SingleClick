import React, { useEffect, useState } from "react";
import {Grid} from '@material-ui/core';
import {gridSpacing} from '../../store/constant';
import EarningCard from '../../ui-component/cards/EarningCard';
import TotalChartCard from '../../ui-component/cards/TotalChartCard';
import {baseURL} from "../../api/index";

const Dashboard = () => {

    const [total_patron_life_member, settotal_patron_life_member] = useState("");
    const [total_life_member, settotal_life_member] = useState("");
    
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
        fetch(baseURL+'/fetch-web-dashboard', requestOptions)
        .then(response => response.json())
        .then(data => {
            settotal_patron_life_member(data.total_patron_life_member);
            settotal_life_member(data.total_life_member);
            
        }); 
    }, []);


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard total_patron_life_member={total_patron_life_member}/>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalChartCard total_life_member={total_life_member}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
