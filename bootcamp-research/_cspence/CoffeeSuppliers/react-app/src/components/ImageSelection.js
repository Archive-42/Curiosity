import { GridList, GridListTile, makeStyles } from '@material-ui/core';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '45vw',
        marginLeft: '10em'
    },
    smImgs: {
        width: '20%'
    }
}));

const ImageSelection = (props) => {
    const classes = useStyles()
    const products = useSelector(state => state.products);
    const ui = useSelector(state => state.ui);
    const [image, setImage] = useState(products.dict[ui.currentProduct].images[0]);

    return (
        <div className={classes.root}>
            <img src={image} alt={products.dict[ui.currentProduct].name} />
            <GridList cols={5}>
                {products.dict[ui.currentProduct].images.map((image, i) => (
                    <GridListTile key={`image-${i}`}>
                        <img src={image} alt={`product image ${i}`} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default ImageSelection;
