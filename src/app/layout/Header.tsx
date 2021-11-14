import { AppBar, Container, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}


export default function Header({darkMode, handleThemeChange}: Props) {
    return(
        <AppBar position="static" sx={{mb: 4}}>
            <Container>
                <Toolbar>
                    <Typography variant='h6'>
                        Alligator Store
                    </Typography>   
                    <Switch color="secondary" checked={darkMode} onChange={handleThemeChange}/>
                </Toolbar>
            </Container>
        </AppBar>
    )
} 