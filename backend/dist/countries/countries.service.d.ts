import { HttpService } from '@nestjs/axios';
import { CountryInfo, CountryInfoResponse } from './countries.interface';
export declare class CountriesService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getAvailableCountries(): Promise<CountryInfo[]>;
    getCountryInfo(countryCode: string): Promise<CountryInfoResponse>;
}
