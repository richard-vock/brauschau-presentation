import ThemeIcon from '@mui/icons-material/InvertColors';
// import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import { FlexBox } from '@/components/styled';
import { title } from '@/config';
// import useSidebar from '@/store/sidebar';
import useTheme from '@/store/theme';

function Header() {
  // const [, sidebarActions] = useSidebar();
  const [theme, themeActions] = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }} data-pw={`theme-${theme}`}>
      <AppBar color="transparent" elevation={1} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ alignItems: 'center' }}>
            {/*
            <IconButton
              onClick={sidebarActions.toggle}
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 1, color: '#faaf00' }}
            >
              <MenuIcon />
            </IconButton>
            */}
            <Button sx={{ color: '#faaf00' }}>{title}</Button>
          </FlexBox>
          <FlexBox>
            <Tooltip title="Switch theme" arrow>
              <IconButton
                sx={{ color: '#faaf00' }}
                edge="end"
                size="large"
                onClick={themeActions.toggle}
                data-pw="theme-toggle"
              >
                <ThemeIcon />
              </IconButton>
            </Tooltip>
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
