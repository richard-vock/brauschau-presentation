import { FC, useRef } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';

import Markdown from 'react-markdown';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox, Flex, FullSizeCenteredFlexBox } from '@/components/styled';
import verticalLoop from '@/utils/verticalLoop';

import useTheme from '@/store/theme';
import useDB from '@/hooks/useDB';

gsap.registerPlugin(Observer);
const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const Content_ : FC<{beers: any[]}> = ({beers}) => {
    const [theme] = useTheme();
    const primary = '#fa3f00';
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const createTweens = () => {
                const loop = verticalLoop('.container .beer', {
                    repeat: -1,
                    center: true,
                });

                Observer.create({
                    target: window,
                    type: 'wheel',
                    onWheel: () => {
                        gsap
                            .timeline()
                            .to(loop, { timeScale: 3, duration: 0.25 })
                            .to(
                              loop,
                              { timeScale: 1, duration: 1, ease: 'power2.in' },
                              '+=1'
                            );
                    },
                });
            };

            if (document.readyState === "complete") {
                createTweens();
            } else {
                window.addEventListener('load', createTweens);
                return () => document.removeEventListener('load', createTweens);
            }
        },
        {
          scope: ref,
        }
    );

    return (
        <Flex flexDirection="row" sx="height: 100vh">
            <Flex sx={{ flex: 1 }}>
                &nbsp;
            </Flex>
            <Flex flexDirection="column" sx={{ flex: 6, height: "100%" }}>
                <Flex direction="row" sx={{ flex: 1, gap: 3 }}>
                    <Typography variant="h1">
                        Bonner Brauschau
                    </Typography>
                    <Typography variant="h1" sx={{ color: primary }}>
                        2024
                    </Typography>
                </Flex>
                <Flex flexDirection="column" sx={{ flex: 8, overflow: "hidden", boxShadow: "inset 1em 1em 1.4em 1.4em rgba(0, 0, 0, 0.1)" }} ref={ref} className="container">
                    {beers.map((beer) => (
                        <Stack key={beer.id} spacing={2} sx={{ padding: 2 }} className="beer">
                            <Stack>
                                <Stack
                                    direction="row"
                                    sx={{ gap: '0', alignItems: 'flex-start', justifyContent: "space-between", padding: "4em 1em" }}
                                >
                                    <Stack direction="row" sx={{ alignItems: 'flex-start', gap: 5 }}>
                                        <Typography variant="h1" sx={{ color: primary }}>
                                            <div style={{ whiteSpace: 'nowrap' }}>{beer.place}</div>
                                        </Typography>
                                        <Stack direction="column" gap={1}>
                                            <Typography variant="h1" sx={{ marginRight: '0.8em' }}>
                                                {beer.name}
                                            </Typography>
                                            <Stack direction="row" gap={1}>
                                            <Typography variant="h3" sx={{ paddingLeft: "0.3em" }}>von</Typography>
                                            <Typography variant="h3" sx={{ color: primary }}>
                                                {beer.user}
                                            </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Typography variant="h1" sx={{ color: '#777', textAlign: "right" }}>
                                        {beer.style}
                                    </Typography>
                                </Stack>
                            </Stack>
                            {/*
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
                            */}
                        </Stack>
                    ))}
                </Flex>
                <Flex direction="row" sx={{ flex: 1, gap: 3 }}>
                    <Typography variant="h1">
                        mich gibt's auch als:
                    </Typography>
                    <Typography variant="h1" sx={{ color: primary }}>
                        app.bonner-brauschau.de
                    </Typography>
                </Flex>
            </Flex>
            <Flex sx={{ flex: 1 }}>
                &nbsp;
            </Flex>
      </Flex>
  );
}

function Content() {
    const db = useDB();
    const { isLoading, data } = db.useQuery({ beers: { groups: {} } });
    let beers = data?.beers ?? [];
    beers.sort((a, b) => {
        const placeA = parseInt(a.place.split('-')[0]);
        const placeB = parseInt(b.place.split('-')[0]);
        return placeA - placeB;
    });
    // only first 10
    // beers = beers.slice(19, 24);

    return beers?.length ? <Content_ beers={beers} /> : <></>;
}

export default Content;
