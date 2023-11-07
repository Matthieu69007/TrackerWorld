import { Map } from '@mui/icons-material'
import { Box } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useMap } from 'react-leaflet'

export default function DialogPicture(Props)
{
  const Dialog = require('./Leaflet.Dialog.js')
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
            size:[0,0],
            maxSize:[screen.width,screen.height],
            minSize:[100,100],
            anchor:[YOffset,XOffset],
            position:'topleft',
            initOpen:true
          }).addTo(Map).close()
      SetDialogImage( d)      
    }
    else if (X!==DialogImage.options.size[0] )
    {

      DialogImage.setSize([X,Y]).setLocation([YOffset,XOffset])
      console.log("resized to ",X,Y, MapIsFullScreen, DialogImage.options.size[0],DialogImage.options.size[1])
      
    }
    
    if (MapIsFullScreen && DialogImage && Props?.URL)
      {
        let Size = DialogImage.options.size
        console.log("opening FSDialog", Props.URL, Size)
        DialogImage.setContent("<div style='align-self: center;display: flex;justify-content: center;flex-wrap: nowrap;'><img src='"+Props.URL+"' style='max-width:"+Size[0]+"px; max-height:"+Size[1]+"px; width:fit-content; height:fit-content; object-fit:contain;' /></div>")
        DialogImage.open().unfreeze()
      }
      else if (!MapIsFullScreen && DialogImage && DialogImage.is)
      {
        
        DialogImage.close()
        DialogImage.destroy()
        SetDialogImage(null)
        if (ShowDialogCallback) ShowDialogCallback(null)
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