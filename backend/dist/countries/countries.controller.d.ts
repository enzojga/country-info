import { CountriesService } from './countries.service';
export declare class CountriesController {
    private readonly countriesService;
    constructor(countriesService: CountriesService);
    getAvailableCountries(): Promise<import("./countries.interface").CountryInfo[]>;
    getCountryInfo(countryCode: string): Promise<import("./countries.interface").CountryInfoResponse>;
}
