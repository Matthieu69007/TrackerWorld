import React, { useEffect, useState, useRef } from "react";
import { Entity, Viewer, GeoJsonDataSource } from "resium";
import { Cartesian2, Cartesian3, Color } from "cesium";

const urlConsigneParcours =
  "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/ConsigneParcours!A:H/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68";

export default function ViewerComponent() {
  const [consigneParcoursData, setConsigneParcoursData] = useState(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    fetch(urlConsigneParcours)
      .then((x) => x.json())
      .then((x) => {
        let data = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [],
              },
            },
          ],
        };

        for (let i = 1; i < x.values.length; i++) {
          let coordinates = [
            parseFloat(x.values[i][4]),
            parseFloat(x.values[i][5]),
          ];

          data.features[0].geometry.coordinates.push(coordinates); // ajout des points à la ligne

          // ajout des étiquettes
          data.features.push({
            type: "Feature",
            properties: {
              city: x.values[i][1],
              name: x.values[i][6],
            },
            geometry: {
              type: "Point",
              coordinates: coordinates,
            },
          });
        }

        setConsigneParcoursData(data);
      });
  }, []);

  console.log(consigneParcoursData);

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

  return (
    <div>
      <button onClick={enterFullscreen}>Plein écran</button>
      <Viewer ref={viewerRef} timeline={false} animation={false}>
        <GeoJsonDataSource
          markerSymbol=""
          data={consigneParcoursData}
          // hide markers
          markerColor={Color.TRANSPARENT}
        />
        {/* Loop through consigneParcoursData and create point enitities */}
        {consigneParcoursData &&
          consigneParcoursData.features.map((feature, index) => {
            console.log(feature);
            if (feature.geometry.type === "Point") {
              const [longitude, latitude] = feature.geometry.coordinates;
              const city = feature.properties.city;
              const name = feature.properties.name;
              return (
                <Entity
                  description={name}
                  name={city}
                  point={{ pixelSize: 10 }}
                  label={{
                    text: city,
                    font: "14pt monospace",
                    pixelOffset: new Cartesian2(0, -20),
                  }}
                  // remove the on click handler
                  onClick={() => {}}
                  position={Cartesian3.fromDegrees(longitude, latitude, 100)}
                />
              );
            }
          })}
      </Viewer>
    </div>
  );
}
