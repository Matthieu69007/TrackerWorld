import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import React, { useState, useEffect } from "react"

export const urlNextcity = "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/TraceReelle!B:F/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68"


export default function NextCity() {
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

            setNextCityData(data)
        })
    }, []);
    
    
    return <>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                image={'\\img\\Etapes\\'+ nextCityData?.city +'.jpg'}
                alt={nextCityData?.city}
                sx={{
                  height: 200,
                  objectFit: 'contain',
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {nextCityData?.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {nextCityData?.country}, {nextCityData?.place}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
    </>
  }