import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";

export default function BasketPage() {

	const [loading, setLoading] = useState(false);
	const { basket, setBasket, removeItem } = useStoreContext();

	function handleAddItem(productId: number) {
		setLoading(true);
		agent.basket.addItem(productId)
			.then(b => setBasket(b))
			.catch(err => console.log(err))
			.finally(() => setLoading(false));
	}

	function handleRemoveItem(productId: number, quantity = 1) {
		setLoading(true);
		agent.basket.removeItem(productId, quantity)
			.then(() => removeItem(productId, quantity))
			.catch(err => console.log(err))
			.finally(() => setLoading(false));
	}
		
	if (!basket || basket.items.length === 0) return <Typography>Your basket is empty</Typography>
	
	return (
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
						<TableCell component="th" scope="row">
							<Box display='flex' alignItems='center'>
								<img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20}} />
								<span>{ item.name }</span>
							</Box>
						</TableCell>
						<TableCell align="right">{(item.price).toFixed(2)}</TableCell>
						<TableCell align="right">
							<LoadingButton color='error' loading={loading} onClick={() => handleRemoveItem(item.productId)}>
								<Remove />
							</LoadingButton>
							<span>{item.quantity}</span>
							<LoadingButton color='primary' loading={loading} onClick={() => handleAddItem(item.productId)}>
								<Add />
							</LoadingButton>
						</TableCell>
						<TableCell align="right">{(item.price * item.quantity).toFixed(2)}</TableCell>
						<TableCell align="right">
							<LoadingButton color='error' loading={loading} onClick={() => handleRemoveItem(item.productId, item.quantity)}>
								<Delete />
							</LoadingButton>
						</TableCell>
					</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
} 