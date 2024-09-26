import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Content from './Content';

function App() {
    return (
        <>
            <CssBaseline />
            <Content />
        </>
   );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
