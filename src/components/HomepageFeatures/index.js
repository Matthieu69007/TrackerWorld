import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Collaboratif',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Une mascotte équipée d'un traceur a pour objectif de faire le tour du monde.
        Pour cela, elle compte sur vous pour la faire avancer de quelques pas!
      </>
    ),
  },
  {
    title: 'Convivial',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Chaque porteur du traceur devient membre à part entière de l'équipe.
        Rejoins le forum et aide nous à faire avancer la mascotte vers la prochaine étape!
      </>
    ),
  },
  {
    title: 'Découverte',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Chaque membre de l'équipe peut envoyer des photos ou vidéos du périple.
        Une vidéo sera réalisée à l'issue du tour du monde pour tous nous réunir et découvrir les pérégrinations de la mascotte.
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
