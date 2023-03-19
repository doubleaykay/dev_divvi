"use strict";
// import  Dinero from "dinero.js";
;
;
// FROM FRONTEND
// hashmap of people
let thesePeople = new Map();
// code for adding an element to the hashmap
thesePeople.set("Anoush", {
    preTaxAmt: 17.99,
    type: "exact",
    contrib: NaN,
    contribFrac: NaN
});
thesePeople.set("Dan", {
    preTaxAmt: 21.20,
    type: "exact",
    contrib: NaN,
    contribFrac: NaN
});
thesePeople.set("Charlie", {
    preTaxAmt: 15.78,
    type: "cash",
    contrib: NaN,
    contribFrac: NaN
});
// FROM FRONTEND
// user-entered information about the bill
let thisBill = {
    taxAmt: 3.57,
    tipPctPreTax: 15,
    tipPctPostTax: NaN,
    postTipTotal: NaN,
    preTaxTotal: NaN,
    postTaxTotal: NaN
};
// LOGIC
// compute bill information
function computeContribFrac(personPreTaxAmt, billPreTaxTotal) {
    return (personPreTaxAmt / billPreTaxTotal);
}
// compute bill pre tax total
thisBill.preTaxTotal = [...thesePeople].reduce((accumulator, object) => {
    return accumulator + object[1].preTaxAmt;
}, 0);
// compute bill post tax total
thisBill.postTaxTotal = thisBill.preTaxTotal + thisBill.taxAmt;
// separate people who are paying exact from those paying cash
// the people hashmap is the primary storage for this data, so only work with
// keys here on out
let peopleExact = [];
let peopleCash = [];
thesePeople.forEach((v, k) => {
    if (v.type == "exact") {
        peopleExact.push(k);
    }
    else {
        peopleCash.push(k);
    }
});
