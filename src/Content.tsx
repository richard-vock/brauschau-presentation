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

import { CenteredFlexBox, Flex, FullSizeCenteredFlexBox, Logo } from '@/components/styled';
import verticalLoop from '@/utils/verticalLoop';

import gsiLogo from '@/logos/2026/gsi_Logo_RGB.png';

import braumischungLogo from '@/logos/2026/bbm_de-logo18_braun_pfade.png';
import gbcuLogo from '@/logos/2026/GBCU loho.png';
import brenneckeLogo from '@/logos/2026/2022-brennecke-logo-schwarz-300_150.jpg';
import cccLogo from '@/logos/2026/CCC.png';
import reschLogo from '@/logos/2026/logo resch svg.svg';
import biersommelierLogo from '@/logos/2026/biersommelier hilbrandt.png';
import braupartnerLogo from '@/logos/2026/Logo_Braupartner_Farbe.png';
import braumarktLogo from '@/logos/2026/braumarkt.svg';
import pfalzmalzLogo from '@/logos/2026/pfalzmalz.png';

import braubeboLogo from '@/logos/2026/BrauBeBo Logo.png';
import alemaniaLogo from '@/logos/2026/Plato_Ale Mania.png';
import biertastingLogo from '@/logos/2026/Biertasting Bonn.png';
import brauwerkstattLogo from '@/logos/2026/RZ_brauwerkstatt_logo.jpg';
import hdwLogo from '@/logos/2026/HdW_Hipster_schwarz_seit2011.png';
import beerolutionLogo from '@/logos/2026/beerolution_Logo_600-250x59.jpg';
import holyCraftLogo from '@/logos/2026/Holy craft beer shop.jpg';
import ireksLogo from '@/logos/2026/IREKS.png';

import useTheme from '@/store/theme';
import useDB from '@/hooks/useDB';

gsap.registerPlugin(Observer);
const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const Content_: FC<{ beers: any[] }> = ({ beers }) => {
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
		<Flex flexDirection="row" sx={{ height: "100vh" }}>
			<Flex sx={{ flex: 0, flexDirection: "column", justifyContent: "space-between", padding: "20px 20px", backgroundColor: "white" }}>
				<Logo src={braumischungLogo} />
				<Logo src={gbcuLogo} />
				<Logo src={brenneckeLogo} />
				<Logo src={cccLogo} />
				<Logo src={reschLogo} />
				<Logo src={biersommelierLogo} />
				<Logo src={braupartnerLogo} />
				<Logo src={braumarktLogo} />
				<Logo src={pfalzmalzLogo} />
			</Flex>
			<Flex flexDirection="column" sx={{ flex: 1, height: "100%" }}>
				<Flex sx={{ flex: 0, flexDirection: "row", gap: 3, backgroundColor: "white", alignItems: "center", justifyContent: "space-between", padding: "20px 10px" }}>
					<Flex sx={{ flex: 1, flexDirection: "row", gap: 3, backgroundColor: "white", alignItems: "center" }}>
						<Typography variant="h3">
							Bonner Brauschau
						</Typography>
						<Typography variant="h3" sx={{ color: primary }}>
							2026
						</Typography>
					</Flex>
					<Logo src={gsiLogo} />
				</Flex>
				<Flex flexDirection="column" sx={{ flex: 1, overflow: "hidden", boxShadow: "inset 1em 1em 1.4em 1.4em rgba(0, 0, 0, 0.1)" }} ref={ref} className="container">
					{beers.map((beer) => (
						<Stack key={beer.id} spacing={2} sx={{ padding: 2 }} className="beer">
							<Stack>
								<Stack
									direction="row"
									sx={{ gap: '0', alignItems: 'flex-start', justifyContent: "space-between", padding: "4em 1em" }}
								>
									<Stack direction="row" sx={{ alignItems: 'flex-start', gap: 5 }}>
										<Typography variant="h3" sx={{ color: primary }}>
											<div style={{ whiteSpace: 'nowrap' }}>{beer.place}</div>
										</Typography>
										<Stack direction="column" gap={1}>
											<Typography variant="h3" sx={{ marginRight: '0.8em' }}>
												{beer.name}
											</Typography>
											<Stack direction="row" gap={1}>
												<Typography variant="h4" sx={{ paddingLeft: "0.1em" }}>von</Typography>
												<Typography variant="h4" sx={{ color: primary }}>
													{beer.user}
												</Typography>
											</Stack>
										</Stack>
									</Stack>
									<Typography variant="h3" sx={{ color: '#777', textAlign: "right" }}>
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
				<Flex sx={{ flex: 0, flexDirection: "row", gap: 6, backgroundColor: "white", alignItems: "center", padding: "20px 10px" }}>
					<Typography variant="h5">
						Mich gibt's auch für's Handy:
					</Typography>
					<Typography variant="h5" sx={{ color: primary }}>
						app.bonner-brauschau.de
					</Typography>
				</Flex>
			</Flex>
			<Flex sx={{ flex: 0, flexDirection: "column", justifyContent: "space-between", padding: "20px 20px", backgroundColor: "white" }}>
				<Logo src={braubeboLogo} />
				<Logo src={alemaniaLogo} />
				<Logo src={biertastingLogo} />
				<Logo src={brauwerkstattLogo} />
				<Logo src={hdwLogo} />
				<Logo src={beerolutionLogo} />
				<Logo src={holyCraftLogo} />
				<Logo src={ireksLogo} />
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
