import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import BasketPage from "../../features/basket/BasketPage";
import { setBasket } from "../../features/basket/basketSlice";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import agent from "../api/agent";
import NotFound from "../errors/NotFound";
import { useAppDispatch } from "../store/configureStore";
import { getCookie } from "../util/util";
import Header from "./Header";
import Loading from "./Loading";

function App() {

	const dispatch = useAppDispatch();
	const [loading,setLoading] = useState(true);
	
	useEffect(() => {
		const buyerId = getCookie('buyerId');
		if(buyerId) {
			agent.basket.get()
				.then( basket => dispatch(setBasket(basket)))
				.catch(err => console.log(err))
				.finally(() => setLoading(false))
		} else {
			setLoading(false);
		}
	}, [dispatch]);


	const [darkMode, setDarkMode] = useState(false);
	const paletteType = darkMode ? 'dark' : 'light';

	const theme = createTheme({
		palette: {
			mode: paletteType,
			background: {
				default: paletteType === 'light' ? '#EAEAEA' : '#121212'
			}
		}
	})

	function handleThemeChange() {
		setDarkMode(!darkMode)
	}


	if (loading) return <Loading message='Initializing app...'/>

	return (
		<ThemeProvider theme={theme} >
			<CssBaseline />
			<Header darkMode={darkMode} handleThemeChange={handleThemeChange}  />
			<Container>
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/catalog' component={Catalog} />
					<Route path='/catalog/:id' component={ProductDetails} />
					<Route path='/about' component={AboutPage} />
					<Route path='/contact' component={ContactPage} />
					<Route path='/basket' component={BasketPage} />
					<Route path='/checkout' component={CheckoutPage} />
					<Route component={NotFound} />
				</Switch>
			</Container>
		</ThemeProvider>
	);
}

export default App;
