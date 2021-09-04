import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { setCurrentCategory } from '../store/actions/ui';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "nowrap"
    },
    category: {
        margin: "0.5em",
        padding: "0.5em",
        backgroundColor: "green",
        color: "white",
        textDecoration: "none",
        borderRadius: '1em'
    }
}));

const CategoryChoiceBar = (props) => {
    const classes = useStyles();
    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();

    const handleClick = id => {
        dispatch(setCurrentCategory(id));
    }

    // TODO : Change Paper to Chip and use Pagination to view ones that don't fit
    return (
        <div className={classes.root}>
            {categories.ids.map(id => (
                <Paper
                    className={classes.category}
                    component={NavLink}
                    onClick={() => handleClick(id)}
                    to={`/categories/${id}`}
                    key={`category-${id}`}
                >
                    <Typography>{categories.dict[id].name}</Typography>
                </Paper>
            ))}
        </div>
    );
}

export default CategoryChoiceBar;
