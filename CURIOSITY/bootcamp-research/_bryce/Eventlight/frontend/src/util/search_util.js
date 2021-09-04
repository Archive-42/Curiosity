export const debounce = (func, interval) => {
  let timeout;

  return (args) => {
    const debouncedFunc = () => func.call(this, args);

    clearTimeout(timeout);
    timeout = setTimeout(debouncedFunc, interval);
  };
};

 export const formatDates = dates => {
  if (typeof dates === "string") return "";
  const datesList = dates.map( date => new Date(date) );
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  let prettyFormat = [];      
  datesList.forEach(date => {
    const day = date.getDate();
    const monthIndex = date.getMonth();
  
    prettyFormat.push(monthNames[monthIndex].slice(0,3) + ' ' + day );
  })
return prettyFormat.join(" - ");
}

export const getDates = () => {
  let returnDates = {};
  const now = new Date();
  const todayStart = new Date().setHours(0,0,0,0);
  const todayEnd = new Date().setHours(23,59,59,999);
  returnDates["today"] = [todayStart, todayEnd];
  const tomorrowStart = todayEnd + 1;
  const tomorrowEnd = new Date(todayEnd).setDate(now.getDate() + 1);
  returnDates["tomorrow"] = [tomorrowStart, tomorrowEnd];
  let thisWeekendStart;
  let thisWeekendEnd;
  for (let i = 0; i < 7; i++) {
    thisWeekendStart = null;
    thisWeekendEnd = null;
    const day = new Date(new Date(now).setDate(now.getDate() + i));
    if (day.getDay() === 6) {
      thisWeekendStart = day.setHours(0,0,0,0);
      thisWeekendEnd = new Date(new Date(day).setDate(day.getDate() + 1)).setHours(23,59,59,999);
      break;
    }
  }
  returnDates["thisWeekend"] = [thisWeekendStart, thisWeekendEnd];
  const thisWeekStart = now.setHours(0,0,0,0);
  const thisWeekEnd = thisWeekendEnd;
  returnDates["thisWeek"] = [thisWeekStart, thisWeekEnd];
  const nextWeekStart = thisWeekEnd + 1;
  const nextWeekEnd = new Date(new Date(nextWeekStart).setDate(new Date(nextWeekStart).getDate() + 6)).setHours(23,59,59,999);
  returnDates["nextWeek"] = [nextWeekStart, nextWeekEnd];
  const thisMonthStart = now.setHours(0,0,0,0);
  const thisMonthEnd = new Date(new Date(new Date(thisMonthStart).setDate(32)).setDate(0)).setHours(23,59,59,999);
  returnDates["thisMonth"] = [thisMonthStart, thisMonthEnd];
  const nextMonthStart = thisMonthEnd + 1;
  const nextMonthEnd = new Date(new Date(new Date(nextMonthStart).setDate(32)).setDate(0)).setHours(23,59,59,999);
  returnDates["nextMonth"] = [nextMonthStart, nextMonthEnd];
  return returnDates;
}