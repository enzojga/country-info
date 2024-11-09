"use client"
import React, { useEffect, useState } from 'react'
import { TypewriterEffect } from './ui/typewriter-effect';
import { Contries, getCountries } from '../services/countryService';
import SelectInput from './SelectInput';

const CountryList = () => {
    
  const words = [
    {
      text: "Explore",
      className: "text-indigo-500 dark:text-indigo-500",
    },
    {
      text: "the",
      className: "text-indigo-500 dark:text-indigo-500",
    },
    {
      text: "world.",
      className: "text-secondary-light dark:text-secondary-light",
    },
  ];
  
  const [countries, setCountries] = useState([] as Contries);

  useEffect(() => {
    getCountries().then(res => {
      setCountries(res);
    });
  }, [])
  
  return (
    <>
    <TypewriterEffect className='text-xl' words={words} cursorClassName={'bg-white'}/>
    <SelectInput placeholder='Discover a new country!' options={countries}/>
    </>
  )
}

export default CountryList