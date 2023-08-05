
import React, { useState, useEffect } from "react"
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const urlConsigneParcours = "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/ConsigneParcours!A:H/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68"

export default function ListAllCities() {
    const [citiesData, setCitiesData] = useState(null);
    useEffect(() => {
        fetch(urlConsigneParcours).then(x => x.json()).then(x => {
            let data = {
                "Places": [
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
                    "srcImg":'../img/Etapes/'+ city +'.jpg',
                    "etape" : i
                })
            }
            setCitiesData(data)
        })
    }, []);
    const theme = useTheme();
    const matches = {
        xs: useMediaQuery(theme.breakpoints.only('xs')),
        sm: useMediaQuery(theme.breakpoints.only('sm')),
        md: useMediaQuery(theme.breakpoints.only('md')),
        lg: useMediaQuery(theme.breakpoints.only('lg')),
        xl: useMediaQuery(theme.breakpoints.only('xl')),
    };

    let cols;
    if (matches.xs) {
        cols = 1;
    } else if (matches.sm) {
        cols = 2;
    } else if (matches.md) {
        cols = 3;
    } else if (matches.lg) {
        cols = 4;
    } else {
        cols = 5;
    }

    return (
      <Container maxWidth="lg">
        <br/>
        <Typography variant="body2" color="text.secondary"></Typography>
        <ImageList cols={cols} sx={{ width: '100%', height: 'auto' }}>
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
      </Container>
    );
}