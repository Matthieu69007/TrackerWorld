import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

import { Viewer, KmlDataSource, GeoJsonDataSource } from "resium";
const data = new DOMParser().parseFromString(
  `
  <?xml version="1.0" encoding="utf-8"?>
  <kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <Style id="transparentPolygon">
      <LineStyle>
        <color>ff0000ff</color> <!-- red color for lines -->
        <width>20</width> <!-- line thickness -->
      </LineStyle>
      <PolyStyle>
        <color>00000000</color> <!-- transparent fill -->
      </PolyStyle>
    </Style>
    "<Placemark>
      <name>Fourvière basilica, Lyon, France</name>
      <Point>
        <coordinates> 4.821929894134056,45.7623071952387,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Eiffel tower, Paris, France</name>
      <Point>
        <coordinates> 2.2945011330055127,48.85848960517993,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Brandenburg Gate, Berlin, Germany</name>
      <Point>
        <coordinates> 13.377768470257454,52.516365976220165,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Hungarian Parliament Building, Budapest, Hongry</name>
      <Point>
        <coordinates> 19.045679710452752,47.50725859588536,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Suomenlinna, Helsinki, Finland</name>
      <Point>
        <coordinates> 24.987929324890782,60.14617378615127,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>North Cap, North Cap, Norway</name>
      <Point>
        <coordinates> 25.78370281366764,71.17102599848594,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Trädgårdsföreningen, Goteborg, Sweden</name>
      <Point>
        <coordinates> 11.974358871665233,57.7046242002345,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Kinderdijk’s Windmills, Rotterdam, Netherlands</name>
      <Point>
        <coordinates> 4.641530793744695,51.882618261311194,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Time Square, New york, USA</name>
      <Point>
        <coordinates> -73.9854782302911,40.758112826992765,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Parliement hill, Ottawa, Canada</name>
      <Point>
        <coordinates> -75.7009290190626,45.42374419929932,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>O'Hara Lake, Yoho National Park, Canada</name>
      <Point>
        <coordinates> -116.33681419167206,51.35656911375588,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Golden gates, San Francisco, USA</name>
      <Point>
        <coordinates> -122.4780695266073,37.82132893947804,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Chichén Itzá, Chichén Itzá, Mexique</name>
      <Point>
        <coordinates> -88.56658356360921,20.688927973478677,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Botanical Garden, Medellin, Colombie</name>
      <Point>
        <coordinates> -75.56355387526187,6.270719180574629,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Machu Pichu, Machu Pichu, Peru</name>
      <Point>
        <coordinates> -72.49835243407134,-13.222483973927039,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Corcovado, Rio de Janeiro, Brésil</name>
      <Point>
        <coordinates> -43.211403841506026,-22.951837534822786,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Woman's Bridge, Bueno Aires, Argentine</name>
      <Point>
        <coordinates> -58.36509683025436,-34.60772838950773,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Paseo Gervasoni, Valparaiso, Chili</name>
      <Point>
        <coordinates>-71.62666824907647,-33.041113171779436,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Garden by the bay, Singapour, Singapour</name>
      <Point>
        <coordinates> 103.86365642017292,1.2815930244390747,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Grand Palace, Bangkok, Thailand</name>
      <Point>
        <coordinates> 100.4915657671252,13.750085056754545,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Taj Mahal, Agra, India</name>
      <Point>
        <coordinates> 78.03358197233635,27.173946991530947,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Swaminarayan Akshardham, Delhi, India</name>
      <Point>
        <coordinates> 77.27732627301175,28.6134834963891,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Badshahi Mosque, Lahore, Pakistan</name>
      <Point>
        <coordinates> 74.31167737483118,31.593353305583133,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Azadi tower, Teheran, Iran</name>
      <Point>
        <coordinates> 51.33805755767058,35.70034298946901,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Gorëme National Park, Gorëme, Turquie</name>
      <Point>
        <coordinates> 34.82918935540082,38.64352426239869,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Mersin Marina, Mersin, Turquie</name>
      <Point>
        <coordinates> 34.57265103512746,36.77275234761732,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Port Fouad Grand Mosquee, Port Saïd, Egypte</name>
      <Point>
        <coordinates> 32.317885218906575,31.248568789660535,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Abu Simbel temple, Abu Simbel, Egypte</name>
      <Point>
        <coordinates> 31.625777240508558,22.337439682797328,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Dallol volcano, Danakil desert, Ethiopia</name>
      <Point>
        <coordinates>40.29993562698826,14.242893840857331,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Unity monument, Bujumbura, Burundi</name>
      <Point>
        <coordinates> 29.38841730942117,-3.392758075892864,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name></name>
      <Point>
        <coordinates>35.56378643854582,-3.169020024888514,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Victoria Fall, Victorai Fall, Zimbabwe</name>
      <Point>
        <coordinates> 25.858562952749313,-17.925415195875903,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Boulder beach, Cape town, South Africa</name>
      <Point>
        <coordinates>18.45035466246551,-34.195382024330726,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Dead Vlei, Dead Vlei, Namibie</name>
      <Point>
        <coordinates>15.292153365623596,-24.758357392982457,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Kola Gorge, Kola Gorge, Cameroun</name>
      <Point>
        <coordinates> 13.953544013812403,9.83309096858937,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Retba Lake, Dakar, Sénégal</name>
      <Point>
        <coordinates> -17.234062336692478,14.839487945949326,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>The rock of Gibraltar, Gibraltar, United Kingdom</name>
      <Point>
        <coordinates> -5.341725474297509,36.14505695679729,0</coordinates>
      </Point>
    </Placemark>"
"<Placemark>
      <name>Fourvière basilica, Lyon, France</name>
      <Point>
        <coordinates> 4.821929894134056,45.7623071952387,0</coordinates>
      </Point>
    </Placemark>"

    <Placemark>
      <name>Simple Polygon</name>
      <styleUrl>#transparentPolygon</styleUrl>
      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>
            4.821929894134056,45.7623071952387,0
            2.2945011330055127,48.85848960517993,0
            13.377768470257454,52.516365976220165,0
            19.045679710452752,47.50725859588536,0
            24.987929324890782,60.14617378615127,0
            25.78370281366764,71.17102599848594,0
            11.974358871665233,57.7046242002345,0
            4.641530793744695,51.882618261311194,0
            -73.9854782302911,40.758112826992765,0
            -75.7009290190626,45.42374419929932,0
            -116.33681419167206,51.35656911375588,0
            -122.4780695266073,37.82132893947804,0
            -88.56658356360921,20.688927973478677,0
            -75.56355387526187,6.270719180574629,0
            -72.49835243407134,-13.222483973927039,0
            -43.211403841506026,-22.951837534822786,0
            -58.36509683025436,-34.60772838950773,0
            -71.62666824907647,-33.041113171779436,0
            103.86365642017292,1.2815930244390747,0
            100.4915657671252,13.750085056754545,0
            78.03358197233635,27.173946991530947,0
            77.27732627301175,28.6134834963891,0
            74.31167737483118,31.593353305583133,0
            51.33805755767058,35.70034298946901,0
            34.82918935540082,38.64352426239869,0
            34.57265103512746,36.77275234761732,0
            32.317885218906575,31.248568789660535,0
            31.625777240508558,22.337439682797328,0
            40.29993562698826,14.242893840857331,0
            29.38841730942117,-3.392758075892864,0
            35.56378643854582,-3.169020024888514,0
            25.858562952749313,-17.925415195875903,0
            18.45035466246551,-34.195382024330726,0
            15.292153365623596,-24.758357392982457,0
            13.953544013812403,9.83309096858937,0
            -17.234062336692478,14.839487945949326,0
            -5.341725474297509,36.14505695679729,0
            4.821929894134056,45.7623071952387,0
            </coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>
    </Placemark>
  </Document>
  </kml>
  

`.trim(),
  "text/xml",
);



function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/Presentation">
            Un tour du monde collaboratif! 🌍
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <div className="container">
          <div className="row">
            <div className={clsx('col')}>
              <div className="text--center">
                <Viewer >
                  <KmlDataSource data={data}  />
                </Viewer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}





