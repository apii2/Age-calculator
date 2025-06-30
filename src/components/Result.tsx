import { useContext } from "react"
import { DateContext } from "../contexts/DateContext";

export default function Result() {

  const validData = useContext(DateContext);
  
  const day   = Number(validData.find(f => f.name === 'day')?.value ?? 0);
  const month = Number(validData.find(f => f.name === 'month')?.value ?? 0);
  const year  = Number(validData.find(f => f.name === 'year')?.value ?? 0);

  function Calculate(y:number, m:number, d:number){
    if(day && month && year){
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
  const dateObj = Calculate(year, month, day);
  
  return (
    <div className="space-y-2">
      {Object.entries(dateObj).map(([key,value])=>(
        <div key={key} className="text-7xl font-bold italic">
          <span className="text-Purple-500">{value ?? '--'}</span> {key}
        </div>
      ))}
    </div>
  )
}
