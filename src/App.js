import "./App.css";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import InfoBox from "./InfoBox";
import Map from "./Map";
import { sortData, prettyPrintStat } from "./sorting";
import Table from "./Table";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import numeral from 'numeral';
import Particles from "react-tsparticles";
import particlesOptions from "./particles.json";
import { v1 as uuid } from 'uuid';

function App(props) {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        if (typeof data.countryInfo !== "undefined") {
          const {
            countryInfo: { lat, long },
          } = data;
          setMapCenter({ lat, lng: long });

          setMapZoom(4);
        } else {
          setMapCenter({ lat: 34.80746, lng: -40.4796 });
          setMapZoom(3);
        }
      });
  };

  return (
    <>
     <Particles id="particles-js" options={particlesOptions} />
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1 className="Headerp">COVID-19 TRACKER</h1>
          
          <FormControl key={uuid()} className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem className="worldtest" value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem  key={uuid()} className="app_dropdownItem" value={country.value}>{country.name}</MenuItem>
                
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox
           active={casesType === "cases"}
           isBlue
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0,0")}
          />
          <InfoBox
          isGreen
          active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0,0")}
          />
          <InfoBox
          active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0,0")}
          />
        </div><br/>
       
        <Map 
        casesType={casesType}
        countries={mapCountries} 
        center={mapCenter} 
        zoom={mapZoom} />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3 className="app_Tabletitle">Live Cases by Country </h3>
          <Table countries={tableData} />
          <h3 className="app_graphTitle">Worldwide new {casesType}</h3>
          <LineGraph  className="app_graph" casesType ={casesType} />
        </CardContent>
      </Card>
     
    </div>
    </>
    
  );
}

export default App;
