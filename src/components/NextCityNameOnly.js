import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import React, { useState, useEffect } from "react"
import Translate from '@docusaurus/Translate';

export const urlNextcity = "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/TraceReelle!B:G/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68"


export default function NextCityNameOnly() {
    const [nextCityData, setNextCityData] = useState(null);

    useEffect(() => {
        fetch(urlNextcity).then(x => x.json()).then(x => {
            let data = {
                "city": "john",
                "country" : "country",
                "place" : "Place"
            }
            data.city=x.values[1][0]
            data.country=x.values[1][1]
            data.place=x.values[1][2]
            data.city_accent=x.values[1][5]

            setNextCityData(data)
        })
    }, []);
    
    if (nextCityData)
    {
        return (
            <Typography gutterBottom variant="body1" >
              <Translate desc='Prochaine étape :'>Prochaine étape :</Translate> {' '}
              <strong>{nextCityData?.city_accent}, {nextCityData?.country}</strong>
            </Typography>
          )
    }
    else
    {
        return null
    }
  }