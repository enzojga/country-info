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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriesController = void 0;
const common_1 = require("@nestjs/common");
const countries_service_1 = require("./countries.service");
const swagger_1 = require("@nestjs/swagger");
let CountriesController = class CountriesController {
    constructor(countriesService) {
        this.countriesService = countriesService;
    }
    async getAvailableCountries() {
        return this.countriesService.getAvailableCountries();
    }
    async getCountryInfo(countryCode) {
        return this.countriesService.getCountryInfo(countryCode);
    }
};
exports.CountriesController = CountriesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obter lista de países disponíveis' }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CountriesController.prototype, "getAvailableCountries", null);
__decorate([
    (0, common_1.Get)(':countryCode'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter informações de um país' }),
    (0, swagger_1.ApiParam)({
        name: 'countryCode',
        description: 'Country ID or code (e.g., BR for Brazil)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Country information, including borders, population, and flag."',
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
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, common_1.Get)(':countryCode'),
    __param(0, (0, common_1.Param)('countryCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountriesController.prototype, "getCountryInfo", null);
exports.CountriesController = CountriesController = __decorate([
    (0, common_1.Controller)('countries'),
    __metadata("design:paramtypes", [countries_service_1.CountriesService])
], CountriesController);
//# sourceMappingURL=countries.controller.js.map