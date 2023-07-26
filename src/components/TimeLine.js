import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import LamaBikingIcon from './LamaRunningBikePicture';
import LamaFriendsIcon from './LamaWithFriends';
import LamaInstagramIcon from './LamaInstagram';
import LamaSelfieIcon from './LamaTakingSelfie';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function CustomizedTimeline() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <br />
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent
        sx={{ m: 'auto 0' }}
        align="right"
        >
          <Typography variant={matches ? 'h7' : 'h5'} color="text.secondary">
            Step 1
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
        <TimelineConnector sx={{ height: '1em'}} />
          <TimelineDot style={{backgroundColor: 'transparent'}}>
            <LamaSelfieIcon />
          </TimelineDot>
          <TimelineConnector sx={{ height: '1em'}} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant={matches ? 'h6' : 'h4'} component="span">
            Take a selfie
          </Typography>
          <br/>
          <Typography variant={matches ? 'body2' : 'body1'} >
          With the person who gave Trace to you</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
        sx={{ m: 'auto 0' }}
        align="right"
        >
          <Typography variant={matches ? 'h7' : 'h5'} color="text.secondary">
            Step 2
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ height: '1em'}} />
          <TimelineDot style={{backgroundColor: 'transparent'}}>
            <LamaInstagramIcon />
          </TimelineDot>
          <TimelineConnector sx={{ height: '1em'}} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant={matches ? 'h6' : 'h4'} component="span">
            Share it on Instagram
          </Typography>
          <br/>
          <Typography variant={matches ? 'body2' : 'body1'} >
            To present yourself to other teammates and enable them to follow Trace&apos;s journey</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          >
            <Typography variant={matches ? 'h7' : 'h5'} color="text.secondary">
              Step 3
            </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
        <TimelineConnector sx={{ height: '1em'}} />
          <TimelineDot style={{backgroundColor: 'transparent'}}>
            <LamaBikingIcon />
          </TimelineDot>
          <TimelineConnector sx={{ height: '1em'}} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant={matches ? 'h6' : 'h4'} component="span">
            Travel with Trace
          </Typography>
          <br/>
          <Typography variant={matches ? 'body2' : 'body1'} >
            To help Trace to get closer to next step </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          >
            <Typography variant={matches ? 'h7' : 'h5'} color="text.secondary">
              Step 4
            </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
        <TimelineConnector sx={{ height: '1em'}} />
          <TimelineDot style={{backgroundColor: 'transparent'}}>
            <LamaFriendsIcon />
          </TimelineDot>
          <TimelineConnector sx={{ height: '1em'}} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant={matches ? 'h6' : 'h4'} component="span">
            Ask your community
          </Typography>
          <br/>
          <Typography variant={matches ? 'body2' : 'body1'} >
            To find someone who can carry Trace for few more kilometers</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
    <br />
    </>
  );
}
