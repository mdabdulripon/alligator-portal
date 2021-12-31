import { Typography } from "@mui/material";
import { useEffect } from "react";
import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";


export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productLoaded, status } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
      if(!productLoaded) {
        dispatch(fetchProductsAsync());
      }
    }, [productLoaded, dispatch])

    if (status.includes('pending')) return <Loading message='Loading Products...' />
    if(products.length === 0) return <Typography variant='h3'>Product not Found</Typography>

    return(
        <>
            <ProductList products={products} />
        </>
    )
}