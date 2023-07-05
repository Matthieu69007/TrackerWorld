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
    <Placemark>
      <name>Portland</name>
      <Point>
        <coordinates>-122.681944,45.52,0</coordinates>
      </Point>
    </Placemark>
    <Placemark>
      <name>Rio de Janeiro</name>
      <Point>
        <coordinates>-43.196389,-22.908333,0</coordinates>
      </Point>
    </Placemark>
    <Placemark>
      <name>Istanbul</name>
      <Point>
        <coordinates>28.976018,41.01224,0</coordinates>
      </Point>
    </Placemark>
    <Placemark>
      <name>Reykjavik</name>
      <Point>
        <coordinates>-21.933333,64.133333,0</coordinates>
      </Point>
    </Placemark>
    <Placemark>
      <name>Simple Polygon</name>
      <styleUrl>#transparentPolygon</styleUrl>
      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>-122.681944,45.52,0
            -43.196389,-22.908333,0
            28.976018,41.01224,0
            -21.933333,64.133333,0
            -122.681944,45.52,0</coordinates>
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
