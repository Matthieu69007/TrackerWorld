import React, { useEffect, useState, useRef } from 'react';
import { Viewer, GeoJsonDataSource } from "resium";
import { Color } from "cesium";

const urlConsigneParcours = "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/ConsigneParcours!A:H/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68"

export default function ViewerComponent() {
  const [consigneParcoursData, setConsigneParcoursData] = useState(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    fetch(urlConsigneParcours).then(x => x.json()).then(x => {
      let data = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": []
            }
          }
        ]
      }

      for (let i = 1; i < x.values.length; i++) {
        let coordinates = [parseFloat(x.values[i][4]), parseFloat(x.values[i][5])]

        data.features[0].geometry.coordinates.push(coordinates) // ajout des points à la ligne

        // ajout des étiquettes
        data.features.push({
          "type": "Feature",
          "properties": {
            "name": x.values[i][6]
          },
          "geometry": {
            "type": "Point",
            "coordinates": coordinates
          }
        })
      }

      setConsigneParcoursData(data)
    })
  }, []);

  const enterFullscreen = () => {
    if (viewerRef.current) {
      if (viewerRef.current.cesiumElement) {
        const cesiumViewer = viewerRef.current.cesiumElement;
        if (cesiumViewer.canvas) {
          if (cesiumViewer.canvas.requestFullscreen) {
            cesiumViewer.canvas.requestFullscreen();
          } else if (cesiumViewer.canvas.mozRequestFullScreen) {
            cesiumViewer.canvas.mozRequestFullScreen();
          } else if (cesiumViewer.canvas.webkitRequestFullscreen) {
            cesiumViewer.canvas.webkitRequestFullscreen();
          } else if (cesiumViewer.canvas.msRequestFullscreen) {
            cesiumViewer.canvas.msRequestFullscreen();
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <button onClick={enterFullscreen}>Plein écran</button>
      <Viewer ref={viewerRef} timeline={false} animation={false}>
        <GeoJsonDataSource
          data={consigneParcoursData}
          markerColor={Color.Blue}
        />
      </Viewer>
    </div>
  );
}