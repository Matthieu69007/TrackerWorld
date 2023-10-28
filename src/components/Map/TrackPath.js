import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useMap, useMapEvent } from "react-leaflet"
import { urlNextcity } from "../NextCity";
import { urlConsigneParcours,urlAdditionalMarkers,urlTraceReelle } from "../URLSConsts";
import { GetOrthoDist, RoundPow } from "../MathCalcs";

import CityLamas from '@site/static/img/Mascotte/CityIcon.png'
import SelfieLamas from '@site/static/img/Mascotte/LamaSelfie.png'
import TraceLama2 from '@site/static/img/Mascotte/LamaTeteDetourée.png'
import { Card, CardContent, CardHeader, Grid, Stack, Typography } from "@mui/material";
import Translate from "@docusaurus/Translate";
import DialogPicture from "./DialogPicture";

  
const TracelineColor = { "color":"#DB2596","weight":3, "smooth":1};
const PreviouslineColor = { "color":"#1D00E0","weight":3, "smooth":1};
const NextlineColor = {"color":"#1D00E0","weight":3};

const IconWidth = 32  
const IconHeight = 32

function AddPoint(CoordsArray,PrevPos, NextPos)
{
  let SplitCoords=null;
  if (PrevPos)
  {
    let CurX = PrevPos[1]
    let NextX = NextPos[1]

    if (NextX * CurX<0 && Math.abs(NextX-CurX)>=180)
    {
      if (NextX > 0)
      {

        SplitCoords=[PrevPos[0],NextX-360]
      }
      else
      {
        SplitCoords=[PrevPos[0],NextX+360]
      }
      CoordsArray.push(SplitCoords)      
      return SplitCoords
    }

  }
  CoordsArray.push(NextPos)
  return SplitCoords
}

function ArrayCountUpdate(ArrayList, x, Col) 
{
  if (!ArrayList || !x || !x[Col])
  {
    return
  }
  
  if (ArrayList[x[Col]]) {
    ArrayList[x[Col]]++;
  }

  else 
  {
     ArrayList[x[Col]] = 1;
  }
}

function GetCityMarkers(CityList, ZoomLevel, currentCity, OnClickHandler)
{
  const Marker = require('react-leaflet').Marker
  
  if (!CityList)
  {
    return null
  }
  
  let icon = L.icon({
    iconSize: [IconWidth,IconHeight],
    iconAnchor: [IconHeight/2,IconHeight],
    popupAnchor: [0, -IconWidth/2],
    iconRetinaUrl: CityLamas,
    iconUrl: CityLamas,
    shadowUrl: null
    })
  
  if (CityList && ZoomLevel >4)
  {
    return CityList.map((value)=>{
      
      return <Marker key={"CityMarker_"+currentCity} position={value.Position} icon={icon} >
              {GetCityPopup(value, OnClickHandler)}
            </Marker>
    })
  }
  else if (CityList)
  {
    
    let value= CityList[currentCity]
    if (value)
    {
      return <Marker key={"CityMarker_Next_"+currentCity} position={value.Position} icon={icon} >
              {GetCityPopup(value, OnClickHandler)}
            </Marker>
    }
  }
  return null
  
}

function GetCityPopup(City, OnClickHandler)
{
  const Popup = require('react-leaflet').Popup
  const ImgUrl = typeof City.AlternateImage!== "undefined"?'https://images.traceacrosstheworld.com/'+City.AlternateImage:'../img/Etapes/'+City.ImageName+'.jpg'
  const ImgCity =<img className="PopupImage" src={ImgUrl} alt={City.MainPoint} onClick={()=>OnClickHandler?OnClickHandler(ImgUrl):null} />;

  return <Popup>
            <Card >
              
                <CardHeader title={City.MainPoint} alignItems='center'/>
                <CardContent >
                  <Stack alignItems='center' >
                    {ImgCity}
                    {City.VisitDate?City.VisitDate:null}
                  </Stack>
                  <Stack direction="column" spacing={2} alignItems={"center"}>
                    <Typography variant="h5">{City.Name}</Typography>
                  </Stack>
                </CardContent>
              
            </Card>
            
        </Popup> 
}

function GetPolylines(Options, Sets)
{
  const Polyline = require('react-leaflet').Polyline
  
  return Sets.map((value)=>{
    return <Polyline key={"Polyline_"+Math.random()} pathOptions={Options}  positions={value}/>
  })
}

function GetSelfiePopup(Selfie, OnClickHandler)
{
  const Popup = require('react-leaflet').Popup
  const ImgUrl = 'https://images.traceacrosstheworld.com/'+Selfie.Image
  const ImgSelfie =<img className="PopupImage" src={ImgUrl} alt={Selfie.Date} onClick={()=>OnClickHandler?OnClickHandler(ImgUrl):null} />;

  return <Popup>
            <Card >
              <CardContent>
                <Stack alignItems='center'>
                  {ImgSelfie}
                  {Selfie.Date?Selfie.Date:null}
                </Stack>
              </CardContent>
              
            </Card>
            
        </Popup> 
}


