

export const subtractUse = (obj, setMethod) => {
    obj.Ability.uses -= 1;
    setMethod([obj]);
}

export const addUse = (obj, setMethod) => {
    obj.Ability.uses += 2;
    setMethod([obj]);
}