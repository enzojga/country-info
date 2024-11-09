import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  BorderInfo,
  CountryAPIResponse,
  CountryInfo,
  CountryInfoResponse,
  FlagData,
  PopulationData,
} from './countries.interface';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  async getAvailableCountries(): Promise<CountryInfo[]> {
    const response = await firstValueFrom(
      this.httpService.get<CountryAPIResponse[]>(
        'https://date.nager.at/api/v3/AvailableCountries',
      ),
    );

    const countryInfo: CountryInfo[] = response.data.map(
      (country: CountryAPIResponse) => ({
        label: country.name,
        value: country.countryCode,
      }),
    );
    return countryInfo;
  }

  async getCountryInfo(countryCode: string): Promise<CountryInfoResponse> {
    const [borderInfo, flagData] = await Promise.all([
      firstValueFrom(
        this.httpService.get<BorderInfo>(
          `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
        ),
      ).catch(() => {
        throw new NotFoundException(
          `Country with code ${countryCode} not found`,
        );
      }),
      firstValueFrom(
        this.httpService.post<{ data: FlagData }>(
          'https://countriesnow.space/api/v0.1/countries/flag/images',
          {
            iso2: countryCode,
          },
        ),
      ).catch(() => {
        throw new NotFoundException(
          `Country with code ${countryCode} not found`,
        );
      }),
    ]);

    const borderFormated = borderInfo.data.borders.map((country) => {
      return {
        label: country.commonName,
        value: country.countryCode,
      };
    });

    const borders = {
      ...borderInfo.data,
      borders: borderFormated,
    };
    const populationData = await firstValueFrom(
      this.httpService.post<{ data: PopulationData }>(
        'https://countriesnow.space/api/v0.1/countries/population',
        {
          iso3: flagData.data.data.iso3,
        },
      ),
    ).catch(() => {
      throw new NotFoundException(`Country with code ${countryCode} not found`);
    });

    return {
      borders,
      flagData: flagData.data.data,
      populationData: populationData.data.data,
    };
  }
}
