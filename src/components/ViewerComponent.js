import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import  { urlNextcity } from "./NextCity";


import { Card, CardContent, CardHeader, CardMedia, Stack, Typography } from "@mui/material";
import CityLamas from '@site/static/img/Mascotte/CityIcon.png'
import TraceLama1 from '@site/static/img/Mascotte/Lama on a bike.png'
import TraceLama2 from '@site/static/img/Mascotte/LamaTeteDetourée.png'
import BrowserOnly from "@docusaurus/BrowserOnly";
import Translate from "@docusaurus/Translate";
import { GetOrthoDist, RoundPow } from "./MathCalcs";

const urlConsigneParcours =
  "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/ConsigneParcours!A:I/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68";
const urlTraceReelle =
  "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/TraceReelle!B7:C100004/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68";

const TracelineColor = { "color":"#FF7B84","weight":2, "smooth":1};
const PreviouslineColor = { "color":"#7895D7","weight":2, "smooth":1};
const NextlineColor = {"color":"#00904E","weight":2};
const Colors=[PreviouslineColor,NextlineColor];

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
  const ImgUrl = typeof City.AlternateImage!== "undefined"?'https://images.traceacrosstheworld.com/'+City.AlternateImage:'../img/Etapes/'+City.ImageName+'.jpg'
  const ImgCity =<img class="PopupImage" src={ImgUrl} alt={City.MainPoint} />;

  
  return <Popup>
            <Card >
              <CardHeader title={City.MainPoint}/>
              <CardContent>
                <Stack alignItems='center'>
                {ImgCity}
                {City.VisitDate?City.VisitDate:null}
                </Stack>
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
  if (CityList && ZoomLevel >4)
  {
    return CityList.map((value)=>{
      
      return <Marker Key={"CityMarker_"+currentCity} position={value.Position} icon={icon} >
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

  return <Marker key={"Marker"+Math.random()} position={Position} icon={icon} >
          
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
  const [TracksPoints, setTracksPoints] =useState(null);
  const [ActualTrack, SetActualTrack] =useState(null);
  const [CityMarkers,SetCityMarkers] = useState(null)
  const [TraceMarker,SetTraceMarker] = useState(null)
  const [MapZoom, SetMapZoom] = useState(2)

  useEffect(async () => {
    let previousData =[] 
    let previousDataSet =[] 
    let nextData = []
    let nextDataSet = []
    
        
    await fetch(urlNextcity)
      .then((x) => x.json())
      .then((x) => {
        const cityId = (x?.values && parseFloat(x.values[1][3])) || 1;
        setNextCityId(cityId - 1);
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
          if (cityId >= (nextCityId-1) && cityId <= nextCityId) {
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
        setTracksPoints([previousDataSet,nextDataSet])
        SetCityMarkers(<>{GetCityMarkers(Cities, MapZoom,nextCityId)}</>)
        SetCityList(Cities)
        console.log("Setting Tracks")
      });

    await fetch(urlTraceReelle)
      .then((x) => x.json())
      .then((x) => {
        let TraceData = []
        let TraceDataSet=[]
        let PrevCoords=null
        let coordinates=null
        for (let i = 1; i < x.values.length; i++) 
        {
          coordinates = [
            parseFloat(x.values[i][0]),
            parseFloat(x.values[i][1]),
          ];

          
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
        SetTraceMarker(<>{GetTraceMarker(coordinates)}</>)
        console.log("Hijacking tracks")
        console.log(previousDataSet)

        /*if (TracksPoints)
        {let TracksPointsArray=TracksPoints
        
        setTracks(<>
                    {
                      TracksPointsArray.map((value,index)=>{return GetPolylines(Colors[index],value)})
                    }
                  </>)}*/
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
        console.log("Trace Distance "+ RoundPow (TraceDist,2) + "km")
        let NextDist=GetTraceSetDistance(nextDataSet)
        console.log("Remaining Distance "+ RoundPow (NextDist,2) + "km")
        
      }
    );


  }, [nextCityId]);

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

  // Classes used by Leaflet to position controls
  const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
  }

  const BOUNDS_STYLE = { weight: 1 }

  function MinimapBounds({ parentMap, zoom }) 
  {
    const useMap = require('react-leaflet').useMap
    const useEventHandlers = require('react-leaflet').useMapEvents
    const Rectangle = require('react-leaflet').Rectangle
    const minimap = useMap()

    // Clicking a point on the minimap sets the parent's map center
    const onClick = useCallback(
      (e) => {
        parentMap.setView(e.latlng, parentMap.getZoom())
      },
      [parentMap],
    )
    useMapEvent('click', onClick)

    // Keep track of bounds in state to trigger renders
    const [bounds, setBounds] = useState(parentMap.getBounds())
    const onChange = useCallback(() => {
      setBounds(parentMap.getBounds())
      // Update the minimap's view to match the parent map's center and zoom
      minimap.setView(parentMap.getCenter(), zoom - 5)
    }, [minimap, parentMap, zoom])

    // Listen to events on the parent map
    const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
    useEventHandlers({ instance: parentMap }, handlers)

    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
  }

  function MinimapControl({ position, zoom }) 
  {
    const useMap = require('react-leaflet').useMap
    const parentMap = useMap()
    const mapZoom = zoom || 0

    // Memoize the minimap so it's not affected by position changes
    const minimap = useMemo(
      () => (
        <MapContainer
          style={{ height: 80, width: 120 }}
          center={parentMap.getCenter()}
          zoom={mapZoom-5}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
        </MapContainer>
      ),
      [],
    )

    const positionClass =
      (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
    return (
      <div className={positionClass}>
        <div className="leaflet-control leaflet-bar">{minimap}</div>
      </div>
    )
  }

  const EnterFullScreenText=<Translate description="Visualiser en plein écran">Visualiser en plein écran</Translate>
  const ExitFullScreenText=<Translate description="Quitter le modeplein écran">Quitter le mode plein écran</Translate>
  
  return (
    
    <Stack direction='column' spacing={3} alignItems="center">
      
      <MapContainer className="MapStyle"  center={[StartPos[1], StartPos[0]]} zoom={MapZoom} scrollWheelZoom={true}
        fullscreenControl={{pseudoFullscreen: false,title:{'false':'FullScreen mode','true':'Windowed mode'}}} 
        minimap={true}
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
        <MinimapControl position="topright" />
      </MapContainer>
      
    </Stack>
  );
}
