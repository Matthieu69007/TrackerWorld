import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/HomepageFeatures';
import styles from './index.module.css';
//import {  Ion } from "cesium";
import Chip from '@mui/material/Chip';
//import ViewerComponent from '../components/ViewerComponent';
import Typography from '@mui/material/Typography';
import Itinerary from '@site//docs/Itinerary.mdx';
import Translate from '@docusaurus/Translate';
import MDXTranslator from '../components/MDXTranslator';
import { Grid, Stack } from '@mui/material';
import ViewerComponent from '../components/ViewerComponent';

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
  const MDXColumnWidth="450px"
  const { siteConfig } = useDocusaurusContext();
  //const ChipMap = <Translate desc="Carte intercative du chemin parcouru et à parcourir par trace">Carte intercative du chemin parcouru et à parcourir par trace</Translate>
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Hello from ${siteConfig.title}">
      <HomepageHeader />
      <main>
        <Grid container spacing={2}>
          <Grid item xs={12}/>
          <Grid item xs={12}  >
            <Stack direction='column' alignItems="center" spacing={1}>
              <Typography fontSize={50}><Translate desc='Le projet en quelques mots'>Le projet en quelques mots</Translate></Typography>
              <HomepageFeatures />
            </Stack>
          </Grid>
          <Grid item xs={12}  justifyContent="center">
            <Stack direction='column' alignItems="center" spacing={1}>
              <div style={{"max-width":MDXColumnWidth}}>
                <MDXTranslator Page="Presentation" />
              </div>
            </Stack>
            <Stack direction='column' alignItems="center" spacing={1}>
              <div style={{width:"100%"}}>
              <ViewerComponent />           
              </div>
            </Stack>
            <Stack direction='column' alignItems="center" spacing={1}>
              <div style={{"max-width":MDXColumnWidth}}>
                <MDXTranslator Page="Rules"/>
                </div>  
                <Itinerary />
                <div style={{"max-width":MDXColumnWidth}}>  
                <MDXTranslator Page="ViePrivee"/>
              </div>
            </Stack>
          </Grid>
        </Grid>

      </main>
    </Layout>
  );
}