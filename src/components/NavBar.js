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
import { Alert } from '@mui/material'

const pages = ['Sobre Nosotros']

const ResponsiveAppBar = ({ itemQuantity }) => {
    const [user, loading] = useAuthState(auth);
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [categorias, setCategorias] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) {
            return;
        }
    }, [user, loading]);
    async function getCategorias() {
        const db = getFirestore()

        const itemsCollection = collection(db, "categories")

        getDocs(itemsCollection).then((snapshot) => {
            setCategorias(snapshot.docs.map(doc => doc.data().categories))
        })
    }

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
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, ml: 3, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
                    <CartWidget itemQuantity={itemQuantity} />
                    {user ? <Alert variant="outlined" sx={{color: 'white', marginRight: 2}} color="error" severity="success">
                        Bienvenido {user.email}
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