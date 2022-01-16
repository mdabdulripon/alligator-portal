import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import Loading from "../../app/layout/Loading";
import AppPagination from "../../app/shared/AppPagination";
import CheckboxButtonGroup from "../../app/shared/CheckboxButtonGroup";
import RadioButtonGroup from "../../app/shared/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";


const sortOptions = [
	{ value: 'name', label: 'Alphabetical' },
	{ value: 'priceDesc', label: 'Price - High to low' },
	{ value: 'price', label: 'Price - Low to high' },
]

export default function Catalog() {
	const products = useAppSelector(productSelectors.selectAll);
	const { productsLoaded, status, filtersLoaded, categories, types, productParams, pagination } = useAppSelector(state => state.catalog);
	const dispatch = useAppDispatch();
	
	useEffect(() => {
	if(!productsLoaded) dispatch(fetchProductsAsync());
	}, [productsLoaded, dispatch])

	// ?? TO prevent double loading we have individual useEffect.
	useEffect(() => {
	if (!filtersLoaded) dispatch(fetchProductFilters());
	}, [dispatch, filtersLoaded])

	if (status.includes('pending') || !pagination) return <Loading message='Loading Products...' />
	// if(products.length === 0) return <Typography variant='h3'>Product not Found</Typography>

	return(
		<Grid container columnSpacing={4}>

			<Grid item xs={3}>
				<Paper sx={{ mb: 2, p: 2}}>
					<ProductSearch />
				</Paper>
				
				<Paper sx={{ mb: 2, p: 2}}>
					<RadioButtonGroup 
						selectedValue={productParams.orderBy}
						options={sortOptions} 
						onChange={(event) => dispatch(setProductParams({ orderBy: event.target.value}))}/>
				</Paper>
				
				<Paper sx={{ mb: 2, p: 2}}>
					<CheckboxButtonGroup 
						items={categories}
						selectedItems={productParams.categories}
						onChange={(items: string[]) => dispatch(setProductParams({categories: items}))}
					/>
				</Paper>

				<Paper sx={{ mb: 2, p: 2}}>
					<CheckboxButtonGroup 
						items={types}
						selectedItems={productParams.types}
						onChange={(items: string[]) => dispatch(setProductParams({types: items}))}
					/>
				</Paper>

			</Grid>
			<Grid item xs={9}>
				<ProductList products={products} />
			</Grid>

		
			<Grid item xs={3} />
			<Grid item xs={9} sx={{mb: 5}}>
				<AppPagination 
					pagination={pagination} 
					onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
				/>
			</Grid>
		</Grid>
	)
}

