// import { useCallback, useMemo } from 'react';
// import { atom, useRecoilState } from 'recoil';
//
// import { notifications as notificationsDefaults } from '@/config';
//
// import { Actions, Beer } from './types';
//
// const beersState = atom<Beer[]>({
//     key: 'beersState',
//     default: [],
// });
//
// function useBeers(): [Beer[], Actions] {
//     const [beers, setBeers] = useRecoilState(beersState);
//
//     const load = useCallback(
//         () => {
//             const loadedBeers = localStorage.getItem('beers') || [];
//             setBeers(loadedBeers);
//         },
//         [setBeers],
//     );
//
//     const actions = useMemo(() => ({ load }), [load]);
//
//     return [beers, actions];
// }
//
// export default useBeers;
