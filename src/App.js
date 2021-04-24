import './App.css';
import React, { useState } from 'react';
import API_KEY from './keys';
import { Input, Button } from '@material-ui/core';

export default function App() {
    //const API_KEY = process.env.REACT_APP_api_key;
    const [weather, setWeather] = useState(null);
    const [zipCode, setZipCode] = useState(22904);
    //const [lat, setLat] = useState();
    //const [long, setLong] = useState();

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
        const url = new URL("https://api.openweathermap.org/data/2.5/weather");
        url.searchParams.append("appid", API_KEY);
        url.searchParams.append("zip", zipCode); //default: Charlottesville
        url.searchParams.append("units", "imperial"); //Fahrenheit
        fetch(url)
            .then((resp) => {
                return resp.json();
            })
            .then((obj) => {
                if (obj.cod === 200) { //no html errors
                    setWeather(obj);
                } else {
                    setWeather(false);
                }
            });
    }

    const fetchOneCallWeather = (position) => {
        const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
        url.searchParams.append("appid", API_KEY);
        console.log(position.coords.latitude + ", " + position.coords.longitude);
        url.searchParams.append("lat", position.coords.latitude);
        url.searchParams.append("lon", position.coords.longitude);
        url.searchParams.append("units", "imperial"); //Fahrenheit
        fetch(url)
            .then((resp) => {
                return resp.json();
            })
            .then((obj) => {
                //if (obj.cod === 200) { //no html errors
                    setWeather(obj);
                /*} else {
                    setWeather(false);
                }*/
            });

        //console.log(weather);
    }

    function getUserLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(fetchOneCallWeather);
        } else {
            console.log("Geolocation is not supported");
        }
    }

    if (weather === null) {
        return (
            <div>
                <Input type="number" value={zipCode} onChange={(event) => {
                    setZipCode(event.target.value);
                }} />
                <Button
                    variant="contained"
                    onClick={fetchWeather}
                >Zip Code</Button>
                <Button
                    variant="contained"
                    onClick={getUserLocation}
                >User Location</Button>
            </div>
        );
    }

    console.log(weather);

    return (
        <div style={{ textAlign: "center" }}>

            <pre>{JSON.stringify(weather,undefined,4)}</pre>
        </div>
    );
}
