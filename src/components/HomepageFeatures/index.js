import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Connecté',
    Svg: require('@site/static/img/Mascotte/Resize/lamaoncomputerdetoure.svg').default,
    description: (
      <>
        Trace est une mascotte équipée d'un traceur qui a pour objectif de faire le tour du monde.
        <br/>
        Pour cela, elle compte sur toi pour la faire avancer de quelques pas!
      </>
    ),
  },
  {
    title: 'Collaboratif',
    Svg: require('@site/static/img/Mascotte/Resize/lamastogetherdetoure.svg').default,
    description: (
      <>
        Chaque porteur de la mascotte devient membre à part entière de l'équipe.
        Rejoins le forum et aide nous à faire avancer Trace vers la prochaine étape!
        <br/>
        Tu peux suivre son périple en ligne depuis ce site!
      </>
    ),
  },
  {
    title: 'Immersif',
    Svg: require('@site/static/img/Mascotte/Resize/lamatajmahaldetoure.svg').default,
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
