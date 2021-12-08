import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import Loading from "../../app/layout/Loading";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "../basket/basketSlice";

export default function ProductDetails() {
    // get the params
    const {basket} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const { id } = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(()=> {
        if(item) setQuantity(item.quantity);
        agent.catalog.details(Number(id))
            .then(res => setProduct(res))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [id, item]);

    function handleInputChange(event: any) {
        if(event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {
        setSubmitting(true);
        if (!item || quantity > item.quantity) {
            const updateQuantity = item ? quantity - item.quantity: quantity;
            agent.basket.addItem(product?.id!, updateQuantity)
                .then(b => dispatch(setBasket(b)))
                .catch(err => console.log(err))
                .finally(() => setSubmitting(false))
        } else {
            const updateQuantity = item.quantity - quantity;
            agent.basket.removeItem(product?.id!, updateQuantity)
                .then(()=> dispatch(removeItem({ productId: product?.id!, quantity: updateQuantity})))
                .catch(err => console.log(err))
                .finally(() => setSubmitting(false));
        }
    }

    if(loading) return <Loading message='Loading Product...'/>
    if(!product) return <NotFound />

    return(
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb: 2}}/>
                <Typography variant='h4' color='secondary'>${(product.price).toFixed(2)}</Typography>

                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Product Type</TableCell>
                                <TableCell>{product.productType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Product Category</TableCell>
                                <TableCell>{product.productCategory}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity In Stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}> 
                        <TextField variant='outlined' type='number' label='Quantity in Cart' 
                            fullWidth onChange={handleInputChange} value={quantity}/>
                    </Grid>
                    <Grid item xs={6}> 
                        <LoadingButton sx={{ height: '55px'}} color='primary' size='large' variant='contained' 
                            fullWidth disabled={(item?.quantity === quantity) || (!item && quantity === 0)} 
                            loading={submitting} onClick={handleUpdateCart}>
                            { item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}