import * as React from 'react';
import {
    Stack, StackItem,
    Title,
    InputGroup, InputGroupText,
    TextInput,
} from '@patternfly/react-core';
import { Person } from '@app/Dashboard/BillInput/PeopleCard/PersonRow';
import { PeopleCard } from '@app/Dashboard/BillInput/PeopleCard/PeopleCard';
import { TipType, TipSelect } from '@app/Dashboard/BillInput/TipSelect';
import { Validity, validateText, validateCurrency, validateNumber } from '@app/validation';
import { BillParams } from './BillParams';

type BIProps = {
    onUpdate: (params: BillParams, warnings: string[]) => void,
}
type BIState = {
    params: BillParams,
    billNameValid: Validity,
    peopleExist: Validity,
    peopleAllValid: Validity,
    taxDollarsValid: Validity,
    tipAmtValid: Validity,
}
export class BillInput extends React.Component<BIProps, BIState> {
    updateName: (text: string, _event: any) => void;
    updatePeople: (people: Person[], hasWanings: boolean) => void;
    updateTaxDollars: (text: string, _event: any) => void;
    updateTipType: (tipType: TipType) => void;
    updateTipAmt: (text: string, _event: any) => void;
    reportWarnings: () => string[];

    constructor(props: Readonly<BIProps>) {
        super(props);
        this.state = {
            params: new BillParams(),
            billNameValid: Validity.default,
            peopleExist: Validity.success,
            peopleAllValid: Validity.default,
            taxDollarsValid: Validity.default,
            tipAmtValid: Validity.default,
        };

        this.updateName = (text, _event) => {
            let params = this.state.params;
            params.updateBillName(text);
            this.setState(
                {
                    params,
                    billNameValid: validateText(text),
                },
                () => this.props.onUpdate(params, this.reportWarnings())
            );
        };
        this.updatePeople = (people, hasWarnings) => {
            let params = this.state.params;
            params.updatePeople(people);
            this.setState(
                {
                    params,
                    peopleExist: (people.length == 0) ? Validity.error : Validity.success,
                    peopleAllValid: hasWarnings ? Validity.error : Validity.success
                },
                () => this.props.onUpdate(params, this.reportWarnings())
            );
        };
        this.updateTaxDollars = (text, _event) => {
            let newTax = parseFloat(text);
            let params = this.state.params;
            params.updateTaxDollars(newTax);
            this.setState(
                {
                    params,
                    taxDollarsValid: validateCurrency(text),
                },
                () => this.props.onUpdate(params, this.reportWarnings())
            );
        };
        this.updateTipType = (tipType) => {
            let text = this.state.params.tipAmt.toString();
            if (tipType == TipType.postTaxPct || tipType == TipType.preTaxPct) {
                var tipAmtValid = validateNumber(text);
            }
            else {
                var tipAmtValid = validateCurrency(text);
            }
            let params = this.state.params;
            params.updateTipType(tipType);
            this.setState(
                {
                    params,
                    tipAmtValid,
                },
                () => this.props.onUpdate(params, this.reportWarnings())
            );
        };
        this.updateTipAmt = (text, _event) => {
            if (this.state.params.tipType == TipType.postTaxPct || this.state.params.tipType == TipType.preTaxPct) {
                var tipAmtValid = validateNumber(text);
            }
            else {
                var tipAmtValid = validateCurrency(text);
            }
            let newTip = parseFloat(text);
            let params = this.state.params;
            params.updateTipAmt(newTip);
            this.setState(
                {
                    params,
                    tipAmtValid,
                },
                () => this.props.onUpdate(params, this.reportWarnings())
            );
        };
        this.reportWarnings = () => {
            let warnings: string[] = [];
            if (this.state.billNameValid != Validity.success) {
                warnings.push('Enter a valid bill name');
            }
            if (this.state.peopleExist != Validity.success) {
                warnings.push('A bill must have at least one person');
            }
            if (this.state.peopleAllValid != Validity.success) {
                warnings.push('Enter a valid name and line total for every person');
            }
            if (this.state.taxDollarsValid != Validity.success) {
                warnings.push('Enter a valid tax amount');
            }
            if (this.state.tipAmtValid != Validity.success) {
                warnings.push('Enter a valid tip amount');
            }
            return warnings;
        }
    }

    render() {
        return (
            <Stack hasGutter={true}>
                <StackItem>
                    <InputGroup>
                        <InputGroupText>Bill Title</InputGroupText>
                        <TextInput
                            aria-label={'bill-name'}
                            type={'text'}
                            onChange={this.updateName}
                            validated={this.state.billNameValid}
                        />
                    </InputGroup>
                </StackItem>
                <StackItem>
                    <Title headingLevel="h2">People</Title>
                    <PeopleCard onChange={this.updatePeople} />
                </StackItem>
                <StackItem>
                    <InputGroup>
                        <InputGroupText>Tax $</InputGroupText>
                        <TextInput
                            aria-label={'tax-amount'}
                            type={'number'}
                            onChange={this.updateTaxDollars}
                            validated={this.state.taxDollarsValid}
                        />
                    </InputGroup>
                </StackItem>
                <StackItem>
                    <InputGroup>
                        <InputGroupText>Tip</InputGroupText>
                        <TipSelect onChange={this.updateTipType} />
                        <TextInput
                            aria-label={'tip amount'}
                            type={'number'}
                            onChange={this.updateTipAmt}
                            validated={this.state.tipAmtValid}
                        />
                    </InputGroup>
                </StackItem>
            </Stack>
        )
    }
}