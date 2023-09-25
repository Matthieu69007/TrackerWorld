import React, { useEffect, useState, useRef } from "react";
import  { urlNextcity } from "./NextCity";


import { Card, CardContent, CardHeader, CardMedia, Stack, Typography } from "@mui/material";
import CityLamas from '@site/static/img/Mascotte/CityIcon.png'
import TraceLama1 from '@site/static/img/Mascotte/Lama on a bike.png'
import TraceLama2 from '@site/static/img/Mascotte/LamaTeteDetourée.png'
import BrowserOnly from "@docusaurus/BrowserOnly";
import Translate from "@docusaurus/Translate";

const urlConsigneParcours =
  "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/ConsigneParcours!A:I/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68";
const urlTraceReelle =
  "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/TraceReelle!B7:C100004/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68";

const TracelineColor = { "color":"#5100C2","weight":2, "smooth":1};
const PreviouslineColor = { "color":"#D5720E","weight":1, "smooth":1};
const NextlineColor = {"xolor":"#572C3A","weight":2};

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

function GetPolylines(Options, Sets)
{
  const Polyline = require('react-leaflet').Polyline
  
  return Sets.map((value)=>{
    return <Polyline key={"Polyline_"+Math.random()} pathOptions={Options}  positions={value}/>
  })
}

function GetCityPopup(City)
{
  const Popup = require('react-leaflet').Popup
  
  return <Popup>
            <Card >
              <CardHeader title={City.MainPoint}/>
              <CardContent>
                <img class="PopupImage" src={'../img/Etapes/'+City.ImageName+'.jpg'} alt={City.MainPoint} />
              </CardContent>
              <CardMedia alignItems='center'>
                <Stack direction="column" spacing={2} alignItems={"center"}>
                  <Typography variant="body2">{City.Name}</Typography>
                </Stack>
              </CardMedia>
            </Card>
            
        </Popup> 
}

function GetCityMarkers(CityList, ZoomLevel, currentCity)
{
  const Marker = require('react-leaflet').Marker
  
  
  let icon = L.icon({
    iconSize: [32,32],
    iconAnchor: [16,32],
    popupAnchor: [0, -16],
    iconRetinaUrl: CityLamas,
    iconUrl: CityLamas,
    shadowUrl: null
})
  console.log(ZoomLevel)
  if (CityList && ZoomLevel >2)
  {
    return CityList.map((value)=>{
      
      return <Marker position={value.Position} icon={icon} >
              {GetCityPopup(value)}
            </Marker>
    })
  }
  else if (CityList)
  {
    
    let value= CityList[currentCity]
    if (value)
    {
      return <Marker position={value.Position} icon={icon} >
              {GetCityPopup(value)}
            </Marker>
    }
  }
  return null
  
}

function GetTraceMarker(Position)
{
  const Marker = require('react-leaflet').Marker
  const Icons=[TraceLama1,TraceLama2]
  const I = Icons[Math.round(2*Math.random())%2]

  let icon = L.icon({
    iconSize: [32,32],
    iconAnchor: [16,32],
    popupAnchor: [0, -16],
    iconRetinaUrl: I,
    iconUrl: I,
    shadowUrl: null
  })

  return <Marker position={Position} icon={icon} >
          
        </Marker>
}


export default function ViewerComponent ()
{
  const LoadingText=<Translate description="Loading...">Loading...</Translate>
  return <BrowserOnly fallback={<div>{LoadingText}</div>}>
          {() => {
            return <Viewercomponentcode />
            }
          }
          </BrowserOnly>
}

