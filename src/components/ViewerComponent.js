import React, { useEffect, useState, useRef } from "react";
import { Entity, Viewer, GeoJsonDataSource, CameraFlyTo, Clock, CameraLookAt, Scene } from "resium";
import { Cartesian2, Cartesian3, Color, SceneMode } from "cesium";
import { urlNextcity } from "./NextCity";

const urlConsigneParcours =
  "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/ConsigneParcours!A:I/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68";
const urlTraceReelle =
  "https://sheets.googleapis.com/v4/spreadsheets/1FNX9RpTH7WgQKxqpfvGJ7koBMNxcFUtTRvzAIoD8iyI/values/TraceReelle!B7:C100004/?key=AIzaSyCfXHtG7ylyNenz8ncsqAuS4njElL2dm68";

const PreviouslineColor = Color.fromCssColorString("#D5720E");
const NextlineColor = Color.fromCssColorString("#572C3A");
const SOME_ZOOM_THRESHOLD = 500000; // Ajustez cette valeur selon vos besoins

export default function ViewerComponent() {
  const [consigneParcoursPreviousData, setConsigneParcoursPreviousData] =
    useState(null);
  const [consigneParcoursNextData, setConsigneParcoursNextData] =
    useState(null);
  const [traceReelleData, setTraceReelleData] =
    useState(null);
  const [StartPos, setStartPos] =
    useState([4.820163386, 45.75749697]);
  const [nextCityId, setNextCityId] = useState(1);
  const viewerRef = useRef(null);
  const cityEntitiesRef = useRef([]);


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
        let previousData = {
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

        let nextData = {
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
            parseFloat(x.values[i][5]),
            parseFloat(x.values[i][4]),
          ];

          const properties = {
            city: x.values[i][1],
            name: x.values[i][6],
          };

          const pointData = {
            type: "Feature",
            properties,
            geometry: {
              type: "Point",
              coordinates: coordinates,
            },
          };

          const cityId = parseFloat(x.values[i][0]);

          if (cityId <= nextCityId) {
            previousData.features[0].geometry.coordinates.push(coordinates); // ajout des points à la ligne
            previousData.features.push(pointData);
          }
          if (cityId >= nextCityId) {
            nextData.features[0].geometry.coordinates.push(coordinates); // ajout des points à la ligne
            // ajout des étiquettes
            nextData.features.push(pointData);
          }
        }
        setConsigneParcoursPreviousData(previousData);
        setConsigneParcoursNextData(nextData);
      });

    fetch(urlTraceReelle)
      .then((x) => x.json())
      .then((x) => {
        let traceData = {
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
            parseFloat(x.values[i][1]),
            parseFloat(x.values[i][0]),
          ];
          traceData.features[0].geometry.coordinates.push(coordinates);
        }
        setStartPos([parseFloat(x.values[x.values.length - 1][1]), parseFloat(x.values[x.values.length - 1][0])])
        setTraceReelleData(traceData);
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

 

  return (
    <div>
      <button onClick={enterFullscreen}>Plein écran</button>

      <Viewer ref={viewerRef} timeline={false} animation={false} >
        <Scene mode={SceneMode.SCENE2D} onMorphComplete={()=>{viewerRef.current.cesiumElement?.ViewerComponent?.Camera?.CameraFlyTo(React.Component.PropsWithChildren<CameraFlyTo>{Clock:false, destination:Cartesian3.fromDegrees(StartPos[0], StartPos[1], 1000000)})}}/>
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


        {/* Loop through consigneParcoursData and create point entities */}
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
    </div>
  );
}
