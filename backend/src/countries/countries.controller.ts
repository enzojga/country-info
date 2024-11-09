import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

// countries.controller.ts
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiOperation({ summary: 'Obter lista de países disponíveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de países disponíveis, incluindo códigos e nomes.',
    schema: {
      example: [
        {
          value: 'AD',
          label: 'Andorra',
        },
        {
          value: 'AL',
          label: 'Albania',
        },
      ],
    },
  })
  async getAvailableCountries() {
    return this.countriesService.getAvailableCountries();
  }
  @Get(':countryCode')
  @ApiOperation({ summary: 'Obter informações de um país' })
  @ApiParam({
    name: 'countryCode',
    description: 'Country ID or code (e.g., BR for Brazil)',
  })
  @ApiResponse({
    status: 200,
    description:
      'Country information, including borders, population, and flag."',
    schema: {
      example: {
        borders: {
          commonName: 'Brazil',
          officialName: 'Federative Republic of Brazil',
          countryCode: 'BR',
          region: 'Americas',
          borders: [
            {
              value: 'AL',
              label: 'Albania',
            },
            {
              value: 'AD',
              label: 'Andorra',
            },
          ],
        },
        flagData: {
          name: 'Brazil',
          flag: 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg',
          iso2: 'BR',
          iso3: 'BRA',
        },
        populationData: {
          country: 'Brazil',
          code: 'BRA',
          iso3: 'BRA',
          populationCounts: [
            { year: 1960, value: 72179226 },
            { year: 1961, value: 74311343 },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Country not found',
    type: Object,
    schema: {
      example: {
        message: 'Country with code RU not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Get(':countryCode')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    return this.countriesService.getCountryInfo(countryCode);
  }
}
