import type React from "react";
import Result from "./components/Result"
import { useState } from "react";
import type DataInterface from "./types/DataInterface";
import { DateContext } from "./contexts/DateContext";
import { DataToValidate } from "./data/DataToValidate";
import type ErrorInterface from "./types/ErrorInterface";
import { validation } from "./validation/Validation";

export default function App() {
  const [validData, setValidData] = useState<DataInterface[]>(DataToValidate);
  const [error, setError] = useState<ErrorInterface|null>({});

  function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const errors = validation(formData, validData);

    setError(Object.keys(errors).length ? errors : null);

    if(Object.keys(errors).length) return;

    setValidData(prev=>(
      prev.map((dat:DataInterface)=>{
        let val = (formData.get(dat.name) ?? '') as string;
        return {...dat, value: val};
      })
    ));
  }

  return (
    <main className="bg-White p-10 rounded-2xl rounded-br-[9rem] min-w-2xl">
      <DateContext.Provider value={validData}>
        <form onSubmit={onSubmit} name="myForm">
          <fieldset className="flex gap-6">

            {validData.map(item=>(
              <label key={item.name} className={`flex flex-col gap-2 uppercase tracking-[0.25rem] text-Grey-500 font-bold text-sm
                ${error?.[item.name] && 'text-Red-400'}`}>
                {item.name}

                <input type="number" placeholder={item.placeholder} name={item.name} defaultValue={item.value}
                  className={`border-Grey-200 border-1 border-solid rounded-md w-38 
                  text-3xl text-black tracking-normal px-5 py-3 
                  ${error?.[item.name] && 'border-Red-400'}
                  hover:border-Purple-500 focus-visible:border-Purple-500 focus-visible:outline-0`} 
                />

                <p className="text-Red-400 text-xs font-normal italic tracking-normal normal-case">{error?.[item.name] || ''}</p>
              </label>
            ))}
            
          </fieldset>

          <div className="relative my-10">
            <hr className="border-Grey-200"/>

            <button type="submit" aria-label="Submit" className="cursor-pointer absolute top-0 bottom-0 my-auto right-0 w-20 h-20 group">
              <svg className="bg-Purple-500 group-hover:bg-black pointer-events-none p-5 w-full h-full rounded-full" xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44" >
                <g strokeWidth="2" className="stroke-White fill-none">
                  <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
                </g>
              </svg>
            </button>
          </div>
        </form>

        <Result />
      </DateContext.Provider>
    </main>
  )
}