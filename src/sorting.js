import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';


const casesTypeColors = {
  cases: {
    multiplier: 800,
    option: { color: '#4351ba', fillColor: '#4351ba' },
  },
  recovered: {
    multiplier: 1200,
    option: { color: '#7dd71d', fillColor: '#7dd71d' },
  },
  deaths: {
    multiplier: 2000,
    option: { color: '#ff0000', fillColor: '#ff0000' },
  },
};

export const sortData = (data) => {
    const sortedData = [...data];


    // if else method =>

    // sortedData.sort((a,b) => {
    //     if(a.cases > b.cases){
    //         return -1;
    //     }else{
    //         return 1;
    //     }
    // });
    // return sortedData


    // oprators method =>

    return sortedData.sort((a,b)=>(a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const prettyPrintStat2 = (stat) =>
  stat ? `${numeral(stat).format("0.0 a")}` : "0";

export const showDataOnMap = (data, casesType = 'cases') =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={casesTypeColors[casesType].option}
    fillOpacity={0.4}
      radius={
        Math.cbrt(country[casesType]) *4*(casesTypeColors[casesType].multiplier)
      }
    >
    <Popup>
    <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
    </Popup>
    </Circle>
  ));

