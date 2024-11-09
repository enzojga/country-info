import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/countries` 
  : 'http://localhost:3002/countries';

export type Contries = Country[]

export interface Country {
  label: string
  value: string
}

export interface CountryInfo {
  borders: Borders
  flagData: FlagData
  populationData: PopulationData
}

interface Borders {
  commonName: string
  officialName: string
  countryCode: string
  region: string
  borders: Country[]
}

interface FlagData {
  name: string
  flag: string
  iso2: string
  iso3: string
}

interface PopulationData {
  country: string
  code: string
  iso3: string
  populationCounts: PopulationCount[]
}

interface PopulationCount {
  year: number
  value: number
}

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export async function getCountries(): Promise<Contries>  {
  try {
    const response = await api.get('');
    return response.data;
  } catch  {
    throw new Error(`Erro ao buscar paises`);
  }
}

export async function getCountryInfo(countryId: string):Promise<CountryInfo> {
  try {
    const response = await api.get(`/${countryId}`);
    return response.data;
  } catch  {
    throw new Error(`Erro ao buscar o país: ${countryId}`);
  }
}