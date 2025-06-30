import { useContext } from "react"
import { DateContext } from "../contexts/DateContext";
import { calculate } from "../methods/Calculate";

export default function Result() {

  const validData = useContext(DateContext);
  
  const day   = Number(validData.find(f => f.name === 'day')?.value ?? 0);
  const month = Number(validData.find(f => f.name === 'month')?.value ?? 0);
  const year  = Number(validData.find(f => f.name === 'year')?.value ?? 0);

  const dateObj = calculate(year, month, day);
  
  return (
    <div className="space-y-2">
      {Object.entries(dateObj).map(([key,value])=>(
        <div key={key} className="text-4xl md:text-7xl font-bold italic">
          <span className="text-Purple-500">{value ?? '--'}</span> {key}
        </div>
      ))}
    </div>
  )
}
