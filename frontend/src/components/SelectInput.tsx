import React, { useState } from 'react'
import Select, { StylesConfig } from 'react-select';
import { Country } from '../services/countryService';
import Link from 'next/link';

function SelectInput({options, placeholder}: {options: {label: string, value: string}[], placeholder: string}) {
  
  const [country, setCountry] = useState({} as Country);

  function isCountry(value: unknown): value is Country {
    return (
      typeof value === "object" &&
      value !== null &&
      "value" in value &&
      "label" in value
    );
  }  
  function handleChange(newValue: unknown | Country) {
    if(isCountry(newValue)) {
      setCountry(newValue);
    }
  }

  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#000814',
      borderColor: '#fff',
      boxShadow: 'none',
      color: '#fff',
      '&:hover': {
        borderColor: '#fff',
      },
      fontWeight: 'bold',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#000814',
      color: '#fff',
      fontWeight: 'bold',
    }),
    option: (provided, state) => ({
      ...provided,
      color: '#fff',
      backgroundColor: state.isSelected ? 'indgo-500' : '000814',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
      fontWeight: 'bold',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#fff',
      fontWeight: 'bold',
    }),  
    input: (provided) => ({
      ...provided,
      color: '#fff',
    }),  
  };

  return (
      options.length > 0 && (
        <>
          <Select
            className='w-4/5 md:w-2/5'
            options={options}
            placeholder={placeholder}
            styles={customStyles}
            onChange={handleChange}
          />
          
          {country?.value && (
            <Link href={`/${country.value}`}>
              <button className="p-[3px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                  Explore {country.label}
                </div>
              </button>
            </Link>
          )}
        </>
      )
    
  )
}

export default SelectInput;