import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus } from '@nestjs/common';

// Mocking the CountriesService and HttpService
const mockHttpService = {
  get: jest.fn(),
};

const mockCountriesService = {
  getAvailableCountries: jest.fn(),
  getCountryInfo: jest.fn(),
};

describe('CountriesController', () => {
  let controller: CountriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        {
          provide: CountriesService,
          useValue: mockCountriesService,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAvailableCountries', () => {
    it('should return a list of available countries', async () => {
      const result = [
        { value: 'AD', label: 'Andorra' },
        { value: 'AL', label: 'Albania' },
      ];
      mockCountriesService.getAvailableCountries.mockResolvedValue(result);

      expect(await controller.getAvailableCountries()).toBe(result);
      expect(mockCountriesService.getAvailableCountries).toHaveBeenCalledTimes(
        1,
      );
    });
  });

  describe('getCountryInfo', () => {
    it('should return country info for a valid country code', async () => {
      const countryCode = 'BR';
      const result = {
        borders: {
          commonName: 'Brazil',
          officialName: 'Federative Republic of Brazil',
          countryCode: 'BR',
          region: 'Americas',
          borders: [
            { value: 'AL', label: 'Albania' },
            { value: 'AD', label: 'Andorra' },
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
      };
      mockCountriesService.getCountryInfo.mockResolvedValue(result);

      expect(await controller.getCountryInfo(countryCode)).toBe(result);
      expect(mockCountriesService.getCountryInfo).toHaveBeenCalledWith(
        countryCode,
      );
      expect(mockCountriesService.getCountryInfo).toHaveBeenCalledTimes(1);
    });

    it('should throw a 404 error for an invalid country code', async () => {
      const countryCode = 'RU';
      const errorResponse = {
        message: `Country with code ${countryCode} not found`,
        error: 'Not Found',
        statusCode: 404,
      };

      mockCountriesService.getCountryInfo.mockRejectedValue(
        new HttpException(errorResponse.message, HttpStatus.NOT_FOUND),
      );

      try {
        await controller.getCountryInfo(countryCode);
      } catch (e) {
        expect(e.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });
});
