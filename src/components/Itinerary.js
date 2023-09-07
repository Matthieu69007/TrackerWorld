import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListAllCities from "@site/src/components/ListAllCities.js";
import NextCity from "@site/src/components/NextCity";

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
                        Prochaine destination
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
                    Toute les destinations
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <br />
                    <div className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '5vh' }}>
                        <div>
                            <ListAllCities />
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}