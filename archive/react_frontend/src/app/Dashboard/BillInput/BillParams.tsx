import { Person } from '@app/Dashboard/BillInput/PeopleCard/PersonRow';
import { TipType } from '@app/Dashboard/BillInput/TipSelect';


export class BillParams {
    billName: string;
    people: Person[];
    taxDollars: number;
    tipType: TipType;
    tipAmt: number;

    constructor() {
        this.billName = "";
        this.people = [];
        this.taxDollars = 0;
        this.tipType = TipType.preTaxPct;
        this.tipAmt = 0;
    }

    updateBillName(name: string) {
        this.billName = name;
    }
    updatePeople(people: Person[]) {
        this.people = people;
    }
    updateTaxDollars(taxDollars: number) {
        this.taxDollars = taxDollars;
    }
    updateTipType(tipType: TipType) {
        this.tipType = tipType;
    }
    updateTipAmt(tipAmt: number) {
        this.tipAmt = tipAmt;
    }
}
