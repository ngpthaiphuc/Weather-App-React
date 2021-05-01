import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { /*Button,*/ Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'

export default function WeatherDisplay(weather, isHourly) {

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    function createData(name, icon, weather, temp, feels_like) {
        return { name, icon, weather, temp, feels_like };
    }

    console.log(weather);
    
    const rows = [createData('Current', weather.weather.current.weather[0].icon, weather.weather.current.weather[0].main, weather.weather.current.temp, weather.weather.current.feels_like)];
    let i;

    if(isHourly){
        for(i = 0; i < 48; i++){
            //console.log("Hourly: " + i);
            rows.push(createData(`+${i+1} Hour`, weather.weather.hourly[i].weather[0].icon, weather.weather.hourly[i].weather[0].main, weather.weather.hourly[i].temp, weather.weather.hourly[i].feels_like));
        }
    } else{
        for(i = 0; i < 7; i++){
            //console.log("Daily: " + i);
            rows.push(createData(`+${i+1} Day`, weather.weather.daily[i].weather[0].icon, weather.weather.daily[i].weather[0].main, weather.weather.daily[i].temp, weather.weather.daily[i].feels_like));
        }
    }
    console.log(isHourly);

    /*const rows = [
        createData('Current', weather.weather.current.weather[0].icon, weather.weather.current.weather[0].main, weather.weather.current.temp, weather.weather.current.feels_like),
        createData('+1 Hour', weather.weather.hourly[0].weather[0].icon, weather.weather.hourly[0].weather[0].main, weather.weather.hourly[0].temp, weather.weather.hourly[0].feels_like),
        createData('+2 Hour', weather.weather.hourly[1].weather[0].icon, weather.weather.hourly[1].weather[0].main, weather.weather.hourly[1].temp, weather.weather.hourly[1].feels_like),
        createData('+3 Hour', weather.weather.hourly[2].weather[0].icon, weather.weather.hourly[2].weather[0].main, weather.weather.hourly[2].temp, weather.weather.hourly[2].feels_like),
        createData('+4 Hour', weather.weather.hourly[3].weather[0].icon, weather.weather.hourly[3].weather[0].main, weather.weather.hourly[3].temp, weather.weather.hourly[3].feels_like),
        createData('+5 Hour', weather.weather.hourly[4].weather[0].icon, weather.weather.hourly[4].weather[0].main, weather.weather.hourly[4].temp, weather.weather.hourly[4].feels_like),
        createData('+6 Hour', weather.weather.hourly[5].weather[0].icon, weather.weather.hourly[5].weather[0].main, weather.weather.hourly[5].temp, weather.weather.hourly[5].feels_like),
        createData('+7 Hour', weather.weather.hourly[6].weather[0].icon, weather.weather.hourly[6].weather[0].main, weather.weather.hourly[6].temp, weather.weather.hourly[6].feels_like),
        createData('+8 Hour', weather.weather.hourly[7].weather[0].icon, weather.weather.hourly[7].weather[0].main, weather.weather.hourly[7].temp, weather.weather.hourly[7].feels_like),
        createData('+9 Hour', weather.weather.hourly[8].weather[0].icon, weather.weather.hourly[8].weather[0].main, weather.weather.hourly[8].temp, weather.weather.hourly[8].feels_like),
        createData('+10 Hour', weather.weather.hourly[9].weather[0].icon, weather.weather.hourly[9].weather[0].main, weather.weather.hourly[9].temp, weather.weather.hourly[9].feels_like),
    ];*/

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={useStyles.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            <TableCell align="right">Icon</TableCell>
                            <TableCell align="right">Weather</TableCell>
                            <TableCell align="right">Temp&nbsp;(°F)</TableCell>
                            <TableCell align="right">Feels Like&nbsp;(°F)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.icon}</TableCell>
                                <TableCell align="right">{row.weather}</TableCell>
                                <TableCell align="right">{row.temp}</TableCell>
                                <TableCell align="right">{row.feels_like}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}