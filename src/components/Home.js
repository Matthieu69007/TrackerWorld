import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '../Components/HomepageFeatures';
import styles from '../pages/index.module.css';
import { Typography } from '@mui/material/Typography';
import ViewerComponent from './ViewerComponent';

export default function Home() {
    return (
      <div>
        <ViewerComponent />
      </div>
    );
  }
