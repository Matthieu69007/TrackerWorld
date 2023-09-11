import React from 'react';
import NextCity from '../components/NextCity';
import { Stack, Typography } from '@mui/material';
import Translate from '@docusaurus/Translate';

export default function Rules ()
{
return (
<>
<meta name="viewport" content="initial-scale=1, width=device-width" />

<div style={{ width: '800px', margin: '0 auto', textAlign: 'center' }}>
<br/><br/>
<br/>

<Typography variant="h2"><Translate desc="Les règles">Les règles</Translate></Typography>

Tu viens de recevoir la mascotte Trace. Tu rejoins donc l'équipe TraceAcrossTheWorld qui tente la folle aventure de lui faire **faire un tour du monde!**

Voici les quelques règles qui vont t'aiguiller sur la manière dont tu peux nous aider!

<br/>

-<Translate desc='Voilà la <span class = "gras" >prochaine destination</span> de Trace'> Voilà la <span class = "gras" >prochaine destination</span> de Trace :</Translate>

<br/>
<div className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '5vh' }}>
      <div>
        <NextCity/>
      </div>
</div>

<br/>

- Tu penses **aller dans la bonne direction** dans les prochains jours? **Garde Trace avec toi** et fais la avancer du mieux que tu puisses.
Ce n'est pas grave si tu ne vas pas exactement jusqu'à la prochaine destination. L'important est de **faire avancer Trace dans la bonne direction.**  
Même quelques kilomètres sont d'une grande aide pour Trace!
Sur le trajet, ce serait super si tu pouvais faire une petite vidéo de toi avec la mascotte Trace devant un endroit que tu apprécies particulièrement et que tu souhaites nous montrer!  
Et rappelle toi : **Trace ne prend pas l'avion!**

- Tu ne penses pas pouvoir aider Trace à avancer ? Pas de panique! Rends toi directement à la prochaine étape.

<div style={{ display: "flex", justifyContent: "center" }}>
  <img src="/img/Mascotte/Resize/tracefullbodydetoure.svg" alt="Trace Mascot" />
</div>
<br/>

- Il est maintenant temps de **passer le relais.** Cherche une personne que tu connais qui ira dans la bonne direction pour **rapprocher Trace de sa prochaine destination.**

- Tu ne connais personne susceptible de nous aider? Trois solutions s'offrent à toi

<br/>
<Stack spacing={2} alignItems="center">
  <div className="contour-ombre" style={{ width: "100%", textAlign: "center"}}>
    Contacte le groupe <a href="https://chat.whatsapp.com/FKwW0q23yVk3OdKNKAxGnE" target="_blank" rel="noopener noreferrer">WhatsApp</a> du projet. <br /> On pourra peut-être t'aider à trouver quelqu'un proche de toi pour t'aider à faire avancer Trace.
  </div>
  <div className="contour-ombre" style={{ width: "100%", textAlign: "center"}}>
    Rends toi dans l'<a href="https://www.hostelworld.com/" target="_blank" rel="noopener noreferrer">auberge de jeunesse</a> la plus proche et explique le projet aux gens présents. <br /> Il y aura surement des voyageurs qui seront intéressés pour prendre part à l'aventure!
  </div>
  <div className="contour-ombre" style={{ width: "100%", textAlign: "center"}}>
    Reviens quelques kilomètres en arrière pour trouver une personne susceptible d'être intéressée! Mieux vaut reculer pour passer le relais que s'arrêter!
  </div>
</Stack>

<br/>
<br/>

- Au moment de passer la mascotte, soit sûr de la donner à **quelqu'un de motivé par le projet.** Montre lui ce site avec toutes les explications pour qu'elle ait toutes les informations pour continuer l'aventure!


- Avant de vous quitter, prenez une photo de vous deux avec la mascotte et envois la nous <a href="https://www.instagram.com/traceacrosstheworld/" target="_blank" rel="noopener noreferrer">ici</a>!



<h2 style={{ textAlign: "center" }}>Cas particuliers</h2>

<br/>

- Trace a décidé de ne pas prendre l'avion pour son périple. Pour traverser les mers, il va falloir trouver un marin dévoué dans le port le plus proche!

- Si tu as la moindre question, n'hésite pas à envoyer un mail à l'<a href="mailto:traceacrosstheworld@gmail.com">adresse contact</a> (traceacrosstheworld@gmail.com) ou à poster un message sur le <a href="https://chat.whatsapp.com/FKwW0q23yVk3OdKNKAxGnE" target="_blank" rel="noopener noreferrer">WhatsApp</a> du projet!

<div style={{ display: "flex", justifyContent: "center" }}>
  <img src="/img/Mascotte/Resize/lamaoncomputerinstagram.svg" alt="Instagram Mascot" />
</div>
</div>

</>

);}