import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';

import gsiLogo from './logos/gsi.png';
import gbcuLogo from './logos/gbcu.png';
import mashcampLogo from './logos/mashcamp.png';
import alemaniaLogo from './logos/alemania.jpg';
import hdwLogo from './logos/hdw.svg';
import cccLogo from './logos/ccc.png';
import reschLogo from './logos/resch.svg';
import biertastingLogo from './logos/biertasting.svg';
import brauwerkstattLogo from './logos/brauwerkstatt.jpg';
import heinenhofLogo from './logos/heinenhof.webp';
import braubeboLogo from './logos/braubebo.png';
import braupartnerLogo from './logos/braupartner.png';
import beerolutionLogo from './logos/beerolution.jpg';

import { Image, ImageRow, WideImage } from './styled';

function Sponsoren() {
  const isPortrait = useOrientation();

  return (
    <>
      <Meta title="Sponsoren" />
      <FullSizeCenteredFlexBox
        flexDirection={isPortrait ? 'column' : 'row'}
        sx={{ justifyContent: 'space-evenly' }}
      >
        <ImageRow>
          <a href="https://www.gsi-bonn.de" target="_blank" rel="noreferrer">
            <Image src={gsiLogo} />
          </a>
        </ImageRow>
        <ImageRow>
          <a href="http://www.gbcu.de" target="_blank" rel="noreferrer">
            <Image alt="react-router" src={gbcuLogo} />
          </a>
          <a href="https://mashcamp.shop" target="_blank" rel="noreferrer">
            <Image alt="vite" src={mashcampLogo} />
          </a>
          <a href="https://craftbeercorner.eu" target="_blank" rel="noreferrer">
            <Image alt="react-router" src={cccLogo} />
          </a>
        </ImageRow>
        <ImageRow>
          <a href="https://heinenhof.de/mikrobrauerei" target="_blank" rel="noreferrer">
            <Image alt="react-router" src={heinenhofLogo} />
          </a>
          <a href="https://www.braubebo.de" target="_blank" rel="noreferrer">
            <WideImage alt="vite" src={braubeboLogo} />
          </a>
        </ImageRow>
        <ImageRow>
          <a href="http://www.hopfenhandel-resch.de" target="_blank" rel="noreferrer">
            <Image alt="react-router" src={reschLogo} />
          </a>
          <a href="https://www.alemaniabonn.de" target="_blank" rel="noreferrer">
            <Image alt="vite" src={alemaniaLogo} />
          </a>
          <a href="https://www.biertasting-bonn.de" target="_blank" rel="noreferrer">
            <Image alt="vite" src={biertastingLogo} />
          </a>
        </ImageRow>
        <ImageRow>
          <a href="https://www.brauwerkstatt-bonn.de" target="_blank" rel="noreferrer">
            <Image alt="vite" src={brauwerkstattLogo} />
          </a>
          <a href="https://www.hopfen-der-welt.de" target="_blank" rel="noreferrer">
            <Image alt="react-router" src={hdwLogo} />
          </a>
        </ImageRow>
        <ImageRow>
          <a href="https://www.braupartner.de" target="_blank" rel="noreferrer">
            <Image alt="react-router" src={braupartnerLogo} />
          </a>
          <a href="https://www.beerolution.com" target="_blank" rel="noreferrer">
            <WideImage alt="vite" src={beerolutionLogo} />
          </a>
        </ImageRow>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Sponsoren;
