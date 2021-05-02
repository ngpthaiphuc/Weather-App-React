import './App.css';
import React, { useState } from 'react';
import API_KEY from './keys';
import { Input, Button/*, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup*/ } from '@material-ui/core';
import WeatherDisplay from './WeatherDisplay'

export default function App() {
    //const API_KEY = process.env.REACT_APP_api_key;
    const [weather, setWeather]     = useState(null);
    const [zipCode, setZipCode]     = useState(22904);
    const [isZipCode, setIsZipCode] = useState(false);
    //const [lat, setLat] = useState();
    //const [long, setLong] = useState();
    const [testBool, setTestBool]   = useState(true);

    /*useEffect(() => {
        const url = new URL("https://api.openweathermap.org/data/2.5/weather");
        url.searchParams.append("appid", "2b553aeab9a111b4d435be3726d191c1");
        url.searchParams.append("zip", 22904); //Charlottesville
        url.searchParams.append("units", "imperial"); //Fahrenheit
        fetch(url)
            .then((resp) => {
                return resp.json();
            })
            .then((obj) => {
                //if (obj.cod === 200) { //no html errors
                    setWeather(obj);
                //} else {
                    //setWeather(false);
                //}
            });
    }, []);*/
    //console.log(API_KEY);

    const fetchWeather = () => {
        setIsZipCode(true);
        const url = new URL("https://api.openweathermap.org/data/2.5/weather");
        url.searchParams.append("appid", API_KEY);
        url.searchParams.append("zip", zipCode); //default: Charlottesville
        url.searchParams.append("units", "imperial"); //Fahrenheit
        fetch(url)
            .then((resp) => {
                return resp.json();
            })
            .then((obj) => {
                //if (obj.cod === 200) { //no html errors
                    setWeather(obj);
                //} else {
                //    setWeather(false);
                //}
            });
    }

    const fetchOneCallWeather = (latitude, longitude) => {
        setIsZipCode(false);
        const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
        url.searchParams.append("appid", API_KEY);
        url.searchParams.append("lat", latitude);
        url.searchParams.append("lon", longitude);
        url.searchParams.append("units", "imperial"); //Fahrenheit
        fetch(url)
            .then((resp) => {
                return resp.json();
            })
            .then((obj) => {
                setWeather(obj);
            });

        //console.log(weather);
    }

    function getUserLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(positionToLatLong);
        } else {
            console.log("Geolocation is not supported");
        }
    }

    const positionToLatLong = (position) => {
        console.log(position.coords.latitude + ", " + position.coords.longitude);
        fetchOneCallWeather(position.coords.latitude, position.coords.longitude);
    }

    /* let value = true;
    <FormControl component="fieldset">
        <FormLabel component="legend">Time</FormLabel>
        <RadioGroup name="time" value={value} onChange={setIsHourly(value)}>
            <FormControlLabel value={true} control={<Radio />} label="Hourly" />
            <FormControlLabel value={false} control={<Radio />} label="Daily" />
        </RadioGroup>
    </FormControl>*/

    const changeTestBool = (type) => {
        if(type === "hour"){
            setTestBool(true);
            console.log("Hour: " + testBool);
        } else if(type === "day"){
            setTestBool(false);
            console.log("Day: " + testBool);
        }
    }

    //Just use <p> tag to move things to different lines
    if (weather === null) {
        return (
            <div
                style={{ textAlign: "center" }}
                className="row"
            >
                <div className="col-sm-6">
                    <h1>How's the weather?</h1>
                    <Input type="number" value={zipCode} onChange={(event) => {
                        setZipCode(event.target.value);
                    }} />
                    <Button
                        variant="contained"
                        onClick={fetchWeather}
                    >Zip Code</Button>
                    <p><Button
                        variant="contained"
                        onClick={getUserLocation}
                    >User Location</Button></p>

                    <p><Button
                        variant="contained"
                        color={testBool ? "primary" : "default"}
                        onClick={() => {
                            //setTestBool(true);
                            changeTestBool("hour");
                            
                            document.getElementById("test").innerHTML = testBool;
                        }}
                    >Hourly</Button>
                    <Button
                        variant="contained"
                        color={testBool ? "default" : "primary"}
                        onClick={() => {
                            //setTestBool(false);
                            changeTestBool("day");
                            
                            document.getElementById("test").innerHTML = testBool;
                        }}
                    >Daily</Button></p>
                    <p id="test">true</p>
                </div>
            </div>
        );
    } else if(isZipCode){
        setWeather(null);
        fetchOneCallWeather(weather.coord.lat, weather.coord.lon);
    }

    console.log(weather);
    //console.log(weather.coord.lat + " " + weather.coord.lon)

    return (
        <div style={{ textAlign: "center" }}>
            <WeatherDisplay weather={weather}></WeatherDisplay>        
        </div>
    );
    
    //<pre>{JSON.stringify(weather,undefined,4)}</pre>
}
