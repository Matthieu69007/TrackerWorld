import React from "react";
import { Typography } from "@mui/material";
import FR_Rules from "../../docs/Rules.mdx"
import DE_Rules from "@site/i18n/de/docusaurus-plugin-content-docs/current/Rules.mdx"
import EN_Rules from "@site/i18n/en/docusaurus-plugin-content-docs/current/Rules.mdx"
import FR_ViePrivee from "../../docs/ViePrivee.mdx"
import DE_ViePrivee from "@site/i18n/de/docusaurus-plugin-content-docs/current/ViePrivee.mdx"
import EN_ViePrivee from "@site/i18n/en/docusaurus-plugin-content-docs/current/ViePrivee.mdx"
import FR_Presentation from "../../docs/Presentation.mdx"
import DE_Presentation from "@site/i18n/de/docusaurus-plugin-content-docs/current/Presentation.mdx"
import EN_Presentation from "@site/i18n/en/docusaurus-plugin-content-docs/current/Presentation.mdx"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";



export default function MDXTranslator(Props)
{
  let Pages={
    'Rules':{
      'fr':<FR_Rules/>,
      'en':<EN_Rules/>,
      'de':<DE_Rules/>
    },
    'ViePrivee':{      
        'fr':<FR_ViePrivee/>,
        'de':<DE_ViePrivee/>,
        'en':<EN_ViePrivee/>,
    },
    'Presentation':{      
        'fr':<FR_Presentation/>,
        'de':<DE_Presentation/>,
        'en':<EN_Presentation/>,
    }
  }
  
  
  const { i18n} = useDocusaurusContext();

  console.log("MDXTranslator")
  console.log(i18n)
  console.log(useDocusaurusContext())
  const PageName=Props.Page
  if (!i18n)
  {
    return <>no i18n</>
  }
  if (!Pages[PageName])
  {
    return <Typography >Unknown Page Name {PageName}</Typography>
  }
  else if (Pages[PageName][i18n.currentLocale])
  {
    return (<>{Pages[PageName][i18n.currentLocale]}</>)
  }
  else if ((Pages[PageName][i18n.defaultLocale]))
  {
    return (<>{Pages[PageName][i18n.currentLocale]}</>)
  }
  else
  {
    return (<>{Pages[PageName][0]}</>)
  }
}