import React, { useState, useEffect } from "react"
import Typography from '@mui/material/Typography';
import { Carousel } from "react-responsive-carousel";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const urlConsigneParcours = "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/ConsigneParcours!A:H/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68"


export default function ListAllCities() {
    const [citiesData, setCitiesData] = useState(null);

    useEffect(() => {
        fetch(urlConsigneParcours).then(x => x.json()).then(x => {
            let data = {
                "Places": [
                    {
                        "city": "city",
                        "country": "country",
                        "place": "place",
                        "img": "img",
                        "srcImg":"srcImg"
                    }
                ]
            }
            for (let i = 1; i < x.values.length; i++) {
                let city = x.values[i][1]
                let country = x.values[i][2]
                let place = x.values[i][3]
                // ajout des étiquettes
                data.Places.push({
                    "city": city,
                    "country": country,
                    "place": place,
                    "srcImg":'\\img\\Etapes\\'+ city +'.jpg'
                })
            }
            setCitiesData(data)
        })
    }, []);

    return <>
        <Typography variant="body2" color="text.secondary">France, Tour Eiffel jojhn </Typography>
        <ImageList sx={{ width: 700, height: 900 }}>
      {citiesData?.Places?.map((item) => (
        <ImageListItem key={item.srcImg}>
          <img
            src={`${item.srcImg}?w=248&fit=crop&auto=format`}
            srcSet={`${item.srcImg}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.city}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.place}
            subtitle={<span>{item.city},{item.country}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </>
}