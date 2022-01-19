import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {

	const { basket, status }  = useAppSelector(state => state.basket);
	const dispatch = useAppDispatch();

	if (!basket || basket.items.length === 0) return <Typography>Your basket is empty</Typography>
	
	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Product</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="right">Quantity</TableCell>
							<TableCell align="right">Subtitle</TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{basket.items.map((item) => (
						<TableRow
							key={item.productId}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">{ item.name }</TableCell>
							<TableCell align="right">{(item.price).toFixed(2)}</TableCell>
							<TableCell align="right">
								<LoadingButton color='error' loading={status === 'pendingRemoveItem' + item.productId + 'rem'}
									onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: 1, name: 'rem' }))}>
									<Remove />
								</LoadingButton>
								<span>{item.quantity}</span>
								<LoadingButton color='primary' loading={status === 'pendingAddItem' + item.productId}
									onClick={() => dispatch(addBasketItemAsync({productId: item.productId }))}>
									<Add />
								</LoadingButton>
							</TableCell>
							<TableCell align="right">{(item.price * item.quantity).toFixed(2)}</TableCell>
							<TableCell align="right">
								<LoadingButton color='error' loading={status === 'pendingRemoveItem' + item.productId + 'del' }
									onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity, name: 'del'}))}>
									<Delete />
								</LoadingButton>
							</TableCell>
						</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Grid container>
				<Grid item xs={6}></Grid>
				<Grid item xs={6}>
					<BasketSummary />
					<Button variant='contained' size='large' fullWidth component={Link} to='/checkout'>Checkout</Button>
				</Grid>
			</Grid>
		</>
		
	)
} 