import type React from "react";
import Result from "./components/Result"
import { useState } from "react";

interface DataInterface{
  name: string,
  placeholder: string,
  validation: {
    required: {
      value: boolean,
      msg: string
    },
    length: {
      min: number,
      max: number,
      value: boolean,
      msg: string
    }
  }
}

export default function App() {
  let dataToValidate:Array<DataInterface> = [
    {
      name: 'day',
      placeholder: 'DD',
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

  const [validData, setValidData] = useState(dataToValidate);

  function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setValidData(prev=>(
      prev.map((dat:DataInterface)=>{
        let value = Number(formData.get(dat.name));
        if(!value){
          return {
            ...dat, 
            validation: {
              ...dat.validation,
              required: {
                ...dat.validation.required,
                value: false
              } 
            }
          };
        }
        
        let isInLimit = dat.validation.length.min < value && value <= dat.validation.length.max;
        if(!isInLimit){
          return {
            ...dat, 
            validation: {
              ...dat.validation,
              length: {
                ...dat.validation.length,
                value: false
              } 
            }
          };
        }

        // let dateParts = validData.map(dat => formData.get(dat.name));
        // let fullDate = dateParts.join('-');
        // const date = new Date(fullDate);
        // console.log(!isNaN(date.valueOf()))
        // if(!(!isNaN(date.valueOf()))){
        //   return (dat.name === 'day') ? 
        //     {
        //       ...dat, 
        //       validation: {
        //         ...dat.validation,
        //         required: {
        //           ...dat.validation.required,
        //           value: false
        //         } 
        //       }
        //     }
        //     : dat;
        // }

        return {
          ...dat, 
          validation: {
            required: {
              ...dat.validation.required,
              value: true
            },
            length: {
              ...dat.validation.length,
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
      <form onSubmit={onSubmit} name="myForm">
        <fieldset className="flex gap-6">

          {validData.map(item=>(
            <label key={item.name} className={`flex flex-col gap-2 uppercase tracking-[0.25rem] text-Grey-500 font-bold text-sm
              ${(!item.validation.required.value || !item.validation.length.value) && 'text-Red-400'}`}>
              {item.name}

              <input type="number" placeholder={item.placeholder} name={item.name} className={`border-Grey-200 border-1 border-solid rounded-md w-38 
                text-3xl text-black tracking-normal px-5 py-3 
                ${(!item.validation.required.value || !item.validation.length.value) && 'border-Red-400'}
                hover:border-Purple-500 focus-visible:border-Purple-500 focus-visible:outline-0`} 
              />

              {(!item.validation.required.value || !item.validation.length.value) && 
                <p className="text-Red-400 text-xs font-normal italic tracking-normal normal-case">{errorMsg(item.name)}</p>}
            </label>
          ))}
          
        </fieldset>

        <div className="relative my-10">
          <hr className="border-Grey-200"/>

          <button aria-label="Submit" className="cursor-pointer absolute top-0 bottom-0 my-auto right-0 w-20 h-20 group">
            <svg className="bg-Purple-500 group-hover:bg-black pointer-events-none p-5 w-full h-full rounded-full" xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44" >
              <g strokeWidth="2" className="stroke-White fill-none">
                <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
              </g>
            </svg>
          </button>
        </div>
      </form>

      <Result />
    </main>
  )
}