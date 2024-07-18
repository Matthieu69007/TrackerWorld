import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import React, { useState, useEffect } from "react"

export const urlNextcity = "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/TraceReelle!B:H/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68"


export default function NextCity() {
    const [nextCityData, setNextCityData] = useState(null);
    let imagevalue=''
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
            data.url=x.values[1][6]
            
            setNextCityData(data)
        })
    }, []);
    if (nextCityData?.url && nextCityData.url.startsWith("https://"))
    {
      imagevalue=nextCityData?.url
    }
    else
    {
      imagevalue='../img/Etapes/'+ nextCityData?.url +'.jpg'
    }
    console.log(nextCityData)
    return <>
          <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                
                image={imagevalue}
                alt={nextCityData?.city_accent}
                sx={{
                  height: 200,
                  objectFit: 'contain',
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {nextCityData?.city_accent}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {nextCityData?.country}, {nextCityData?.place}
                </Typography>
              </CardContent>
          </Card>
    </>
  }