import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import Loading from "../../app/layout/Loading";
import AppPagination from "../../app/shared/AppPagination";
import CheckboxButtonGroup from "../../app/shared/CheckboxButtonGroup";
import RadioButtonGroup from "../../app/shared/RadioButtonGroup";
import SearchAndSelect from "../../app/shared/SearchAndSelect";
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
	const { productsLoaded, filtersLoaded, categories, types, productParams, pagination } = useAppSelector(state => state.catalog);
	const dispatch = useAppDispatch();
	
	useEffect(() => {
	if(!productsLoaded) dispatch(fetchProductsAsync());
	}, [productsLoaded, dispatch])

	// ?? TO prevent double loading we have individual useEffect.
	useEffect(() => {
		if (!filtersLoaded) dispatch(fetchProductFilters());
	}, [dispatch, filtersLoaded])

	function handleItemSelection(items: any): void {
        console.log("🚀 ~ file: Catalog.tsx ~ line 35 ~ handleItemSelection ~ items", items)
	}


	if (!filtersLoaded) return <Loading message='Loading Products...' />

	return(
		<Grid container columnSpacing={4}>

			<Grid item xs={3}>
				<Paper sx={{ mb: 2, p: 2}}>
					<SearchAndSelect 
						items={items}
						multipleSelection={true}
						closeOnSelect={true}
						onChange={(items: string[]) => handleItemSelection(items)}
					/>
				</Paper>
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
				{pagination && 
					<AppPagination 
						pagination={pagination} 
						onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
					/>
				}
			</Grid>
		</Grid>
	)
}



const items = [
	{ title: 'The Shawshank Redemption', year: 1994 },
	{ title: 'The Godfather', year: 1972 },
	{ title: 'The Godfather: Part II', year: 1974 },
	{ title: 'The Dark Knight', year: 2008 },
	{ title: '12 Angry Men', year: 1957 },
	{ title: "Schindler's List", year: 1993 },
	{ title: 'Pulp Fiction', year: 1994 },
	{ title: 'The Lord of the Rings: The Return of the King', year: 2003 },
	{ title: 'The Good, the Bad and the Ugly', year: 1966 },
	{ title: 'Fight Club', year: 1999 },
	{ title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
	{ title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
	{ title: 'Forrest Gump', year: 1994 },
	{ title: 'Inception', year: 2010 },
	{ title: 'The Lord of the Rings: The Two Towers', year: 2002 },
	{ title: "One Flew Over the Cuckoo's Nest", year: 1975 },
	{ title: 'Goodfellas', year: 1990 },
	{ title: 'The Matrix', year: 1999 },
	{ title: 'Seven Samurai', year: 1954 },
	{ title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
	{ title: 'City of God', year: 2002 },
	{ title: 'Se7en', year: 1995 },
	{ title: 'The Silence of the Lambs', year: 1991 },
	{ title: "It's a Wonderful Life", year: 1946 },
	{ title: 'Life Is Beautiful', year: 1997 },
	{ title: 'The Usual Suspects', year: 1995 },
	{ title: 'Léon: The Professional', year: 1994 },
	{ title: 'Spirited Away', year: 2001 },
	{ title: 'Saving Private Ryan', year: 1998 },
	{ title: 'Once Upon a Time in the West', year: 1968 },
	{ title: 'American History X', year: 1998 },
	{ title: 'Interstellar', year: 2014 },
];



