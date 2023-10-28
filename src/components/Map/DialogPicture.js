import { Map } from '@mui/icons-material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useMap } from 'react-leaflet'

export default function DialogPicture(Props)
{
  const Dialog = require('leaflet-dialog')
  const Style =  require.resolve("leaflet-dialog/Leaflet.Dialog.css")
  const L  = require('leaflet')
  const useLeafletContext = require('@react-leaflet/core').useLeafletContext
  const context = useLeafletContext()
  const [DialogImage,SetDialogImage]=useState(null)
  const [Map]=useState(useMap())
  const MapIsFullScreen=Map.getSize().x==screen.width
  const [ShowDialogCallback]=useState(Props?.ShowDialogCallback)

  useEffect(() => {
    //const container = context.layerContainer || context.map
    const MapSize=Map.getSize()
    const X= Math.round(MapSize.x*0.7)
    const Y= Math.round(MapSize.y*0.7)
    const XOffset= Math.round(MapSize.x*0.12)
    const YOffset= Math.round(MapSize.y*0.12)
    
    let d=null
    if (!DialogImage)
    {
      if (DialogImage)
      {
        context.remove(DialogImage)
        DialogImage.destroy()
      }
      d = L.control.dialog({
            size:[X,Y],
            anchor:[YOffset,XOffset],
            position:'topleft',
            initOpen:true
          }).addTo(Map).close()
      SetDialogImage( d)      
    }
    if (MapIsFullScreen && DialogImage && Props?.URL)
      {
        console.log(Props.URL)
        DialogImage.setContent("<Box sx={style}><img src='"+Props.URL+"' width='100%'/></Box>")
        DialogImage.open().unfreeze()
      }
      else if (!MapIsFullScreen && DialogImage)
      {
        DialogImage.close()
      }
      else
      {
        if (ShowDialogCallback)
        {
          console.log("Props for dialog",Props)
          ShowDialogCallBack(Props.URL)
        }
      }
    
  },[DialogImage,Props.URL,MapIsFullScreen])

  return null
}