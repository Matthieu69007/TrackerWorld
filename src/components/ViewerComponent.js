import React, { useEffect, useState,  useMemo, useCallback } from "react";
import  { urlNextcity } from "./NextCity";


import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Modal, Stack, Typography } from "@mui/material";
import CityLamas from '@site/static/img/Mascotte/CityIcon.png'
import SelfieLamas from '@site/static/img/Mascotte/LamaSelfie.png'
import TraceLama2 from '@site/static/img/Mascotte/LamaTeteDetourée.png'
import BrowserOnly from "@docusaurus/BrowserOnly";
import Translate from "@docusaurus/Translate";
import { GetOrthoDist, RoundPow } from "./MathCalcs";


const urlConsigneParcours =
  "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/ConsigneParcours!A:I/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68";
const urlTraceReelle =
  "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/TraceReelle!B7:G100004/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68";
const urlAdditionalMarkers =
  "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/AdditionalMarkers!A:E/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68";
  const TracelineColor = { "color":"#DB2596","weight":3, "smooth":1};
  const PreviouslineColor = { "color":"#1D00E0","weight":3, "smooth":1};
  const NextlineColor = {"color":"#1D00E0","weight":3};
    

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

function GetCityPopup(City, OnClickHandler)
{
  const Popup = require('react-leaflet').Popup
  const ImgUrl = typeof City.AlternateImage!== "undefined"?'https://images.traceacrosstheworld.com/'+City.AlternateImage:'../img/Etapes/'+City.ImageName+'.jpg'
  const ImgCity =<img class="PopupImage" src={ImgUrl} alt={City.MainPoint} onClick={()=>OnClickHandler?OnClickHandler(ImgUrl):0} />;

  console.log(OnClickHandler)
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

function GetSelfiePopup(Selfie, OnClickHandler)
{
  const Popup = require('react-leaflet').Popup
  const ImgUrl = 'https://images.traceacrosstheworld.com/'+Selfie.Image
  const ImgSelfie =<img class="PopupImage" src={ImgUrl} alt={Selfie.Date} onClick={()=>OnClickHandler?OnClickHandler(ImgUrl):0} />;

  console.log("onclickhandler :"+OnClickHandler)
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

function GetCityMarkers(CityList, ZoomLevel, currentCity, OnClickHandler)
{
  const Marker = require('react-leaflet').Marker
  
  if (!CityList)
  {
    return null
  }
  
  let icon = L.icon({
    iconSize: [32,32],
    iconAnchor: [16,32],
    popupAnchor: [0, -16],
    iconRetinaUrl: CityLamas,
    iconUrl: CityLamas,
    shadowUrl: null
    })
  
  if (CityList && ZoomLevel >4)
  {
    return CityList.map((value)=>{
      
      return <Marker Key={"CityMarker_"+currentCity} position={value.Position} icon={icon} >
              {GetCityPopup(value, OnClickHandler)}
            </Marker>
    })
  }
  else if (CityList)
  {
    
    let value= CityList[currentCity]
    if (value)
    {
      return <Marker position={value.Position} icon={icon} >
              {GetCityPopup(value, OnClickHandler)}
            </Marker>
    }
  }
  return null
  
}

function GetSelfieMarkers(SelfieList, OnClickHandler)
{
  const Marker = require('react-leaflet').Marker
  
  
  let icon = L.icon({
    iconSize: [32,32],
    iconAnchor: [16,32],
    popupAnchor: [0, -16],
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
    iconSize: [32,32],
    iconAnchor: [16,32],
    popupAnchor: [0, -16],
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
  const [StartPos] = useState([4.820163386, 45.75749697]);
  const [nextCityId, setNextCityId] = useState(0);
  
  const [CityList,SetCityList]=useState(null)
  const [Tracks, setTracks] =useState(null);
  const [ActualTrack, SetActualTrack] =useState(null);
  const [CityMarkers,SetCityMarkers] = useState(null)
  const [AdditionalMarkers,SetAdditionalMarkers] = useState(null)
  const [TraceMarker,SetTraceMarker] = useState(null)
  const [MapZoom, SetMapZoom] = useState(2)
  const [MapCenter,SetMapCenter] = useState({lat:4.820163386, lng:45.75749697})
  const [ModalImageURL,SetModalImageURL] = useState(null);

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
        //setTracksPoints([previousDataSet,nextDataSet])
        SetCityMarkers(<>{GetCityMarkers(Cities, MapZoom,nextCityId,SetModalImageURL)}</>)
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

        for (let i = 1; i < x.values.length; i++) 
        {
          coordinates = [
            parseFloat(x.values[i][0]),
            parseFloat(x.values[i][1]),
          ];

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
        //console.log("Trace Distance "+ RoundPow (TraceDist,1) + "km")
        let NextDist=GetTraceSetDistance(nextDataSet)
        //console.log("Remaining Distance "+ RoundPow (NextDist,1) + "km")
        //console.log(Object.keys( Bearers).length ,Countries.length)
        let PopupInfo = 
        {
          kmdone:RoundPow (TraceDist,1),
          RemainingKm:RoundPow (NextDist,1),
          CountriesCount:Object.keys(Countries).length,
          BearerCount:Object.keys( Bearers)?.length
        }
        SetTraceMarker(<>{GetTraceMarker(coordinates, PopupInfo)}</>)
        
        
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

            SetAdditionalMarkers( GetSelfieMarkers(Markers,SetModalImageURL))
          })


  }, [nextCityId]);

  function MapEventhandler(Props)
  {
    const map=useMapEvent(
      {
        zoom(ev) {
          if (ev.type=="zoom")
          {
            Props.ZoomEventHandler(ev.sourceTarget.getZoom())
            let C = ev.sourceTarget.getCenter()
            if (C.lng > 180 || C.lng < -180)
            {
              console.log(C)
              while (C.lng < -180)
              {
                C.lng += 360
              }
              while (C.lng > 180)
              {
                C.lng -= 360
              }
              
              map.setView(C,ev.sourceTarget.getZoom(), {animate:false});
              SetMapCenter(C)
            }
            
          }
        }
        
      }
    )

    return <></>
  }

  function HandleZoomChange(z)
  {
    SetMapZoom(z)
    SetCityMarkers(GetCityMarkers(CityList,z, nextCityId, SetModalImageURL))
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
      if (parentMap)
      {
        setBounds(parentMap.getBounds())
        // Update the minimap's view to match the parent map's center and zoom
        minimap.setView(parentMap.getCenter(), zoom - 5)
      }
    }, [minimap, parentMap, zoom])

    // Listen to events on the parent map
    const handlers = useMemo(() => ({ move: onChange, zoom: onChange, pan:onChange }), [])
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
          <TileLayer url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'/>
          
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

  function ModalImage(props) {

    const style = {
      position: 'absolute' ,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '60%',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    
    return (
      <Modal
        {...props}
      >
        
        <Box sx={style}>
          <img src={props.ImageURL} width='100%'/>
        </Box>
        
      </Modal>
    );
  }
  

  const EnterFullScreenText=<Translate description="Visualiser en plein écran">Visualiser en plein écran</Translate>
  const ExitFullScreenText=<Translate description="Quitter le modeplein écran">Quitter le mode plein écran</Translate>
  
  return (<>
    <ModalImage open={ModalImageURL!==null} ImageURL={ModalImageURL} onClose={() => {SetModalImageURL(null)}}/>
    <Stack direction='column' spacing={3} alignItems="center">
      
      <MapContainer className="MapStyle"  center={MapCenter} zoom={MapZoom} scrollWheelZoom={true}
        fullscreenControl={{pseudoFullscreen: false,title:{'false':'FullScreen mode','true':'Windowed mode'}}} 
        minimap={true} style={{'z-index':0}}
      >
       <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {TraceMarker}
        {Tracks}
        {CityMarkers}
        {ActualTrack}
        {AdditionalMarkers}
        <MapEventhandler ZoomEventHandler={HandleZoomChange} />
        <MinimapControl position="topright" />

      </MapContainer>
      
    </Stack>
    </>
  );
}


