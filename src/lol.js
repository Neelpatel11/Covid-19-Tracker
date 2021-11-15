
const casesTypeColors = {
    cases: {
      multiplier: 250,
      option: { color: '#cc1034', fillColor: '#cc1034' },
    },
    recovered: {
      multiplier: 300,
      option: { color: '#7dd71d', fillColor: '#7dd71d' },
    },
    deaths: {
      multiplier: 2000,
      option: { color: '#ff6c47', fillColor: '#ff6c47' },
    },
  };
  
  export const sortData = (data) => {
    const sortedData = [...data];
  
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  };
  

  export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
  
  export const showDataOnMap = (data, casesType = 'cases') =>
    data.map((country) => (
      <Circle
        key={uuid()}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        pathOptions={casesTypeColors[casesType].option}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
          <div className="info-box">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            />
            <div className="info-country">{country.country}</div>
            <div className="info-cases">
              Cases: {numeral(country.cases).format('0,0')}
            </div>
            <div className="info-recovered">
              Recovered: {numeral(country.recovered).format('0,0')}
            </div>
            <div className="info-deaths">
              Deaths: {numeral(country.deaths).format('0,0')}
            </div>
          </div>
        </Popup>
      </Circle>
    ));
  
  export const statPrettier = (stat) =>
    stat ? `+${numeral(stat).format('0.0a')}` : '+0';