
"use client"
import LineChart from '@/src/components/LineChart';
import { CountryInfo, getCountryInfo } from '@/src/services/countryService';
import React, { useEffect, useState } from 'react'
import { use } from 'react';
import Image from 'next/image';
import SelectInput from '@/src/components/SelectInput';
import MoonLoader from "react-spinners/MoonLoader";
import { useRouter } from 'next/navigation';

function Page({ params }: { params: Promise<{ id: string }> }) {

  const { id } = use(params);
  const router = useRouter();

  const [countryInfo, setCountryInfo] = useState({} as CountryInfo);

  useEffect(() => {
    getCountryInfo(id).then(res => {
      setCountryInfo(res);
      console.log(countryInfo);
    }).catch(() => {
      router.push('/');
    });
  }, [id])

  return (
    <div className="flex justify-center items-center gap-4 flex-col bg-primary mx-auto min-h-svh w-svw">
    {countryInfo?.populationData
    ?  <>
        <div className="flex justify-center items-center gap-4">
          <h1 className="text-indigo-500 text-5xl font-bold">{countryInfo?.flagData?.name}</h1>
          <Image 
            alt='country-flag'
            src={countryInfo.flagData.flag}
            width={50}
            height={50}
          />
        </div>
        <SelectInput placeholder={`Country's borders:`} options={countryInfo.borders.borders}/>
        <LineChart data={countryInfo.populationData.populationCounts} />
      </>
    : <MoonLoader
        color="#3F51B5"
        size={100}
        speedMultiplier={0.3}
      />
    }
    </div>
  )
}

export default Page