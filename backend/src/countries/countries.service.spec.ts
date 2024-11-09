import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { CountriesService } from './countries.service';
import { of, throwError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import {
  BorderInfo,
  CountryAPIResponse,
  CountryInfo,
  CountryInfoResponse,
  FlagData,
  PopulationData,
} from './countries.interface';

// Mocking HTTP Service
const mockHttpService = {
  get: jest.fn(),
  post: jest.fn(),
};

describe('CountriesService', () => {
  let service: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
  });

  describe('getAvailableCountries', () => {
    it('should return an array of country labels and values', async () => {
      const mockResponse: CountryAPIResponse[] = [
        { countryCode: 'BR', name: 'Brazil' },
        { countryCode: 'AR', name: 'Argentina' },
      ];

      mockHttpService.get.mockReturnValue(of({ data: mockResponse }));

      const result: CountryInfo[] = await service.getAvailableCountries();

      expect(result).toEqual([
        { label: 'Brazil', value: 'BR' },
        { label: 'Argentina', value: 'AR' },
      ]);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        'https://date.nager.at/api/v3/AvailableCountries',
      );
    });
  });

  describe('getCountryInfo', () => {
    it('should return country information with borders, flag, and population data', async () => {
      const countryCode = 'BR';

      const mockBorderInfo: BorderInfo = {
        commonName: 'Brazil',
        officialName: 'Federative Republic of Brazil',
        countryCode: 'BR',
        region: 'Americas',
        borders: [],
      };

      const mockFlagData: FlagData = {
        name: 'Brazil',
        flag: 'https://link-to-flag',
        iso2: 'BR',
        iso3: 'BRA',
      };

      const mockPopulationData: PopulationData = {
        country: 'Brazil',
        code: 'BR',
        iso3: 'BRA',
        populationCounts: [{ year: 2023, value: 211000000 }],
      };

      mockHttpService.get.mockImplementationOnce(() =>
        of({ data: mockBorderInfo }),
      );
      mockHttpService.post
        .mockImplementationOnce(() => of({ data: { data: mockFlagData } }))
        .mockImplementationOnce(() => of({ data: mockPopulationData }));

      const result: CountryInfoResponse =
        await service.getCountryInfo(countryCode);

      expect(result.borders).toEqual({
        ...mockBorderInfo,
        borders: [], // borders is an empty array
      });
      expect(result.flagData).toEqual(mockFlagData);
      expect(result.populationData).toEqual(mockPopulationData);
    });

    it('should throw NotFoundException when country code is not found', async () => {
      const countryCode = 'XX';

      mockHttpService.get.mockImplementationOnce(() =>
        throwError(() => new Error('Not Found')),
      );
      mockHttpService.post.mockImplementationOnce(() =>
        throwError(() => new Error('Not Found')),
      );

      await expect(service.getCountryInfo(countryCode)).rejects.toThrow(
        new NotFoundException(`Country with code ${countryCode} not found`),
      );
    });

    it('should throw NotFoundException when flag data is not found', async () => {
      const countryCode = 'BR';

      const mockBorderInfo: BorderInfo = {
        commonName: 'Brazil',
        officialName: 'Federative Republic of Brazil',
        countryCode: 'BR',
        region: 'Americas',
        borders: [],
      };

      mockHttpService.get.mockImplementationOnce(() => of(mockBorderInfo));
      mockHttpService.post.mockImplementationOnce(() =>
        throwError(() => new Error('Flag not found')),
      );

      await expect(service.getCountryInfo(countryCode)).rejects.toThrow(
        new NotFoundException(`Country with code ${countryCode} not found`),
      );
    });

    it('should throw NotFoundException when population data is not found', async () => {
      const countryCode = 'BR';

      const mockBorderInfo: BorderInfo = {
        commonName: 'Brazil',
        officialName: 'Federative Republic of Brazil',
        countryCode: 'BR',
        region: 'Americas',
        borders: [],
      };

      const mockFlagData: FlagData = {
        name: 'Brazil',
        flag: 'https://link-to-flag',
        iso2: 'BR',
        iso3: 'BRA',
      };

      mockHttpService.get.mockImplementationOnce(() =>
        of({ data: mockBorderInfo }),
      );
      mockHttpService.post
        .mockImplementationOnce(() => of({ data: { data: mockFlagData } }))
        .mockImplementationOnce(() =>
          throwError(() => new Error('Population data not found')),
        );

      await expect(service.getCountryInfo(countryCode)).rejects.toThrow(
        new NotFoundException(`Country with code ${countryCode} not found`),
      );
    });
  });
});
