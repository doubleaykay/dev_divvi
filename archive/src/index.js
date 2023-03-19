"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const { dinero } = require('dinero.js');
const dinero_js_1 = require("dinero.js");
const currencies_1 = require("@dinero.js/currencies");
let input = JSON.parse("{\r\n    \"timestamp\": \"20230304T215800-0500\",\r\n    \"people\": {\r\n        \"Grace\": {\r\n            \"pre_tax_amt\": 22,\r\n            \"calc_type\": \"exact\"\r\n        },\r\n        \"Sachin\": {\r\n            \"pre_tax_amt\": 15,\r\n            \"calc_type\": \"exact\"\r\n        },\r\n        \"Anoush\": {\r\n            \"pre_tax_amt\": 19,\r\n            \"calc_type\": \"exact\"\r\n        },\r\n        \"Guadalupe\": {\r\n            \"pre_tax_amt\": 6,\r\n            \"calc_type\": \"exact\"\r\n        },\r\n        \"Sophia\": {\r\n            \"pre_tax_amt\": 7,\r\n            \"calc_type\": \"exact\"\r\n        }\r\n    },\r\n    \"tax\": 5.88,\r\n    \"tip_type\": \"pre_tax_pct\",\r\n    \"tip_val\": 20\r\n}");
// const d = dinero
const price = (0, dinero_js_1.dinero)({ amount: 5000, currency: currencies_1.USD });
console.log(price);
console.log(input);
console.log(dinero_js_1.dinero);
