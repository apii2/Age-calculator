export const calculate = (y:number, m:number, d:number)=>{
  if(d && m && y){
    const fullDate = new Date(y, m-1, d);
    const today = new Date();
    
    let year = today.getFullYear() - fullDate.getFullYear();
    let month = today.getMonth() - fullDate.getMonth();
    let day = today.getDate() - fullDate.getDate();
    
    if(month<0){
      year--;
      month = 12 - Math.abs(month);
    }
    if(day<0){
      month===0||month--;
      const prevMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
      day = prevMonthEnd.getDate() - Math.abs(day);
    }
    
    return {'years':year, 'months':month, 'days':day};
  }

  return {'years':null, 'months':null, 'days':null};
}