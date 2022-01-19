import { LoadingButton } from "@mui/lab";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import Loading from "../../app/layout/Loading";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
    products: Product[];
}

export default function ProductList({products}: Props) {
    const { productsLoaded} = useAppSelector(state => state.catalog)
    const { status } = useAppSelector(state => state.basket)
    const dispatch = useAppDispatch();

    return (
        <>
            {!productsLoaded ? (
                <Loading message='Loading Products...' />
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className='no-wrap'>Name</TableCell>
                                <TableCell className='no-wrap'>Merchant Name</TableCell>
                                <TableCell className='no-wrap'>Price</TableCell>
                                <TableCell className='no-wrap'>Category</TableCell>
                                <TableCell className='no-wrap'>Types</TableCell>
                                <TableCell className='no-wrap'>Quantity</TableCell>
                                <TableCell className='no-wrap'>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell className='no-wrap'>{row.name}</TableCell>
                                    <TableCell className='no-wrap'>{row.merchantId}</TableCell> 
                                    <TableCell className='no-wrap'>${row.price}</TableCell> 
                                    <TableCell className='no-wrap'>{row.productCategory}</TableCell> 
                                    <TableCell className='no-wrap'>{row.productType}</TableCell> 
                                    <TableCell className='no-wrap'>{row.quantityInStock}</TableCell> 
                                    <TableCell className='no-wrap'>
                                        <LoadingButton className="card-action__btn" size="small" variant='outlined' 
                                            loading={status === 'pendingAddItem' + row.id} sx={{ mr: 2 }}
                                            onClick={() => dispatch(addBasketItemAsync({productId: row.id})) }>
                                            Add</LoadingButton>
                                        <Button className="card-action__btn" size="small" variant='outlined'
                                            component={Link} to={`/catalog/${row.id}`} >View</Button>
                                    </TableCell> 
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}
