import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";


export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
       agent.catalog.list()
        .then(res => setProducts(res))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }, [])

    console.log(products);
    if(loading) return <Typography variant='h3'>Loading...</Typography>
    if(products.length === 0) return <Typography variant='h3'>Product not Found</Typography>

    return(
        <>
            <ProductList products={products} />
        </>
    )
}