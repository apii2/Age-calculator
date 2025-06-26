import type React from "react";
import Result from "./components/Result"
import { useState } from "react";
import type DataInterface from "./types/DataInterface";
import { DateContext } from "./contexts/DateContext";

export default function App() {
  let dataToValidate:Array<DataInterface> = [
    {
      name: 'day',
      placeholder: 'DD',
      value: '',
      validation: {
        required: {
          value: true,
          msg: 'This field is required'
        },
        length: {
          min: 0,
          max: 31,
          value: true,
          msg: 'Must be a valid day'
        }
      }
    },
    {
      name: 'month',
      placeholder: 'MM',
      value: '',
      validation: {
        required: {
          value: true,
          msg: 'This field is required'
        },
        length: {
          min: 0,
          max: 12,
          value: true,
          msg: 'Must be a valid month'
        }
      }
    },
    {
      name: 'year',
      placeholder: 'YYYY',
      value: '',
      validation: {
        required: {
          value: true,
          msg: 'This field is required'
        },
        length: {
          min: 1900,
          max: new Date().getFullYear(),
          value: true,
          msg: 'Must be a valid year'
        }
      }
    }
  ];

  let [isClear, setIsClear] = useState(false);
  const [validData, setValidData] = useState<DataInterface[]>(dataToValidate);

  function isValidDate(y: number, m: number, d: number) {
    const date = new Date(y, m - 1, d);
    return (
      date.getFullYear() === y &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    );
  }

  function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const day   = Number(formData.get('day'));
    const month = Number(formData.get('month'));
    const year  = Number(formData.get('year'));
    const isADate = isValidDate(year, month, day);

    setValidData(prev=>(
      prev.map((dat:DataInterface)=>{
        let val = (formData.get(dat.name) ?? '') as string;
        let num = Number(val);

        let next:DataInterface = {
          ...dat,
          value: val
        };

        if(!val){
          setIsClear(false);
          return {
            ...next, 
            validation: {
              ...next.validation,
              required: {
                ...next.validation.required,
                value: false
              } 
            }
          };
        }
        
        let isInLimit = next.validation.length.min < num && num <= next.validation.length.max;
        if(!isInLimit){
          setIsClear(false);
          return {
            ...next, 
            validation: {
              ...next.validation,
              length: {
                ...next.validation.length,
                value: false
              } 
            }
          };
        }

        if(!isADate && next.name === 'day'){
          setIsClear(false);
          console.log(isClear);
          return {
            ...next, 
            validation: {
              ...next.validation,
              length: {
                ...next.validation.length,
                value: false
              } 
            }
          };
        }
        
        setIsClear(true);
        // console.log(isClear);
        return {
          ...next, 
          validation: {
            required: {
              ...next.validation.required,
              value: true
            },
            length: {
              ...next.validation.length,
              value: true
            }
          }
        };
      })
    ));
  }

  function errorMsg(name:string):string{
    for(const value of validData){
      if(value.name === name){
        if(!value.validation.length.value){
          return value.validation.length.msg;
        }else if(!value.validation.required.value){
          return value.validation.required.msg;
        }
      }
    }
    return '';
  }

  return (
    <main className="bg-White p-10 rounded-2xl rounded-br-[9rem] min-w-2xl">
      <DateContext.Provider value={{validData, isClear}}>
        <form onSubmit={onSubmit} name="myForm">
          <fieldset className="flex gap-6">

            {validData.map(item=>(
              <label key={item.name} className={`flex flex-col gap-2 uppercase tracking-[0.25rem] text-Grey-500 font-bold text-sm
                ${(!item.validation.required.value || !item.validation.length.value) && 'text-Red-400'}`}>
                {item.name}

                <input type="number" placeholder={item.placeholder} name={item.name} defaultValue={item.value}
                  className={`border-Grey-200 border-1 border-solid rounded-md w-38 
                  text-3xl text-black tracking-normal px-5 py-3 
                  ${(!item.validation.required.value || !item.validation.length.value) && 'border-Red-400'}
                  hover:border-Purple-500 focus-visible:border-Purple-500 focus-visible:outline-0`} 
                />

                <p className="text-Red-400 text-xs font-normal italic tracking-normal normal-case">{errorMsg(item.name)}</p>
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