  import React from 'react';
  import "./InfoBox.css";
  import { Card , CardContent , Typography } from  '@mui/material';

function InfoBox({ title , cases , active , isBlue , isGreen , total , ...props } ) {
    return (
        <Card
        onClick={props.onClick}
        className={`infoBox ${active && "infoBox--selected"} ${ isBlue && "infoBox--blue" } ${ isGreen && "infoBox--green" }`}
      >
    
            <CardContent>
                <Typography color="textSecondary">
                    {title}
                </Typography>
                <h2 className={`infoBox_cases ${!isBlue && isGreen && "infoBox_cases--green"} ${!isBlue && !isGreen && "infoBox_cases--red"} `}>{cases}</h2>
                <Typography className="infoBox_total" color="textSecondary">{total} Total
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox
