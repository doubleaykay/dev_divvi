import * as React from 'react';
import {
    Stack, StackItem,
    Split, SplitItem,
    Title,
    Button,
    DataList,
    DataListCell,
    DataListItem,
    DataListItemCells,
    DataListItemRow,
} from '@patternfly/react-core';
import {
    TableComposable, Thead, Tbody, Tr, Th, Td
} from '@patternfly/react-table';
import ShareIcon from '@patternfly/react-icons/dist/esm/icons/share-square-icon';

import { Output } from '@app/Dashboard/calc'
import { dummyFunction } from '@app/Dashboard/calc'

function fmt_dollars(x: number) {
    return x.toLocaleString(
        'en-US',
        {
            style: 'currency',
            currency: 'USD',
        }
    );
}

function fmt_pct(x: number) {
    return (x).toLocaleString(
        undefined,
        { maximumFractionDigits: 2 }
    ) + '%';
}


type BRProps = {
    JSON_in: string,
    headingSize: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
};
type BRState = {
    toDisplay: Output,
    peopleRows: string[][],
};
class BillReadout extends React.Component<BRProps, BRState> {
    constructor(props: Readonly<BRProps>) {
        super(props);
        let toDisplay = JSON.parse(this.props.JSON_in);

        let peopleRows = toDisplay.people.map((p) => [p.name, '$' + p.owes]);
        this.state = { toDisplay, peopleRows }
    }

    render() {
        return (
            <Stack hasGutter={true}>
                <StackItem>
                    <Title headingLevel={this.props.headingSize}>
                        Results for {this.state.toDisplay.billName}{' '}
                        <Button
                            aria-label='share-bill'
                            onClick={(_) => dummyFunction('shareBill(this.props.toDisplay)')}
                            variant='link'
                            icon={<ShareIcon />} iconPosition='right'
                            isInline
                        />
                    </Title>
                </StackItem>
                <StackItem>
                    <TableComposable variant='compact'>
                        <Tbody>
                            <Tr><Td>Subtotal</Td><Td>{fmt_dollars(this.state.toDisplay.bill.subtotal)}</Td></Tr>
                            <Tr><Td>Tax</Td><Td>{fmt_dollars(this.state.toDisplay.bill.tax)}</Td></Tr>
                            <Tr><Td>Post-tax total</Td><Td>{fmt_dollars(this.state.toDisplay.bill.postTax)}</Td></Tr>
                            <Tr><Td><b>Tip</b></Td><Td><b>{fmt_dollars(this.state.toDisplay.bill.tipAmt)}</b></Td></Tr>
                            <Tr><Td>Tip % pre-tax</Td><Td>{fmt_pct(this.state.toDisplay.bill.tipPctPreTax)}</Td></Tr>
                            <Tr><Td>Tip % post-tax</Td><Td>{fmt_pct(this.state.toDisplay.bill.tipPctPostTax)}</Td></Tr>
                            <Tr><Td><b>Total</b></Td><Td><b>{fmt_dollars(this.state.toDisplay.bill.total)}</b></Td></Tr>
                        </Tbody>
                    </TableComposable>
                </StackItem>
                <StackItem>
                    <TableComposable variant='compact'>
                        <Thead noWrap><Tr><Th width={20}>Person</Th><Th width={15}>Contribution</Th></Tr></Thead>
                        <Tbody>
                            {this.state.toDisplay.people.map((p) => (
                                <tr key={p.name + p.owes}>
                                    <td>{p.name}</td>
                                    <td>
                                        <Split hasGutter>
                                            <SplitItem>
                                                {'$' + p.owes}
                                            </SplitItem>
                                            <SplitItem isFilled>
                                                <Button
                                                    label={'Share with ' + p.name}
                                                    onClick={(_) => dummyFunction('shareLine(p.name, p.owes)')}
                                                    variant='link'
                                                    icon={<ShareIcon />} iconPosition='right'
                                                    isInline
                                                />
                                            </SplitItem>
                                        </Split>
                                    </td>
                                </tr>
                            ))}
                        </Tbody>
                    </TableComposable>
                </StackItem>
            </Stack>
        );
    }
}

export { BillReadout };