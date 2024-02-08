import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import {baseURL} from "../../api/index";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import {gridSpacing} from '../../store/constant';
import { Box, Button } from '@material-ui/core';

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

const CategoriesSubList = () => {
    const classes = useStyles();
    const [categoriesSubList, setCategoriesSubList] = useState([]);

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


        fetch(baseURL+'/panel-fetch-sub-categories-list', requestOptions)
        .then(response => response.json())
        .then(data => {
            let res = data.subcategories;
            let tempRows = [];
            for (let i = 0; i < res.length; i++) {
          
                tempRows.push([
                    i+1,
                    res[i]["category"],
                    res[i]["subcategory"],
                    res[i]["subcategory_status"],
                    res[i]["id"]
                ]);
              
            }
            setCategoriesSubList(tempRows)
        }); 
    }, []);

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
        "Category",
        "Sub Category",
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
                            <Tooltip title="Edit" placement="top">
                                 <IconButton aria-label="Edit">
                                    <Link to={"category-sub-edit?id="+value}>
                                        <EditIcon/>
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
         
            <Grid container>
            <Box mt={2} mb={2}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Link to="category-sub-add">
                                <Button
                                    fullWidth
                                    size="large"
                                    type="buton"
                                    variant="contained"
                                    className={classes.login2}
                                    
                                >
                                Add Category Sub
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Grid item xs={12}>
                {categoriesSubList.length > 0 && (
                    <MUIDataTable
                    data={categoriesSubList}
                    columns={columnData}
                    options={option}
                
                    />
                )}
                {categoriesSubList.length <= 0 && (
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

export default CategoriesSubList;
