import React from "react";
import {Card, CardContent, Grid, useTheme} from '@material-ui/core';
import barChart from './chart/bar-chart';
import {gridSpacing} from '../../../store/constant';


const ChartCard = (props) => {
        
    const theme = useTheme();

    const primary = theme.palette.secondary.main;
    barChart.options.grid.borderColor = theme.palette.primary.light;
    barChart.options.yaxis.labels.style.colors = [theme.palette.secondary.main];
    barChart.options.xaxis.labels.style.colors = [primary, primary, primary, primary, primary, primary, primary];

    return (
        <Card>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    
                    <Grid item xs={12}>
                        
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ChartCard;
