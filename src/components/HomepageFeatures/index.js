import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import NextCityNameOnly from '../NextCityNameOnly';
import Translate from '@docusaurus/Translate';
import { Grid, Stack } from '@mui/material';


const FeatureList = [
  {
    row:1,
    title: <Translate desc='Visite ce site web'>Visite ce site web</Translate>,
    Svg: require('@site/static/img/Mascotte/Resize/lamaoncomputer2detoure.svg').default,
    description: <Translate desc='Pour décourvrir le projet et comprendre les règles.'>
                  Pour décourvrir le projet et comprendre les règles.
                </Translate>,
  },
  {
    row:1,
    title: <Translate desc='Voyage avec Trace'>Voyage avec Trace</Translate>,
    Svg: require('@site/static/img/Mascotte/Resize/lama-on-a-bike.svg').default,
    description: (
      <>
         <Translate desc="Pour l'aider à se rapprocher de la prochaine étape du trajet prévu.">Pour l'aider à se rapprocher de la prochaine étape du trajet prévu.</Translate>
         <br/>
         <Translate desc="Attention, Trace ne prends pas l'avion!">Attention, Trace ne prends pas l'avion!</Translate>
        <br/>
        <NextCityNameOnly/>
      </>
    ),
  },
  {
    row:1,
    title: <Translate desc='Contacte ta communauté'>Contacte ta communauté</Translate>,
    Svg: require('@site/static/img/Mascotte/Resize/lama-with-friends.svg').default,
    description: (
      <Translate desc="Pour trouver quelqu'un qui pourra aider Trace à continuer son voyage.">
        Pour trouver quelqu'un qui pourra aider Trace à continuer son voyage.
      </Translate>
    ),
  },
  {
    row:2,
    title: <Translate desc='Prend un selfie'>Prend un selfie</Translate>,
    Svg: require('@site/static/img/Mascotte/Resize/lamaselfie.svg').default,
    description: (<>
      <Translate desc='Avec Trace et la personne à qui tu confies la mascotte.'>
        Avec Trace et la personne à qui tu confies la mascotte.
      </Translate>
      <br/>
      <Translate desc="Ou seul avec Trace, si tu passes près d'une des étapes fixées.">
      Ou seul avec Trace, si tu passes près d'une des étapes fixées.
      </Translate>
      </>
    ),
  },
  {
    row:2,
    title: <Translate desc='Partage sur Instagram'>Partage sur Instagram</Translate>,
    Svg: require('@site/static/img/Mascotte/Resize/lamaoncomputerinstagram.svg').default,
    description: (
      <Translate desc="Pour te présenter aux autres membres de l'équipe, et leur permettre de suivre le périple de Trace."> 
        Pour te présenter aux autres membres de l'équipe, et leur permettre de suivre le périple de Trace.       
      </Translate>
    ),
  },
];

function Feature({Svg, title, description,smWidth}) {
  return (
    <Grid item xs={12} sm={smWidth?smWidth:4}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Grid>
  );
}

let FLRow1 = FeatureList.filter( (x)=>{if (x?.row==1){ return x} else {return null}})
let FLRow2 = FeatureList.filter( (x)=>{if (x?.row==2){ return x }else {return null}})


export default function HomepageFeatures() {
  return (
    
      <Stack justifyItems='center' alignSelf='center' flexGrow spacing={4}>
        <Grid container justifyContent='center' width={'100%'} spacing={3}>
          <Grid item xs={12}>
            <Grid container>
            {FLRow1.map((props, idx) => (
              <Feature key={'r1'+idx} {...props} />
            ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent='center' flexGrow>
          <Grid item xs={12}>
            <Grid container>
            {FLRow2.map((props, idx) => (
              <Feature key={'R2'+idx} {...props} smWidth={6} />
            ))}
            </Grid>
          </Grid>
        </Grid>
        
        
      </Stack>
    
    
  );
}
