import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles(theme => ({
  myCard: {
    margin: '20px 0'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}));

const MyCard = (props) => {
  const classes = useStyles();
  return (
    <Card spacing={10} className={classes.myCard}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{props.avatar}</Avatar>}
        title={props.title}
        subheader={props.subheader}
      />
      <CardMedia className={classes.media} image={props.image}></CardMedia>
      <CardContent>{props.children}</CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MyCard;
