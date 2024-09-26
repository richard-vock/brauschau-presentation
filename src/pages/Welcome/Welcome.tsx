import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';
import useTheme from '@/store/theme';

import glasLogo from './logos/glas.webp';
import glasDarkLogo from './logos/glas_dark.webp';
import { Image } from './styled';

function Welcome() {
  const isPortrait = useOrientation();
  const [theme] = useTheme();

  const width = isPortrait ? '40%' : '8%';
  const height = isPortrait ? '90%' : '10%';

  return (
    <>
      <Meta title="Welcome" />
      <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
        <Stack spacing={2} useFlexGap sx={{ justifyContent: 'center', width: '100%' }}>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            Willkommen zur 5.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {theme === 'light' && <Image alt="Brauschau" src={glasLogo} sx={{ width, height }} />}
            {theme === 'dark' && (
              <Image alt="Brauschau" src={glasDarkLogo} sx={{ width, height }} />
            )}
          </Box>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            Bonner Brauschau!
          </Typography>
          <Button
            href="/biere"
            variant="contained"
            sx={{ mt: 2, color: theme == 'dark' ? '#faaf00' : '#fff' }}
          >
            Zu den Bieren
          </Button>
        </Stack>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Welcome;