function Viewercomponentcode() {
  const [StartPos, setStartPos] =
    useState([4.820163386, 45.75749697]);
  const [nextCityId, setNextCityId] = useState(0);
  const viewerRef = useRef(null);
  
  const [CityList,SetCityList]=useState(null)
  const [Tracks, setTracks] =useState(null);
  const [ActualTrack, SetActualTrack] =useState(null);
  const [CityMarkers,SetCityMarkers] = useState(null)
  const [TraceMarker,SetTraceMarker] = useState(null)
  const [MapZoom, SetMapZoom] = useState(2)

  useEffect(async () => {
    await fetch(urlNextcity)
      .then((x) => x.json())
      .then((x) => {
        const cityId = (x?.values && parseFloat(x.values[1][3])) || 1;
        setNextCityId(cityId - 1);
      });

    fetch(urlConsigneParcours)
      .then((x) => x.json())
      .then((x) => {
        let previousData =[] 
        let previousDataSet =[] 
        let nextData = []
        let nextDataSet = []
        let PrevCoords = null;
        let Cities=[]

        for (let i = 1; i < x.values.length; i++) {
          let coordinates = [
            parseFloat(x.values[i][4]),
            parseFloat(x.values[i][5]),
          ];

          Cities.push({"Name":x.values[i][6],"Position":coordinates, "MainPoint":x.values[i][3], "ImageName":x.values[i][1]})
          const cityId = parseFloat(x.values[i][0]-1);
          if (cityId <= nextCityId) {
            if (AddPoint(previousData,PrevCoords,coordinates))
            {
              previousDataSet.push(previousData)
              previousData = new Array(coordinates)
            }
          }
          if (cityId >= nextCityId) {
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
        SetCityMarkers(<>{GetCityMarkers(Cities, MapZoom,nextCityId)}</>)
        SetCityList(Cities)
      });

    fetch(urlTraceReelle)
      .then((x) => x.json())
      .then((x) => {
        let TraceData = []
        let TraceDataSet=[]
        let PrevCoords=null
        let coordinates=null
        for (let i = 1; i < x.values.length; i++) {
          coordinates = [
            parseFloat(x.values[i][0]),
            parseFloat(x.values[i][1]),
          ];

          
          if (AddPoint(TraceData,PrevCoords,coordinates))
          {
            TraceDataSet.push(previousData)
            TraceData = new Array(coordinates)
          }
          PrevCoords= coordinates
          if (TraceData.length>1)
        {
          TraceDataSet.push(TraceData)
        }
          
        }
        SetActualTrack(<>{GetPolylines(TracelineColor,TraceDataSet)}</>)
        SetTraceMarker(<>{GetTraceMarker(coordinates)}</>)
      });
  }, [nextCityId]);

  const enterFullscreen = () => {
    if (viewerRef.current) {
      const element = viewerRef.current.cesiumElement?.canvas;
      if (element) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }
    }
  };

  function MapEventhandler(Props)
  {
    const map=useMapEvent(
      {
        zoom(ev) {
          if (ev.type=="zoom")
          {
            Props.ZoomEventHandler(ev.sourceTarget.getZoom())
          }
        }
        
      }
    )

    return <></>
  }

  function HandleZoomChange(z)
  {
    SetMapZoom(z)
    SetCityMarkers(GetCityMarkers(CityList,z, nextCityId))
  }
  
  const MapContainer = require('react-leaflet').MapContainer
  const TileLayer = require('react-leaflet').TileLayer
  const useMapEvent = require('react-leaflet').useMapEvent
  const FS = require('leaflet-fullscreen')

  const EnterFullScreenText=<Translate description="Visualiser en plein écran">Visualiser en plein écran</Translate>
  const ExitFullScreenText=<Translate description="Quitter le modeplein écran">Quitter le mode plein écran</Translate>
  
  return (
    
    <Stack direction='column' spacing={3} alignItems="center">
      
      <MapContainer className="MapStyle"  center={[StartPos[1], StartPos[0]]} zoom={MapZoom} scrollWheelZoom={true}
        fullscreenControl={{pseudoFullscreen: false,title:{'false':'FullScreen mode','true':'Windowed mode'}}} 
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Tracks}
        {CityMarkers}
        {ActualTrack}
        {TraceMarker}
        <MapEventhandler ZoomEventHandler={HandleZoomChange} />
      </MapContainer>
      
    </Stack>
  );
}

/*
<Viewer ref={viewerRef} timeline={false} animation={false} sceneMode={SceneMode.SCENE2D} >
        <CameraFlyTo destination={Cartesian3.fromDegrees(StartPos[0], StartPos[1], 1000000)}  />
        <GeoJsonDataSource
          markerSymbol=""
          data={consigneParcoursPreviousData}
          stroke={PreviouslineColor}
          // hide markers
          markerColor={Color.TRANSPARENT}
        />
        <GeoJsonDataSource
          markerSymbol=""
          data={consigneParcoursNextData}
          stroke={NextlineColor}
          // hide markers
          markerColor={Color.TRANSPARENT}
        />
        <GeoJsonDataSource
          markerSymbol=""
          data={traceReelleData}
          stroke={Color.BLUE} // Vous pouvez utiliser n'importe quelle couleur de votre choix pour la ligne de la trace réelle.
          // hide markers
          markerColor={Color.TRANSPARENT}
        />


        {/* Loop through consigneParcoursData and create point entities * /}
        {[
          ...(consigneParcoursPreviousData?.features || []),
          ...(consigneParcoursNextData?.features || []),
        ].map((feature) => {
          if (feature.geometry.type === "Point") {
            const [longitude, latitude] = feature.geometry.coordinates;
            const city = feature.properties.city;
            const name = feature.properties.name;
            return (
              <Entity key={"Feature" + Math.random()}
                description={name}
                name={city}
                point={{ pixelSize: 8 }}
                label={{
                  text: city,
                  font: "14pt",
                  pixelOffset: new Cartesian2(0, -20),
                }}
                // remove the on click handler
                onClick={() => { }}
                position={Cartesian3.fromDegrees(longitude, latitude, 100)}
              />
            );
          }
        })}

      </Viewer>
    */