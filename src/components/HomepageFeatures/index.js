import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import NextCityNameOnly from '../NextCityNameOnly';



const FeatureList = [
  {
    title: 'Visite ce site web',
    Svg: require('@site/static/img/Mascotte/Resize/lamaoncomputer2detoure.svg').default,
    description: (
      <>
        Pour décourvrir le projet et comprendre les règles.
      </>
    ),
  },
  {
    title: 'Voyage avec Trace',
    Svg: require('@site/static/img/Mascotte/Resize/lama-on-a-bike.svg').default,
    description: (
      <>
         Pour l'aider à se rapprocher de la prochaine étape du trajet prévu.
         <br/>
         Attention, Trace ne prends pas l'avion!
        <br/><br/>
        <NextCityNameOnly/>
      </>
    ),
  },
  {
    title: 'Contacte ta communauté',
    Svg: require('@site/static/img/Mascotte/Resize/lama-with-friends.svg').default,
    description: (
      <>
        Pour trouver quelqu'un qui pourra aider Trace à continuer son voyage.
      </>
    ),
  },
  {
    title: 'Prend un selfie',
    Svg: require('@site/static/img/Mascotte/Resize/lamaselfie.svg').default,
    description: (
      <> Avec Trace et la personne qui te la confiée.
      <br/>
      Ou seul avec Trace, si tu passes près d'une des étapes fixées.        
      </>
    ),
  },
  {
    title: 'Partage sur Instagram',
    Svg: require('@site/static/img/Mascotte/Resize/lamaoncomputerinstagram.svg').default,
    description: (
      <> Pour te présenter aux autres membres de l'équipe, et leur permettre de suivre le périple de Trace.       
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}


export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
        
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
