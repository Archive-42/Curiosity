const hpBarChanger = (ref, ogHp, currentHp) => {
    if(!ref) return;
    if(!ref.current) return;
    const percent = (currentHp / ogHp) * 100;
    const styler = `${percent}%`;
    ref.current.style.width = styler;
    if(percent <= 50 && percent > 25){
        ref.current.style.backgroundColor = '#FFB02E';
    } else if(percent <= 25){
        ref.current.style.backgroundColor = '#F95454';
    } else if(percent > 50) {
        ref.current.style.backgroundColor = 'rgb(65, 163, 65)';
    }
}

export default hpBarChanger;