export enum Validity {
    default = 'default',
    success = 'success',
    warning = 'warning',
    error = 'error'
}
export function validateCurrency(text: string) {
    if (text == '') {
        return Validity.warning;
    }
    else if (!/.+/.test(text)) { // Not a string with characters in it
        return Validity.error;
    }
    else if (/^(\d*(.\d\d)?)$/.test(text)) { // Valid amount of currency
        return Validity.success;
    }
    else {
        return Validity.error;
    }
}
export function validateText(text: string) {
    if (text == '') {
        return Validity.warning;
    }
    else if (!/.+/.test(text)) { // Not a string with characters in it
        return Validity.error;
    }
    else {
        return Validity.success;
    }
}
export function validateNumber(text: string) {
    if (text == '') {
        return Validity.warning;
    }
    else if (!/.+/.test(text)) { // Not a string with characters in it
        return Validity.error;
    }
    else if (/^\d*(.\d*)?$/.test(text)) { // Valid number
        return Validity.success;
    }
    else {
        return Validity.error;
    }
}
