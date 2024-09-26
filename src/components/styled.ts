import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Flex = styled(Box)({
  display: 'flex',
});

const CenteredFlexBox = styled(Flex)({
  justifyContent: 'center',
  alignItems: 'center',
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  height: '100%',
});

const Logo = styled('img')({
    width: '100px',
});

export { Flex, CenteredFlexBox, FullSizeCenteredFlexBox, Logo };
