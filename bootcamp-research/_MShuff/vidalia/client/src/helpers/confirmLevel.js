const confirmLevel = (xp, setBool, nextXp, setNextXp) => {
    if(nextXp <= xp){
        setBool(true)
        let newNext = nextXp * 2;
        setNextXp(newNext);
        return true;
    }
    return false;
}

export default confirmLevel;