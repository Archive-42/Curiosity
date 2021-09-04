const generateNewStats = (player, ac, charism,
    constitution, dex, hp, intel, strength, wisdom, setPlayer, setCurrentHealth) => {

    let temp = {...player};
    temp.armorClass = ac;
    temp.charism = charism;
    temp.constitution = constitution;
    temp.dexterity = dex;
    temp.hitPoints = hp;
    temp.intelligence = intel;
    temp.strength = strength;
    temp.wisdom = wisdom;

    setPlayer([temp]);
    setCurrentHealth(hp);
}


export default generateNewStats;