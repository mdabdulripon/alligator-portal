import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";


interface Props {
    product: Product;
}

export default function ProductCard({product} : Props) {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    function handleAddItem(productId: number) {
        setLoading(true);
        agent.basket.addItem(productId)
            .then(b => dispatch(setBasket(b)))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    return (
        <Card>
            <CardHeader
                avatar= {
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps = {{
                    sx: { fontWeight: 'bold', color: 'primary.main'}
                }}      
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor:'primary.light'}}
                image={product.pictureUrl}
             title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color="text.secondary" variant="h5">
                    ${(product.price).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.productCategory} / {product.productType}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton size="small" variant='outlined' loading={loading} onClick={() => handleAddItem(product.id)}>Add to Cart</LoadingButton>
                <Button size="small" variant='outlined'  component={Link} to={`/catalog/${product.id}`} >View</Button>
            </CardActions>
        </Card>
    )
}