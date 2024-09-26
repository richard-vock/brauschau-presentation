import React from 'react';
import Markdown from 'react-markdown';
import { useLocalStorage } from 'usehooks-ts';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import useTheme from '@/store/theme';
import useDB from '@/hooks/useDB';
import Meta from '@/components/Meta';
import Loading from '@/components/Loading';

function Biere() {
  const db = useDB();
  const [theme] = useTheme();
  const { isLoading, data } = db.useQuery({ beers: { groups: {} } });
  const beers = data?.beers ?? [];
  beers.sort((a, b) => {
    const placeA = parseInt(a.place.split('-')[0]);
    const placeB = parseInt(b.place.split('-')[0]);
    return placeA - placeB;
  });
  const [collapsed, setCollapsed] = React.useState<{ [key: string]: boolean }>({});
  const onRatingClick = (beer_id: string) => {
    const newCollapsed = { ...collapsed };
    newCollapsed[beer_id] = !(newCollapsed[beer_id] ?? true);
    setCollapsed(newCollapsed);
  };

  const [rating, setRating] = useLocalStorage<{ [key: string]: { [metric: string]: number } }>(
    'rating',
    {},
  );
  const getRating = (beer_id: string, metric: string) => {
    return rating[beer_id]?.[metric] ?? 0;
  };
  const updateRating = (beer_id: string, metric: string, value: number | null) => {
    if (value === null) {
      return;
    }
    const newRating = { ...rating };
    if (!newRating[beer_id]) {
      newRating[beer_id] = {};
    }
    newRating[beer_id][metric] = value;
    setRating(newRating);
  };
  const averageRating = (beer_id: string) => {
    const r = rating[beer_id];
    if (!r) {
      return 0;
    }
    const sum = (r['Geschmack'] ?? 0) + (r['Geruch'] ?? 0) + (r['Aussehen'] ?? 0);
    const count = (r['Geschmack'] ? 1 : 0) + (r['Geruch'] ? 1 : 0) + (r['Aussehen'] ? 1 : 0);
    return sum / count;
  };
  return (
    <>
      <Meta title="Biere" />
      <Stack spacing={8} useFlexGap sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
          <Typography variant="h3">Die Biere 2024</Typography>
        </Box>

        {isLoading ? (
          <Loading />
        ) : (
          <Stack spacing={2} divider={<Divider flexItem />}>
            {(data?.beers ?? []).map((beer) => (
              <Stack key={beer.id} spacing={2} sx={{ padding: 2 }}>
                <Stack>
                  <Stack
                    direction="row"
                    sx={{ flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.7em' }}
                  >
                    <Stack>
                      <Stack
                        direction="row"
                        sx={{ gap: '0', alignItems: 'flex-start', flexWrap: 'wrap' }}
                      >
                        <Typography variant="h5" sx={{ color: '#faaf00', marginRight: '0.8em' }}>
                          <div style={{ whiteSpace: 'nowrap' }}>{beer.place}</div>
                        </Typography>
                        <Typography variant="h5" sx={{ marginRight: '0.8em' }}>
                          {beer.name}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#999' }}>
                          {beer.style}
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ gap: '0.5em', alignItems: 'flex-end' }}>
                        <Typography variant="h6">von</Typography>
                        <Typography variant="h6" sx={{ color: '#faaf00' }}>
                          {beer.user}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction="row" sx={{ gap: 1, alignItems: 'flex-start' }}>
                      <Typography sx={{ color: '#999' }}>
                        {averageRating(beer.id) > 0 ? averageRating(beer.id).toFixed(1) : '-'}
                      </Typography>
                      <div onClick={() => onRatingClick(beer.id)}>
                        <Rating
                          name="overall-rating"
                          value={averageRating(beer.id)}
                          precision={0.1}
                          readOnly
                        />
                      </div>
                    </Stack>
                  </Stack>
                </Stack>
                {!(collapsed[beer.id] ?? true) && (
                  <Paper sx={{ padding: 2 }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                      Deine Bewertung
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>Geschmack</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Rating
                          name="customized-10"
                          value={getRating(beer.id, 'Geschmack')}
                          onChange={(event, newValue) => {
                            updateRating(beer.id, 'Geschmack', newValue);
                          }}
                          max={5}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>Geruch</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Rating
                          name="customized-10"
                          value={getRating(beer.id, 'Geruch')}
                          onChange={(event, newValue) => {
                            updateRating(beer.id, 'Geruch', newValue);
                          }}
                          max={5}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>Aussehen</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Rating
                          name="customized-10"
                          value={getRating(beer.id, 'Aussehen')}
                          onChange={(event, newValue) => {
                            updateRating(beer.id, 'Aussehen', newValue);
                          }}
                          max={5}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                )}
                <Box>
                  <Markdown>{beer.description}</Markdown>
                </Box>
                <Stack direction="row" spacing={4}>
                  <Typography sx={{ color: theme === 'dark' ? '#999' : '#333' }}>
                    Alk: {beer.abv}%
                  </Typography>
                  <Typography sx={{ color: theme === 'dark' ? '#999' : '#333' }}>
                    Stammwürze: {beer.gravity}
                  </Typography>
                  <Typography sx={{ color: theme === 'dark' ? '#999' : '#333' }}>
                    IBU: {beer.ibu}
                  </Typography>
                </Stack>
                {beer.untappd ? (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
                    <Typography sx={{ color: theme === 'dark' ? '#999' : '#333' }}>
                      Untappd:
                    </Typography>
                    <Link
                      href={beer.untappd}
                      color="#bf932c"
                      target="_blank"
                      sx={{ overflow: 'hidden' }}
                    >
                      {beer.untappd}
                    </Link>
                  </Box>
                ) : null}
                {beer.recipe ? (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
                    <Typography sx={{ color: theme === 'dark' ? '#999' : '#333' }}>
                      Rezept:
                    </Typography>
                    <Link
                      href={beer.recipe}
                      color="#bf932c"
                      target="_blank"
                      sx={{ overflow: 'hidden' }}
                    >
                      {beer.recipe}
                    </Link>
                  </Box>
                ) : null}
              </Stack>
            ))}
          </Stack>
        )}
        {/*
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 2 }}>
          <Typography variant="h3">FAQ</Typography>
        </Box>
        */}
      </Stack>
    </>
  );
}

export default Biere;
