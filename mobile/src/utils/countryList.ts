// 32 //
export const COUNTRY_LIST = [
    {
        "order": 1,
        "name": "Alemanha",
        "code": "DE",
        "code3": "DEU",
        "prefix": "276"
    },
    {
        "order": 2,
        "name": "Arábia Saudita",
        "code": "SA",
        "code3": "SAU",
        "prefix": "682"
    },
    {
        "order": 3,
        "name": "Argentina",
        "code": "AR",
        "code3": "ARG",
        "prefix": "032"
    },
    {
        "order": 4,
        "name": "Austrália",
        "code": "AU",
        "code3": "AUS",
        "prefix": "036"
    },
    {
        "order": 5,
        "name": "Bélgica",
        "code": "BE",
        "code3": "BEL",
        "prefix": "056"
    },
    {
        "order": 6,
        "name": "Brasil",
        "code": "BR",
        "code3": "BRA",
        "prefix": "076"
    },
    {
        "order": 7,
        "name": "Camarões",
        "code": "CM",
        "code3": "CMR",
        "prefix": "120"
    },
    {
        "order": 8,
        "name": "Canadá",
        "code": "CA",
        "code3": "CAN",
        "prefix": "124"
    },
    {
        "order": 9,
        "name": "Coréia do Sul",
        "code": "KR",
        "code3": "KOR",
        "prefix": "410"
    },
    {
        "order": 10,
        "name": "Costa Rica",
        "code": "CR",
        "code3": "CRI",
        "prefix": "188"
    },
    {
        "order": 11,
        "name": "Croácia",
        "code": "HR",
        "code3": "HRV",
        "prefix": "191"
    },
    {
        "order": 12,
        "name": "Dinamarca",
        "code": "DK",
        "code3": "DNK",
        "prefix": "208"
    },
    {
        "order": 13,
        "name": "Equador",
        "code": "EC",
        "code3": "ECU",
        "prefix": "218"
    },
    {
        "order": 14,
        "name": "Espanha",
        "code": "ES",
        "code3": "ESP",
        "prefix": "724"
    },
    {
        "order": 15,
        "name": "Estados Unidos",
        "code": "US",
        "code3": "USA",
        "prefix": "840"
    },
    {
        "order": 16,
        "name": "França",
        "code": "FR",
        "code3": "FRA",
        "prefix": "250"
    },
    {
        "order": 17,
        "name": "Gana",
        "code": "GH",
        "code3": "GHA",
        "prefix": "288"
    },
    {
        "order": 18,
        "name": "Holanda",
        "code": "NL",
        "code3": "NLD",
        "prefix": "528"
    },
    {
        "order": 19,
        "name": "Inglaterra",
        "code": "GB-ENG",
        "code3": "GBR",
        "prefix": "044"
    },
    {
        "order": 20,
        "name": "Irã",
        "code": "IR",
        "code3": "IRN",
        "prefix": "364"
    },
    {
        "order": 21,
        "name": "Japão",
        "code": "JP",
        "code3": "JPN",
        "prefix": "392"
    },
    {
        "order": 22,
        "name": "Marrocos",
        "code": "MA",
        "code3": "MAR",
        "prefix": "504"
    },
    {
        "order": 23,
        "name": "México",
        "code": "MX",
        "code3": "MEX",
        "prefix": "484"
    },
    {
        "order": 24,
        "name": "Polônia",
        "code": "PL",
        "code3": "POL",
        "prefix": "616"
    },
    {
        "order": 25,
        "name": "País de Gales",
        "code": "GB-WLS",
        "code3": "POL",
        "prefix": "616"
    },
    {
        "order": 26,
        "name": "Portugal",
        "code": "PT",
        "code3": "PRT",
        "prefix": "620"
    },
    {
        "order": 27,
        "name": "Qatar",
        "code": "QA",
        "code3": "QAT",
        "prefix": "634"
    },
    {
        "order": 28,
        "name": "Sérvia",
        "code": "RS",
        "code3": "SRB",
        "prefix": "688"
    },
    {
        "order": 29,
        "name": "Senegal",
        "code": "SN",
        "code3": "SEN",
        "prefix": "686"
    },
    {
        "order": 30,
        "name": "Suíça",
        "code": "CH",
        "code3": "CHE",
        "prefix": "756"
    },
    {
        "order": 31,
        "name": "Tunísia",
        "code": "TN",
        "code3": "TUN",
        "prefix": "788"
    },
    {
        "order": 32,
        "name": "Uruguai",
        "code": "UY",
        "code3": "URY",
        "prefix": "858"
    }
]

export type Country = {
    order: number;
    name: string;
    code: string;
    code3: string;
    prefix: string;
}

export function getCountryName(code: string) {
    const country = COUNTRY_LIST.find(name => name.code === code)

    if (!country) {
        throw "País não encontrado!"
    }

    return country.name 
}