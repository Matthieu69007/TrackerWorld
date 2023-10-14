import React from "react";
import { Typography } from "@mui/material";

import FR_Rules from "../../docs/Rules.mdx"
import DE_Rules from "@site/i18n/de/docusaurus-plugin-content-docs/current/Rules.mdx"
import EN_Rules from "@site/i18n/en/docusaurus-plugin-content-docs/current/Rules.mdx"
import CS_Rules from "@site/i18n/cs/docusaurus-plugin-content-docs/current/Rules.mdx"
import ES_Rules from "@site/i18n/es/docusaurus-plugin-content-docs/current/Rules.mdx"
import HU_Rules from "@site/i18n/hu/docusaurus-plugin-content-docs/current/Rules.mdx"
import PL_Rules from "@site/i18n/pl/docusaurus-plugin-content-docs/current/Rules.mdx"
import PT_Rules from "@site/i18n/pt/docusaurus-plugin-content-docs/current/Rules.mdx"
import ZH_Rules from "@site/i18n/zh/docusaurus-plugin-content-docs/current/Rules.mdx"
import FR_ViePrivee from "../../docs/ViePrivee.mdx"
import DE_ViePrivee from "@site/i18n/de/docusaurus-plugin-content-docs/current/ViePrivee.mdx"
import EN_ViePrivee from "@site/i18n/en/docusaurus-plugin-content-docs/current/ViePrivee.mdx"
import CS_ViePrivee from "@site/i18n/cs/docusaurus-plugin-content-docs/current/ViePrivee.mdx"
import ES_ViePrivee from "@site/i18n/es/docusaurus-plugin-content-docs/current/ViePrivee.mdx"
import HU_ViePrivee from "@site/i18n/hu/docusaurus-plugin-content-docs/current/ViePrivee.mdx"
import PL_ViePrivee from "@site/i18n/pl/docusaurus-plugin-content-docs/current/ViePrivee.mdx"
import PT_ViePrivee from "@site/i18n/pt/docusaurus-plugin-content-docs/current/ViePrivee.mdx"
import ZH_ViePrivee from "@site/i18n/zh/docusaurus-plugin-content-docs/current/ViePrivee.mdx"
import FR_Presentation from "../../docs/Presentation.mdx"
import DE_Presentation from "@site/i18n/de/docusaurus-plugin-content-docs/current/Presentation.mdx"
import EN_Presentation from "@site/i18n/en/docusaurus-plugin-content-docs/current/Presentation.mdx"
import CS_Presentation from "@site/i18n/cs/docusaurus-plugin-content-docs/current/Presentation.mdx"
import ES_Presentation from "@site/i18n/es/docusaurus-plugin-content-docs/current/Presentation.mdx"
import HU_Presentation from "@site/i18n/hu/docusaurus-plugin-content-docs/current/Presentation.mdx"
import PL_Presentation from "@site/i18n/pl/docusaurus-plugin-content-docs/current/Presentation.mdx"
import PT_Presentation from "@site/i18n/pt/docusaurus-plugin-content-docs/current/Presentation.mdx"
import ZH_Presentation from "@site/i18n/zh/docusaurus-plugin-content-docs/current/Presentation.mdx"
import FR_TracePopup from "../../docs/TracePopup.mdx"
import DE_TracePopup from "@site/i18n/de/docusaurus-plugin-content-docs/current/TracePopup.mdx"
import EN_TracePopup from "@site/i18n/en/docusaurus-plugin-content-docs/current/TracePopup.mdx"
import CS_TracePopup from "@site/i18n/cs/docusaurus-plugin-content-docs/current/TracePopup.mdx"
import ES_TracePopup from "@site/i18n/es/docusaurus-plugin-content-docs/current/TracePopup.mdx"
import HU_TracePopup from "@site/i18n/hu/docusaurus-plugin-content-docs/current/TracePopup.mdx"
import PL_TracePopup from "@site/i18n/pl/docusaurus-plugin-content-docs/current/TracePopup.mdx"
import PT_TracePopup from "@site/i18n/pt/docusaurus-plugin-content-docs/current/TracePopup.mdx"
import ZH_TracePopup from "@site/i18n/zh/docusaurus-plugin-content-docs/current/Presentation.mdx"

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";



export default function MDXTranslator(Props)
{
  let Pages={
    'Rules':{
      'fr':<FR_Rules/>,
      'en':<EN_Rules/>,
      'de':<DE_Rules/>,
      'cs':<CS_Rules/>,
      'es':<ES_Rules/>,
      'hu':<HU_Rules/>,
      'pl':<PL_Rules/>,
      'pt':<PT_Rules/>,
      'zh':<ZH_Rules/>,
    },
    'ViePrivee':{      
        'fr':<FR_ViePrivee/>,
        'de':<DE_ViePrivee/>,
        'en':<EN_ViePrivee/>,
        'cs':<CS_ViePrivee/>,
        'es':<ES_ViePrivee/>,
        'hu':<HU_ViePrivee/>,
        'pl':<PL_ViePrivee/>,
        'pt':<PT_ViePrivee/>,
        'zh':<ZH_ViePrivee/>,
    },
    'Presentation':{      
      'fr':<FR_Presentation/>,
      'de':<DE_Presentation/>,
      'en':<EN_Presentation/>,
      'cs':<CS_Presentation/>,
      'es':<ES_Presentation/>,
      'hu':<HU_Presentation/>,
      'pl':<PL_Presentation/>,
      'pt':<PT_Presentation/>,
      'zh':<ZH_Presentation/>,
    },
    'TracePopup':{      
      'fr':<FR_TracePopup {...Props} Infos={Props.Infos}/>,
      'de':<DE_TracePopup {...Props}/>,
      'en':<EN_TracePopup {...Props}/>,
      'cs':<CS_TracePopup {...Props}/>,
      'es':<ES_TracePopup {...Props}/>,
      'hu':<HU_TracePopup {...Props}/>,
      'pl':<PL_TracePopup {...Props}/>,
      'pt':<PT_TracePopup {...Props}/>,
      'zh':<ZH_TracePopup {...Props}/>,
    },

  }
  
  
  const { i18n} = useDocusaurusContext();


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
    return (<>{Pages[PageName][i18n.currentLocale]} </>)
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