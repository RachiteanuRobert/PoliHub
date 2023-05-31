import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { AppRoute } from 'routes';
import { useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from '@application/store';
import { Grid } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { resetProfile } from '@application/state-slices';
import { useAppRouter } from '@infrastructure/hooks/useAppRouter';
import { useOwnUserHasRole } from '@infrastructure/hooks/useOwnUser';
import { UserRoleEnum } from '@infrastructure/apis/client';
import { NavbarLanguageSelector } from '@presentation/components/ui/NavbarLanguageSelector/NavbarLanguageSelector';

/**
 * This is the navigation menu that will stay at the top of the page.
 */
export const Navbar = () => {
  const { formatMessage } = useIntl();
  const { loggedIn } = useAppSelector((x) => x.profileReducer);
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { redirectToHome } = useAppRouter();
  const logout = () => {
    dispatch(resetProfile());
    redirectToHome();
  };

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: 'white',
                  width: '100%',
                  padding: '0 10%',
                }}
            >
              <Grid container item direction="column" xs={1}>
                <Link to={AppRoute.Index}>
                  <div
                      style={{
                        background: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '180px',
                        height: '80px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                      }}
                  >
                    <img
                        src="public/PoliHub_Logo.png"
                        alt="Logo"
                        style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </Link>
              </Grid>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    color="inherit"
                    aria-controls="menu"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                >
                  <MenuIcon />
                </Button>
                <Menu
                    id="menu"
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                >
                  <MenuItem>
                    <Link style={{ color: 'black', textDecoration: 'none' }} to={AppRoute.Users}>
                      {formatMessage({ id: 'globals.users' })}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link style={{ color: 'black', textDecoration: 'none' }} to={AppRoute.Subjects}>
                      {formatMessage({ id: 'globals.subjects' })}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link style={{ color: 'black', textDecoration: 'none' }} to={AppRoute.Courses}>
                      {formatMessage({ id: 'globals.courses' })}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link style={{ color: 'black', textDecoration: 'none' }} to={AppRoute.Laboratories}>
                      {formatMessage({ id: 'globals.laboratories' })}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link style={{ color: 'black', textDecoration: 'none' }} to={AppRoute.CourseInstances}>
                      {formatMessage({ id: 'globals.courseInstances' })}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link style={{ color: 'black', textDecoration: 'none' }} to={AppRoute.LaboratoryInstances}>
                      {formatMessage({ id: 'globals.laboratoryInstances' })}
                    </Link>
                  </MenuItem>
                </Menu>
                {!loggedIn && (
                    <Button color="inherit">
                      <Link style={{ color: 'white' }} to={AppRoute.Login}>
                        {formatMessage({ id: 'globals.login' })}
                      </Link>
                    </Button>
                )}
                {!loggedIn && (
                    <Button color="inherit">
                      <Link style={{ color: 'white' }} to={AppRoute.Register}>
                        {formatMessage({ id: 'globals.register' })}
                      </Link>
                    </Button>
                )}
                {loggedIn && (
                    <Button onClick={logout} color="inherit">
                      {formatMessage({ id: 'globals.logout' })}
                    </Button>
                )}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
  );
};
