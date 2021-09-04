import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Chip } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { setCurrentProduct } from '../store/actions/ui';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Fab from '@material-ui/core/Fab';
import { addFavoriteThunk } from '../store/actions/favorites';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        position: 'relative'
    },
    nameAndPrice: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    catChip: {
        margin: '0.5em 0.5em 0 0'
    },
    favorite: {
        position: 'absolute',
        zIndex: 2,
        top: '0.5em',
        right: '0.5em'
    }
})

// TODO: Test - make sure this actually looks and functions right
const ProductCard = (props) => {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    const categories = useSelector(state => state.categories.dict);
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    const handleClick = e => {
        dispatch(setCurrentProduct(props.product.id));
    }

    const handleFavorite = productId => {
        dispatch(addFavoriteThunk(productId));
    }

    return (
        <Card onClick={handleClick} className={classes.root} component={NavLink} to={`/products/${props.product.id}`}>
            <Fab className={classes.favorite}>
                {favorites.includes(props.product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Fab>
            <CardActionArea >
                <CardMedia
                    component="img"
                    alt={props.product.name}
                    image={props.product.images[0]}
                    title={props.product.name}
                />
                {user
                    ? <Fab onClick={() => handleFavorite(props.product.id)} className={classes.favorite}>
                        <FavoriteIcon />
                    </Fab> : ''}
                <CardContent>
                    <div className={classes.nameAndPrice}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.product.name}
                        </Typography>
                        <Typography color='textSecondary' variant="h6" component="h3">
                            {`${props.product.price.toFixed(2)}`}
                        </Typography>
                    </div>
                    <Rating precision={0.1} value={props.product.reviews.reduce((acc, el) => acc + el.rating) / props.product.reviews.length} readOnly />
                </CardContent>
                <CardActions className={classes.actionArea}>
                    <div>
                        {props.product.categories.map(cat => (
                            <Chip size='small' className={classes.catChip} label={cat.name} key={`category-${cat.id}`} />
                        ))}
                    </div>
                    <div>
                    </div>
                </CardActions>
                {/* </CardContent> */}
            </CardActionArea>
        </Card>
    );
}

export default ProductCard;