function GetSelfieMarkers(SelfieList, OnClickHandler)
{
  const Marker = require('react-leaflet').Marker
  
  
  let icon = L.icon({
    iconSize: [IconWidth,IconHeight],
    iconAnchor: [IconWidth/2,IconHeight],
    popupAnchor: [0, -IconHeight/2],
    iconRetinaUrl: SelfieLamas,
    iconUrl: SelfieLamas,
    shadowUrl: null
    })
  
  if (SelfieList )
  {
    let Selector = null

    return SelfieList.map((value)=>{
      
      return <Marker Key={"SelfieMarker_"+Math.random()} position={value.Position} icon={icon} >
              {GetSelfiePopup(value,OnClickHandler)}
            </Marker>
    })
  }
  return null
  
}


function GetTraceMarker(Position, PopupInformation)
{
  const Marker = require('react-leaflet').Marker
  const Popup = require('react-leaflet').Popup
  const I = TraceLama2

  let icon = L.icon({
    iconSize: [IconWidth,IconHeight],
    iconAnchor: [IconWidth/2,IconHeight],
    popupAnchor: [0, -IconHeight/2],
    iconRetinaUrl: I,
    iconUrl: I,
    shadowUrl: null
  })

  return <Marker key={"Marker"+Math.random()} position={Position} icon={icon} >
          <Popup>
             
                {/*<MDXTranslator Page='TracePopup' Infos={PopupInformation} />*/}
                <Grid container  spacing={0}>
                  <Grid item>
                    <Translate description="Porteurs(ses)" >Porteurs(ses) :</Translate>{PopupInformation.BearerCount}
                  </Grid>
                  <Grid item >
                    <Translate description="km parcourus" >km parcourus :</Translate>{PopupInformation.kmdone}
                  </Grid>
                  <Grid item >
                    <Translate description="km restant" >km restant :</Translate>{PopupInformation.RemainingKm}
                  </Grid>
                   <Grid item>
                    <Translate description="Pays visités" >Pays visités :</Translate>{PopupInformation.CountriesCount}
                  </Grid>
                  </Grid>
            
        </Popup> 
        </Marker>
}

function GetTraceSetDistance(TS)
{
  let TraceDist = 0
  let CurPos = null
  for (let i in TS)
  {
    for (let j in TS[i])
    {
      if (CurPos)
      {
        TraceDist += GetOrthoDist(CurPos[0],CurPos[1],TS[i][j][1],TS[i][j][0])
      }
      CurPos=[
          TS[i][j][1],
          TS[i][j][0]
        ]
    }
  }

  return TraceDist
}

function HandleMapContainerResize(ev,SetFullScreen)
{
  SetFullScreen(ev.newSize.x==screen.width)
  console.log("Resising",ev.newSize.x==screen.width)
}



