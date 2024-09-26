import { styled } from '@mui/material/styles';

export const Image = styled('img')({
  height: '100px',
});

export const WideImage = styled('img')({
  width: '300px',
  height: '70px',
});

export const ImageRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});
