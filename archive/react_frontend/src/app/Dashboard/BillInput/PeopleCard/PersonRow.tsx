import * as React from 'react';
import {
    StackItem,
    InputGroup,
    TextInput,
    Button
} from '@patternfly/react-core';
import RemoveIcon from '@patternfly/react-icons/dist/esm/icons/user-minus-icon';
import { PayType, PayTypeSelect } from '@app/Dashboard/BillInput/PeopleCard/PayTypeSelect';
import { Validity, validateText, validateCurrency } from '@app/validation';

export class Person {
    name: string;
    lineTotal: number;
    payType: PayType;
    hasWarnings: boolean;

    constructor(name: string, lineTotal: number, payType: PayType, hasWarnings: boolean) {
        this.name = name;
        this.lineTotal = lineTotal;
        this.payType = payType;
        this.hasWarnings = hasWarnings;
    }
}

type PRProps = {
    id: number,
    onChanged: (id: number, person: Person) => void,
    onRemoved: (id: number) => void
};
type PRState = {
    id: number,
    name: string,
    nameValid: Validity,
    lineTotal: number,
    lineTotalValid: Validity,
    payType: PayType,
};
export class PersonRow extends React.Component<PRProps, PRState> {
    informParent: () => void;
    updateName: (text: string, _event: any) => void;
    updateLine: (text: any, _event: any) => void;
    updatePayType: (payType: PayType) => void;

    constructor(props: Readonly<PRProps>) {
        super(props);
        this.state = {
            id: props.id,
            name: "",
            nameValid: Validity.default,
            lineTotal: 0,
            lineTotalValid: Validity.default,
            payType: PayType.exact,
        };

        this.informParent = () => {
            let hasWarnings = this.state.nameValid != Validity.success || this.state.lineTotalValid != Validity.success;
            let p = new Person(
                this.state.name,
                this.state.lineTotal,
                this.state.payType,
                hasWarnings
            );
            this.props.onChanged(this.state.id, p);
        }

        this.updateName = (text, _event) => {
            this.setState(
                {
                    name: text,
                    nameValid: validateText(text),
                },
                () => this.informParent()
            );
        };
        this.updateLine = (text: string, _event: any) => {
            this.setState(
                {
                    lineTotal: parseFloat(text),
                    lineTotalValid: validateCurrency(text),
                },
                () => this.informParent()
            );
        };
        this.updatePayType = (payType) => {
            this.setState(
                { payType },
                () => this.informParent()
            );
        };
    }

    render() {
        return (
            <StackItem>
                <InputGroup>
                    <TextInput
                        aria-label={'person-name-' + this.state.id}
                        type={'text'}
                        placeholder='Name'
                        onChange={this.updateName}
                        validated={this.state.nameValid}
                    />
                    <TextInput
                        aria-label={'person-line-total-' + this.state.id}
                        type={'number'}
                        placeholder='Pre-tax $'
                        onChange={this.updateLine}
                        validated={this.state.lineTotalValid}
                    />
                    <PayTypeSelect onChange={this.updatePayType} />
                    <Button variant='danger' aria-label={'remove-' + this.state.id} onClick={(_) => this.props.onRemoved(this.state.id)}>
                        <RemoveIcon />
                    </Button>
                </InputGroup>
            </StackItem>
        );
    }
}
