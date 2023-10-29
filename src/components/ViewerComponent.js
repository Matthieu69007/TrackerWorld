import React, { useEffect, useState,  useMemo, useCallback } from "react";

import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Modal, Stack, Typography } from "@mui/material";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Translate from "@docusaurus/Translate";
import TracePath from "./Map/TrackPath";


export default function ViewerComponent (Props)
{
  const LoadingText=<Translate description="Loading...">Loading...</Translate>
  return <BrowserOnly fallback={<div>{LoadingText}</div>}>
          {() => {
            return <Viewercomponentcode {...Props}/>
            }
          }
          </BrowserOnly>
}

function Viewercomponentcode(Props) 
{
  const [MapZoom, SetMapZoom] = useState(5)
  const [MapCenter,SetMapCenter] = useState({lng:4.820163386, lat:45.75749697})
  const [ModalImageURL,SetModalImageURL] = useState(null)
  
  const MapContainer = require('react-leaflet').MapContainer
  const TileLayer = require('react-leaflet').TileLayer
  const useMapEvent = require('react-leaflet').useMapEvent
  const FS = require('leaflet-fullscreen')
  const fsccss = require('leaflet-fullscreen/dist/leaflet.fullscreen.css')
  function FixMapCenter(map, ev)
  {
    let C = ev.sourceTarget.getCenter()
    if (C.lng > 180 || C.lng < -180)
    {
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


  function MapEventhandler(Props)
  {
    const map=useMapEvent
    (
      {
        moveend (ev)
          {
            FixMapCenter(map,ev)
          },
        zoom(ev) {
          if (ev.type=="zoom")
          {
            Props.ZoomEventHandler(ev.sourceTarget.getZoom())
            FixMapCenter(map, ev)            
          }
          else
          {
            console.log("unhanded",ev)
          }
        }
        
      }
      
    )

    return <></>
  }

  function HandleZoomChange(z)
  {
    SetMapZoom(z)
    //alert("zoom change")
    //SetCityMarkers(GetCityMarkers(CityList,z, nextCityId, SetModalImageURL))
  }
 


  
  
  // Classes used by Leaflet to position controls
  const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
  }

  const BOUNDS_STYLE = { weight: 1 }
  

  function MinimapBounds({ parentMap, zoom , center}) 
  {
    const useMap = require('react-leaflet').useMap
    const useEventHandlers = require('react-leaflet').useMapEvents
    const Rectangle = require('react-leaflet').Rectangle
    const [minimap] = useState(useMap())

    // Clicking a point on the minimap sets the parent's map center
    const onClick = useCallback(
      (e) => {
        parentMap.setView(e.latlng, parentMap.getZoom())
      },
      [parentMap],
    )
   // useMapEvent('click', onClick)
    //useMapEvent('moveend', onClick)

    // Keep track of bounds in state to trigger renders
    const [bounds, setBounds] = useState(parentMap.getBounds())
    function onChange() 
    {
      if (parentMap)
      {
        //setBounds(parentMap.getBounds())
        // Update the minimap's view to match the parent map's center and zoom
        //minimap.setView(parentMap.getCenter(), zoom - 5)
      }
      return null
    }
    const HandleChange = useEffect(()=>{onChange()}
    , [minimap, parentMap, zoom])

    // Listen to events on the parent map
    const handlers = useMemo(() => ({ movestart:HandleChange, moveend: HandleChange, zoom: HandleChange, touchmove:HandleChange }), [])
    useEventHandlers({ instance: parentMap }, handlers)

    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
  }

  function MinimapControl({ position, zoom }) 
  {
    const useMap = require('react-leaflet').useMap
    const [parentMap ]= useState( useMap())
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
          
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} center={position} />
          
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

  function ModalImage(props) 
  {

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
        {...props} style={{zIndex: 11000000}}
      >
        
        <Box sx={style}>
          <img src={props.ImageURL} width='100%'/>
        </Box>
        
      </Modal>
    );
  }

  function ShowModalCallback(ModalImageURL)
  {
    console.log("Callback to set the modal")
    SetModalImageURL(ModalImageURL)
   
  }
  
  //const EnterFullScreenText=<Translate description="Visualiser en plein écran">Visualiser en plein écran</Translate>
  //const ExitFullScreenText=<Translate description="Quitter le modeplein écran">Quitter le mode plein écran</Translate>
  console.log("Modal Image params:",ModalImageURL)
  return (<>
    <Stack key="stach" direction='column' spacing={3} alignItems="center">
      <ModalImage key="modal" open={ModalImageURL} ImageURL={ModalImageURL} onClose={() => {SetModalImageURL(null)}}/>
    
      <MapContainer id="Map" className="MapStyle"  center={MapCenter} zoom={MapZoom} scrollWheelZoom={true}
        fullscreenControl={{pseudoFullscreen: false,title:{'false':'FullScreen mode','true':'Windowed mode'}}} 
        minimap={true} style={{'zIndex':0}}         
      >
        
       <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />
        <TracePath ModalImageURL={ModalImageURL} ShowDialogCallback={ShowModalCallback}/>
        <MapEventhandler ZoomEventHandler={HandleZoomChange} MoveEventHandler={HandleZoomChange}/>
        <MinimapControl position="topright" />
        
      </MapContainer>
      
    </Stack>
  </>
    
  );
}


