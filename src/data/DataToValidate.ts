import type DataInterface from "../types/DataInterface";

export const DataToValidate:Array<DataInterface> = [
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