export default function TracePath(Props)
{
  const Map = useMap();
  const [Tracks,setTracks]=useState(null)
  const [CityMarkers, SetCityMarkers]=useState(null)
  const [CityList,SetCityList]=useState(null)
  const [ActualTrack, SetActualTrack] =useState(null);
  const [TraceMarker,SetTraceMarker] = useState(null)
  const [AdditionalMarkers,SetAdditionalMarkers] = useState(null)
  const [NextCityId,SetNextCityId]=useState(1)
  const MapZoom=Map.getZoom()
  const [MapIsFullScreen,SetMapIsFullScreen]=useState(false)
  const [ModalImageURL,SetModalImageURL]=useState(Props.ModalImageURL)
  const MapResizeEvents = useMapEvent("resize",(ev)=>{HandleMapContainerResize(ev,SetMapIsFullScreen)})

  function HandleImageClick(URL)
  {
    
    console.log("Image clicked" ,URL, Map.getSize(),Props)
    const FullScreen = Map.getSize().x==screen.width
    if (FullScreen)
    {
      SetModalImageURL(URL)
    }
    else
    {
      Props.ShowDialogCallback(URL)
    }
  }

  useEffect(async () => {
    let previousData =[] 
    let previousDataSet =[] 
    let nextData = []
    let nextDataSet = []
    
        
    await fetch(urlNextcity)
      .then((x) => x.json())
      .then((x) => {
        SetNextCityId((x?.values && parseFloat(x.values[1][3])) || 1);
        
      });

    await fetch(urlConsigneParcours)
      .then((x) => x.json())
      .then((x) => {
        let PrevCoords = null;
        let Cities=[]

        for (let i = 1; i < x.values.length; i++) {
          let coordinates = [
            parseFloat(x.values[i][4]),
            parseFloat(x.values[i][5]),
          ];

          Cities.push({"Name":x.values[i][6],
                        "Position":coordinates, 
                        "MainPoint":x.values[i][3], 
                        "ImageName":x.values[i][1],
                        "AlternateImage":x.values[i][8], 
                        "VisitDate":x.values[i][7], 
                        
                      })
          const cityId = parseFloat(x.values[i][0]-1);
          if (cityId >= (NextCityId-1) && cityId <= NextCityId) {
            if (AddPoint(previousData,PrevCoords,coordinates))
            {
              previousDataSet.push(previousData)
              previousData = new Array(coordinates)
            }
          }
          if (cityId >= NextCityId) {
            if (AddPoint(nextData,PrevCoords,coordinates))
            {
              nextDataSet.push(nextData)
              nextData = new Array(coordinates)
            }
          }
          PrevCoords= coordinates
          
        }
        if (previousData.length>1)
        { 
          previousDataSet.push(previousData)
        }
        if (nextData.length>1)
        {
          nextDataSet.push(nextData)
        }
        setTracks(
          <>
            {GetPolylines(PreviouslineColor,previousDataSet)}
            {GetPolylines(NextlineColor,nextDataSet)}
            
          </>
        )
        //setTracksPoints([previousDataSet,nextDataSet])
        SetCityMarkers(<>{GetCityMarkers(Cities, MapZoom,NextCityId,HandleImageClick)}</>)
        SetCityList(Cities)
        //console.log("Setting Tracks")
      });

    await fetch(urlTraceReelle)
      .then((x) => x.json())
      .then((x) => {
        let TraceData = []
        let TraceDataSet=[]
        let PrevCoords=null
        let coordinates=null
        let Countries=[]
        let Bearers=[]
        let bounds=[[45.75749697,4.820163386],[45.75749697,4.820163386]]

        for (let i = 1; i < x.values.length; i++) 
        {
          coordinates = [
            parseFloat(x.values[i][0]),
            parseFloat(x.values[i][1]),
          ];

          bounds[0][0]=Math.min(bounds[0][0],coordinates[0])
          bounds[1][0]=Math.max(bounds[1][0],coordinates[0])
          bounds[0][1]=Math.min(bounds[0][1],coordinates[1])
          bounds[1][1]=Math.max(bounds[1][1],coordinates[1])

          ArrayCountUpdate(Countries, x.values[i],4);
          ArrayCountUpdate(Bearers, x.values[i],5);

          
          if (AddPoint(TraceData,PrevCoords,coordinates))
          {
            TraceDataSet.push(TraceData)
            TraceData = new Array(coordinates)
          }
          PrevCoords= coordinates
          
        }
        if (TraceData.length>1)
        {
          TraceDataSet.push(TraceData)
        }
        SetActualTrack(<>{GetPolylines(TracelineColor,TraceDataSet)}</>)
        
        let dX = bounds[1][1]-bounds[0][1]
        let dY = bounds[1][0]-bounds[0][0]
        let zX = Math.log(360/dX)/Math.log(2)
        let zY = Math.log(180/dY)/Math.log(2)
        console.log(dX,dY,zX,zY)
        Map.setZoom(Math.round(Math.min(zX,zY)))

        if (previousDataSet[0])
        {
          previousDataSet[0][0]=coordinates
          setTracks(
            <>
              {GetPolylines(PreviouslineColor,previousDataSet)}
              {GetPolylines(NextlineColor,nextDataSet)}
              
            </>
          )
        }
        let TraceDist=GetTraceSetDistance(TraceDataSet)
        let NextDist=GetTraceSetDistance(nextDataSet)
        let PopupInfo = 
        {
          kmdone : RoundPow (TraceDist,1),
          RemainingKm : RoundPow (NextDist,1),
          CountriesCount : Object.keys(Countries).length,
          BearerCount : Object.keys( Bearers)?.length
        }
        SetTraceMarker(<>{GetTraceMarker(coordinates, PopupInfo)}</>)
        Map.panTo(coordinates)        
      }
    );

    await fetch(urlAdditionalMarkers)
        .then((x)=> x.json())
        .then((x) => 
          {
            let Markers=[]
            for (let i = 1; i < x.values.length; i++) 
            {
              let coordinates = [
                parseFloat(x.values[i][2].replace(',','.')),
                parseFloat(x.values[i][3].replace(',','.')),
              ];

              let Marker= {Position:coordinates,
                      Date : x.values[i][1],
                      Image : x.values[i][4],
                    }
              Markers.push(Marker)
            }

            SetAdditionalMarkers( GetSelfieMarkers(Markers,HandleImageClick))
          })


  }, [NextCityId]);

  if (TraceMarker)
  {
    return <>
      {TraceMarker}
      {Tracks}
      {CityMarkers}
      {ActualTrack}
      {AdditionalMarkers}
      <DialogPicture FullScreenMode={MapIsFullScreen} URL={ModalImageURL} ShowDialogCallback={Props.ShowDialogCallback}/>
    </>       

  }
  else
  {
    return null
  }
}