import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/HomepageFeatures';
import styles from './index.module.css';
import {  Ion } from "cesium";
import Chip from '@mui/material/Chip';
import ViewerComponent from '../components/ViewerComponent';
import Typography from '@mui/material/Typography';
import Itinerary from '../../docs/Itinerary.mdx';
import Translate from '@docusaurus/Translate';
import MDXTranslator from '../components/MDXTranslator';

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMmMxODRjYy1mYzFiLTQ5MTUtODE1MS02NGNkMzAyNTIyODciLCJpZCI6MTA2OTgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJhc3NldHMiOlsyLDMsNCwxXSwiaWF0IjoxNTU3MjA1NTM1fQ.5TYPEJKj_JzGX4r_a6GQjwSu7TIW2BIzeaIW8gFLUec";


function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title"><Translate desc='Trace across the world'> Trace across the world</Translate></h1>
        <p className="hero__subtitle"> <Translate desc='Le tour du monde depuis chez soi !'>Le tour du monde depuis chez soi !</Translate></p>
        <div className={styles.buttons}>
          
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const ChipMap = <Translate desc="Carte intercative du chemin parcouru et à parcourir par trace">Carte intercative du chemin parcouru et à parcourir par trace</Translate>
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <div className="container">
          <div className="row">
            <div className={clsx('col')}>
              <div className="text--center">
              <br/><br/>
              <Typography fontSize={50}><Translate desc='Le projet en quelques mots'>Le projet en quelques mots</Translate></Typography>
              <HomepageFeatures />
              <MDXTranslator Page="Presentation"/>
              <Chip 
                label={ChipMap}
                color="success"
                size="medium"
              />
              <br /><br />
              <ViewerComponent />
              <MDXTranslator Page="Rules"/>
              <Itinerary />
              <br /> <br />
              <MDXTranslator Page="ViePrivee"/>
              </div>
            </div>
          </div>
        </div>

      </main>
    </Layout>
  );
}