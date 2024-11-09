export interface CountryAPIResponse {
    countryCode: string;
    name: string;
}
export interface CountryInfo {
    label: string;
    value: string;
}
export interface BorderInfo {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: Border[];
}
export interface Border {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: null;
}
export interface FlagData {
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
}
export interface PopulationData {
    country: string;
    code: string;
    iso3: string;
    populationCounts: PopulationCount[];
}
export interface PopulationCount {
    year: number;
    value: number;
}
export interface PartialBorderInfo extends Omit<BorderInfo, 'borders'> {
    borders?: CountryInfo[];
}
export interface CountryInfoResponse {
    borders: Omit<BorderInfo, 'borders'> & {
        borders?: CountryInfo[];
    };
    flagData: FlagData;
    populationData: PopulationData;
}
