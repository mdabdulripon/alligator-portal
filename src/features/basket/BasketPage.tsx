import { Add, Delete, Remove } from "@mui/icons-material";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";

export default function BasketPage() {

	const { basket, setBasket, removeItem } = useStoreContext();

	function handleAddItem(productId: number) {
		agent.basket.addItem(productId)
			.then(b => setBasket(b))
			.catch(err => console.log(err))
	}

	function handleRemoveItem(productId: number, quantity = 1) {
		agent.basket.removeItem(productId, quantity)
			.then(() => removeItem(productId, quantity))
			.catch(err => console.log(err))
	}
		

	if(!basket) return <Typography>Your basket is empty</Typography>

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
							<IconButton color='error' onClick={() => handleRemoveItem(item.productId)}>
								<Remove />
							</IconButton>
							<span>{item.quantity}</span>
							<IconButton color='primary' onClick={() => handleAddItem(item.productId)}>
								<Add />
							</IconButton>
						</TableCell>
						<TableCell align="right">{(item.price * item.quantity).toFixed(2)}</TableCell>
						<TableCell align="right">
							<IconButton color='error' onClick={() => handleRemoveItem(item.productId, item.quantity)}>
								<Delete />
							</IconButton>
						</TableCell>
					</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
} 