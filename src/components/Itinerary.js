import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListAllCities from "@site/src/components/ListAllCities.js";
import NextCity from "@site/src/components/NextCity";
import Translate from '@docusaurus/Translate';

export default function Itinerary() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (


        <div>
            <div className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '5vh' }}>
                <div>
                    <Typography variant="h4" gutterBottom>
                        <Translate desc='Prochaine destination'>Prochaine destination</Translate>
                    </Typography>
                    <br />
                    <NextCity />
                </div>
            </div>
            <br />
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ textAlign:'center',width: '100%', flexShrink: 0,fontWeight: 'bold' }}>
                    <Translate desc='Toutes les destinations'>Toutes les destinations</Translate>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '80%', minHeight: '5vh' }}>
                        <div>
                            <ListAllCities />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}