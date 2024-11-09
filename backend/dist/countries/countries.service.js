"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriesService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let CountriesService = class CountriesService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getAvailableCountries() {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://date.nager.at/api/v3/AvailableCountries'));
        const countryInfo = response.data.map((country) => ({
            label: country.name,
            value: country.countryCode,
        }));
        return countryInfo;
    }
    async getCountryInfo(countryCode) {
        const [borderInfo, flagData] = await Promise.all([
            (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`)).catch(() => {
                throw new common_1.NotFoundException(`Country with code ${countryCode} not found`);
            }),
            (0, rxjs_1.firstValueFrom)(this.httpService.post('https://countriesnow.space/api/v0.1/countries/flag/images', {
                iso2: countryCode,
            })).catch(() => {
                throw new common_1.NotFoundException(`Country with code ${countryCode} not found`);
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
        const populationData = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://countriesnow.space/api/v0.1/countries/population', {
            iso3: flagData.data.data.iso3,
        })).catch(() => {
            throw new common_1.NotFoundException(`Country with code ${countryCode} not found`);
        });
        return {
            borders,
            flagData: flagData.data.data,
            populationData: populationData.data.data,
        };
    }
};
exports.CountriesService = CountriesService;
exports.CountriesService = CountriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CountriesService);
//# sourceMappingURL=countries.service.js.map