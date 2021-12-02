import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, NavLink } from "react-router-dom";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks =[
    { title: 'Catalog', path: '/catalog'},
    { title: 'About', path: '/about'},
    { title: 'Contact', path: '/contact'},
]

const rightLinks =[
    { title: 'Login', path: '/login'},
    { title: 'Register', path: '/register'},
]

const navStyle = {
    color: 'inherit',
    textDecoration: 'none', 
    '&:hover': {
        color: 'grey.300'
    }, 
    '&.active': {
        color: 'text.primary'
    }  
}

export default function Header({darkMode, handleThemeChange}: Props) {
    return(
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6'  component={NavLink} to='/' sx={navStyle}>
                        Alligator Store
                    </Typography>   
                    <Switch color="secondary" checked={darkMode} onChange={handleThemeChange}/>
                </Box>
                
                <List sx={{display: 'flex'}}>
                    {midLinks.map(({title, path}) => (
                        <ListItem component={NavLink} to={path} key={path} 
                            sx={navStyle}>
                            { title }
                        </ListItem>
                    ))}
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to="/basket" size='large' sx={{color: 'inherit'}}>
                        <Badge badgeContent={4} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    <List sx={{display: 'flex', }}>
                        {rightLinks.map(({title, path}) => (
                            <ListItem component={NavLink} to={path} key={path} sx={navStyle}>
                                { title }
                            </ListItem>
                        ))}
                    </List>    
                </Box>
            </Toolbar>
        </AppBar>
    )
} 