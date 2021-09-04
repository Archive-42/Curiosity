import React, { useState, useEffect, useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Drop from './Drop';
import { survivalPlayer } from '../../Context';
import updateDungeon from '../../helpers/updateDungeons';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function AlertDialogSlide({name, setWeapon}) {
  const [open, setOpen] = React.useState(false);
  const [loot, setLoot] = useState([])

  const { getEnemies, killSets, setKillSets, lootRef,
     initiativeRollButn, setTurn, setTurnList, lower, upper, setLower,
     setUpper, depth, setDepth } = useContext(survivalPlayer);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let cost;

  if(depth === 0 || depth < 3){
    cost = 30;
  } else {
      cost = depth * 10;
  }

  useEffect(() => {
    if(!loot.length > 0){
      getLoot()
    }
  }, [loot])


  const getLoot = async() => {
    const res = await fetch('/api/item-drop', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json' ,
        },
        body: JSON.stringify({ name, cost })
    })
    const data = await res.json();
    setLoot(data)
  }

  const drops = loot.map((data) => <Drop key={loot.name} loot={loot} setLoot={setLoot} setWeapon={setWeapon} data={data} />)

  const handleContinue = () => {
    initiativeRollButn.current.classList.remove('hide')
    lootRef.current.classList.add('hide');
    getEnemies();
    setKillSets(killSets + 1);
    setTurnList([])
    setTurn(null);
    getLoot();
    if(killSets === 2){
      updateDungeon(setKillSets, lower, setLower, upper, setUpper, depth, setDepth)
    }
    handleClose();
  }

  return (
    <div>
      <div className='loot-button' ref={lootRef} onClick={handleClickOpen}>
        Loot the carnage
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"You loot the room."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className='drop-container'>
                {drops}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='use-item-button2' onClick={handleClose}>
            Close
          </div>
          <div className='use-item-button2' onClick={handleContinue}>
            Continue
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
