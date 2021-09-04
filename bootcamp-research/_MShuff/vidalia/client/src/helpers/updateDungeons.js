const updateDungeon = (setCount, lower, setLower, upper, setUpper, depth, setDepth) => {
    let newLower = lower + 0.25;
    let newUpper = upper + 0.5;
    let newDepth = depth + 1;

    setCount(0);
    setLower(newLower);
    setUpper(newUpper);
    setDepth(newDepth);
}

export default updateDungeon;