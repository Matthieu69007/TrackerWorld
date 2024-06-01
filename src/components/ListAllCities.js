
import React, { useState, useEffect } from "react"
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { urlConsigneParcours } from "./URLSConsts";


export default function ListAllCities() {
    const [citiesData, setCitiesData] = useState(null);
    useEffect(() => {
        fetch(urlConsigneParcours).then(x => x.json()).then(x => {
            let data = {
                "Places": [
                ]
            }
            for (let i = 1; i < x.values.length; i++) {
                let city = x.values[i][1].startsWith("https://")?x.values[i][1]: '../img/Etapes/'+ x.values[i][1] +'.jpg'
                console.log(x.values[i][1],city.startsWith("https://"))
                let country = x.values[i][2]
                let place = x.values[i][3]
                let city_accent = x.values[i][6]
                let URLCredit = x.values[i][7]
                // ajout des étiquettes
                data.Places.push({
                    "city": city,
                    "country": country,
                    "place": place,
                    "srcImg": city,
                    "etape" : i,
                    "city_accent": city_accent,
                    "URLCredit": URLCredit
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
    let images = null

    if (citiesData?.Places)
    {
        images=<ImageList cols={cols} sx={{ width: '100%', height: '40vh' }} >
        
            {citiesData?.Places?.map((item) => (
            <ImageListItem key={item.srcImg+Math.random()}>
                <img
                    src={`${item.srcImg}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.srcImg}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.city}
                    loading="lazy"
                    onClick={() => window.open(item.URLCredit, "URLCredit")}
                />
                <ImageListItemBar
                    title={item.place}
                    subtitle={<span>{item.city_accent},{item.country}</span>}
                    position="below"
                />
            </ImageListItem>
            ))}
            </ImageList>
    
    }


    return (
      <Container maxWidth="lg" >
        {images}
      </Container>
    );
}