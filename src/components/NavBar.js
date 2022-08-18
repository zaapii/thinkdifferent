import * as React from 'react'
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
import {NavLink} from 'react-router-dom'
import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { CartContext } from '../CartContext'

const pages = ['Sobre Nosotros']
const settings = ['Perfil', 'Pedidos', 'Logout']

const ResponsiveAppBar = ({itemQuantity}) => {

    async function getCategorias () {
        await axios(`https://dummyjson.com/products/categories`)
            .then((response) => {
                setCategorias(response.data.splice(0, 3))
            })
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const [categorias, setCategorias] = useState(null)

    const {clearCart} = useContext(CartContext)

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
        <AppBar position="static" sx={{bgcolor: "black", paddingLeft: 0, paddingRight: 5}}>
            <Container maxWidth="100%">
                <Toolbar disableGutters>
                    <NavLink to={`/`}><img src="/thinkLogo.png" width={100}></img></NavLink>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        THINK DIFFERENT
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
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
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 1, ml: 3, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, mx: 1, color: 'white', display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {categorias?.map((categoria) => (
                            <NavLink style={{textDecoration: 'none', fontWeight: 'bold'}} key={categoria} to={`/category/${categoria}`}>
                                <Button
                                    variant="outlined" color="error"
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, mx: 3, color: 'white', display: 'block'}}
                                >
                                    {categoria}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                    <CartWidget itemQuantity={itemQuantity} />
                    <Button sx={{mx: 1}} variant="outlined" color="error" size="small" onClick={clearCart}>Clear cart</Button>
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="https://media-exp1.licdn.com/dms/image/C4D03AQE4qtQl1xQMIg/profile-displayphoto-shrink_200_200/0/1646871543176?e=2147483647&v=beta&t=2GrSH4B3cAUiiXgT9xZhfn77kCMgDcAQl0_4nLDuMEU" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar