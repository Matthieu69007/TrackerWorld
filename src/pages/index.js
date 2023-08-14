import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '../Components/HomepageFeatures';
import styles from './index.module.css';
import {  Ion } from "cesium";
import ViewerComponent from '../Components/ViewerComponent';
import CustomizedTimeline from '../Components/TimeLine';
import Chip from '@mui/material/Chip';

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMmMxODRjYy1mYzFiLTQ5MTUtODE1MS02NGNkMzAyNTIyODciLCJpZCI6MTA2OTgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJhc3NldHMiOlsyLDMsNCwxXSwiaWF0IjoxNTU3MjA1NTM1fQ.5TYPEJKj_JzGX4r_a6GQjwSu7TIW2BIzeaIW8gFLUec";


function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={`button button--secondary button--lg ${styles.customLinkText}`}
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
        <div className="container">
          <div className="row">
            <div className={clsx('col')}>
              <div className="text--center">
                <br />
                <CustomizedTimeline />
                <Link
                  className={`button button--secondary button--lg ${styles.customLinkText}`}
                  to="/docs/Rules">
                  Voir les règles en détail ! 📜
                </Link>
                <br /><br /> <br />
                <HomepageFeatures />
                <br />
                  <Chip 
                  label="Carte intercative du chemin parcouru et à parcourir par trace"
                  color="success"
                  size="medium"
                  />
                <br /><br />
                <ViewerComponent />
                <br /> <br />
              </div>
            </div>
          </div>
        </div>

      </main>
    </Layout>
  );
}