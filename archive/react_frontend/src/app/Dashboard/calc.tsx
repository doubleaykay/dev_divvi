import { BillParams } from "@app/Dashboard/BillInput/BillParams";

export type PersonOutput = {
    name: string,
    owes: number,
};

export type BillOutput = {
    subtotal: number,
    tax: number,
    postTax: number,
    tipAmt: number,
    tipPctPreTax: number,
    tipPctPostTax: number,
    total: number,
};

export type Output = {
    billName: string,
    bill: BillOutput,
    people: PersonOutput[],
};

export function contributions(_params: any): string {
    return JSON.stringify({
        billName: 'Example Bill',
        bill: {
            subtotal: 12.34,
            tax: 23.45,
            postTax: 34.56,
            tipAmt: 45.67,
            tipPctPreTax: 56.78,
            tipPctPostTax: 67.89,
            total: 78.91,
        },
        people: [
            { name: "Anoush", owes: 11.11 },
            { name: "Charlie", owes: 22.22 },
            { name: "Richie", owes: 33.33 },
            { name: "Dan", owes: 44.44 },
        ]
    });
}

export function dummyFunction(s: string) {
    console.log(s);
};