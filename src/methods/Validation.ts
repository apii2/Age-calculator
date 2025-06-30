import type DataInterface from "../types/DataInterface";
import type ErrorInterface from "../types/ErrorInterface";

export const isValidDate = (y: number, m: number, d: number)=>{
  const date = new Date(y, m - 1, d);
  return (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
}

export const validation = (formData:FormData, validData:DataInterface[])=>{
  const day   = Number(formData.get('day'));
  const month = Number(formData.get('month'));
  const year  = Number(formData.get('year'));
  const isADate = isValidDate(year, month, day);

  const errors: ErrorInterface = {};

  validData.forEach(dat => {
    const value = (formData.get(dat.name) ?? '') as string;
    if (!value) {
      errors[dat.name] = dat.validation.required.msg;
      return;
    }

    const num = Number(value);
    const isInLimit = dat.validation.length.min < num && num <= dat.validation.length.max;
    if (!isInLimit) {
      errors[dat.name] = dat.validation.length.msg;
      return;
    }

    if (!isADate && dat.name === 'day') {
      errors[dat.name] = dat.validation.length.msg;
      return;
    }
  });
  
  return errors;
}