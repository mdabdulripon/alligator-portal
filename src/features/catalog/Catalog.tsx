import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";


const sortOptions = [
	{ value: 'name', label: 'Alphabetical' },
	{ value: 'priceDesc', label: 'Price - High to low' },
	{ value: 'price', label: 'Price - Low to high' },
]

export default function Catalog() {
	const products = useAppSelector(productSelectors.selectAll);
	const { productsLoaded, status, filtersLoaded, categories, types } = useAppSelector(state => state.catalog);
	const dispatch = useAppDispatch();
	
	useEffect(() => {
	if(!productsLoaded) dispatch(fetchProductsAsync());
	}, [productsLoaded, dispatch])

	// ?? TO prevent double loading we have individual useEffect.
	useEffect(() => {
	if (!filtersLoaded) dispatch(fetchProductFilters());
	}, [dispatch, filtersLoaded])

	if (status.includes('pending')) return <Loading message='Loading Products...' />
	if(products.length === 0) return <Typography variant='h3'>Product not Found</Typography>

	return(
		<Grid container spacing={4}>

			<Grid item xs={3}>
				<Paper sx={{ mb: 2, p: 2}}>
					<TextField 
						label='Search product...'
						variant='outlined'
						fullWidth
					/>
				</Paper>
				
				<Paper sx={{ mb: 2, p: 2}}>
					<FormControl component="fieldset">
						<RadioGroup>
							{sortOptions.map( ({ value, label}) => (
								<FormControlLabel value={value} control={<Radio />} label={label} key={value} />
							))}
						</RadioGroup>
					</FormControl>
				</Paper>
				
				<Paper sx={{ mb: 2, p: 2}}>
					<FormGroup>
						{ categories.map( cat => (
							<FormControlLabel control={<Checkbox />} label={cat} key={cat} />
						))}
					</FormGroup>
				</Paper>

				<Paper sx={{ mb: 2, p: 2}}>
					<FormGroup>
						{ types.map( type => (
							<FormControlLabel control={<Checkbox />} label={type} key={type} />
						))}
					</FormGroup>
				</Paper>

			</Grid>
			<Grid item xs={9}>
				<ProductList products={products} />
			</Grid>

		
			<Grid item xs={3} />
			<Grid item xs={9}>
				<Box display='flex' justifyContent='space-between' alignItems='center'>
					<Typography>Displaying 1-6 of 20 items</Typography>
					<Pagination color="standard" size="large" count={10} page={2} />
				</Box>
			</Grid>
		</Grid>
	)
}

