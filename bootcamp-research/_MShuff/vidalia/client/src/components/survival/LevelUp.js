import React, { useContext, useState, useEffect } from 'react';
import { survivalPlayer, levelUpContext } from '../../Context';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import PlayerCard from './PlayerCard';
import generateNewStats from '../../helpers/generateNewStats';
import hpBarChanger from '../../helpers/hpBarChanger';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: 'black',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  buttonStyle: {
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: 'rgb(215, 147, 255, 0.7)',
    },
  },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { playerData, setPlayerData, setCurrentHealth, healthRef, levelRef, levelBool, setLevelBool } = useContext(survivalPlayer);
  const [points, setPoints] = useState(5);
  const [ac, setAc] = useState(playerData[0].armorClass);
  const [charisma, setCharisma] = useState(playerData[0].charisma);
  const [hp, setHp] = useState(playerData[0].hitPoints);
  const [constitution, setConstitution] = useState(playerData[0].constitution)
  const [dex, setDex] = useState(playerData[0].dexterity);
  const [intel, setIntel] = useState(playerData[0].intelligence);
  const [strength, setStrength] = useState(playerData[0].strength);
  const [wis, setWis] = useState(playerData[0].wisdom)
  const [header, setHeader] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if(levelBool){
      if(levelRef.current){
        levelRef.current.classList.remove('hide')
      }
    }
  }, [levelBool])

  const handleClose = () => {
    if(points !== 0){
        setHeader('Please use all skill points before saving.')
        return;
    }
    generateNewStats(playerData[0], ac, charisma, constitution, dex,
        hp, intel, strength, wis, setPlayerData, setCurrentHealth)
    hpBarChanger(healthRef, hp, hp)
    levelRef.current.classList.add('hide');
    setLevelBool(false)
    setPoints(5);
    setOpen(false);
  };

  const levelUpData = { ac, setAc, charisma, setCharisma,
    constitution, setConstitution, dex, setDex, intel, setIntel,
    strength, setStrength, wis, setWis, setPoints, points, hp, setHp }

  return (
    <levelUpContext.Provider value={levelUpData}>
      <div ref={levelRef} className='level-up-button' onClick={handleClickOpen}>
        Level Up
      </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Level Up
            </Typography>
            <Button className={classes.buttonStyle} onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
            <div className='points-container'>
                <div>{`Points left: ${points}`}</div>
                <div>{!header ? null : header}</div>
            </div>
            <div className='player-card-wrapper'>
                <PlayerCard data={playerData[0]} />
            </div>
      </Dialog>
    </levelUpContext.Provider>
  );
}