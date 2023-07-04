import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Connectée',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        La mascotte Trace est équipée d'un traceur. Elle a pour objectif de faire le tour du monde.
        Pour cela, elle compte sur toi pour la faire avancer de quelques pas!
      </>
    ),
  },
  {
    title: 'Collaboratif',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Chaque porteur du traceur devient membre à part entière de l'équipe.
        Rejoins le forum et aide nous à faire avancer Trace vers la prochaine étape!
      </>
    ),
  },
  {
    title: 'Immersif',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Chaque membre de l'équipe peut partager photos et vidéos du périple de Trace en sa compagnie.
        Une vidéo sera réalisée au retour de Trace pour présenter la diversité du monde rencontré au travers de son périple.
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
