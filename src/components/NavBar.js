import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import CartWidget from "./CartWidget"
import { useNavigate, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDocs, collection, getFirestore } from "firebase/firestore"
import { auth, signInWithGoogle, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleIcon from '@mui/icons-material/Google';
import { Alert, alpha, styled } from '@mui/material'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const pages = ['About Us']

const ResponsiveAppBar = ({ itemQuantity }) => {
    const [user, loading] = useAuthState(auth);
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [categorias, setCategorias] = useState(null)
    const navigate = useNavigate()

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    useEffect(() => {
        if (loading) {
            return;
        }
    }, [user, loading]);

    // IMPORT CATEGORIES FROM FIREBASE
    async function getCategorias() {
        const db = getFirestore()
        const itemsCollection = collection(db, "categories")
        getDocs(itemsCollection).then((snapshot) => {
            setCategorias(snapshot.docs.map(doc => doc.data().categories))
        })
    }

    // LOGOUT AND REDIRECT TO /
    const logoutAndRedirect = () => {
        logout()
        navigate(`/`)
    }

    useEffect(() => {
        getCategorias()
    }, [])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar position="static" sx={{ bgcolor: "black", paddingLeft: 0, paddingRight: 5 }}>
            <Container maxWidth="100%">
                <Toolbar disableGutters>
                    <NavLink to={`/`}><img src="/thinkLogo.png" width={100} alt="logoThink"></img></NavLink>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        THINK DIFFERENT
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                            {categorias && categorias[0].map((categoria) => (
                                <NavLink style={{ textDecoration: 'none', fontWeight: 'bold' }} key={categoria} to={`/category/${categoria}`}>
                                    <Button
                                        variant="outlined" color="error"
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, mx: 3, color: 'black', display: 'block' }}
                                    >
                                        {categoria}
                                    </Button>
                                </NavLink>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: "auto", marginRight: "auto" }}>
                        {categorias && categorias[0].map((categoria) => (
                            <NavLink style={{ textDecoration: 'none', fontWeight: 'bold' }} key={categoria} to={`/category/${categoria}`}>
                                <Button
                                    variant="outlined" color="error"
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, mx: 3, color: 'white', display: 'block' }}
                                >
                                    {categoria}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                    <Search sx={{marginRight: 5}}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <CartWidget itemQuantity={itemQuantity} />
                    {user ? <Alert variant="outlined" sx={{ color: 'white', marginRight: 2 }} color="error" severity="success">
                        Welcome {user.email}
                    </Alert> : ''}
                    {user ?
                        <div>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src={user.photoURL} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <NavLink style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }} to={`/orders/${user.uid}`} onClick={handleCloseUserMenu}>
                                        <MenuItem key='orders' onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">Orders</Typography>
                                        </MenuItem>
                                    </NavLink>
                                    <MenuItem key='logout' onClick={logoutAndRedirect}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </div>
                        : <Button onClick={signInWithGoogle} color="error" variant="contained" endIcon={<GoogleIcon />}>
                            Login with Google
                        </Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar