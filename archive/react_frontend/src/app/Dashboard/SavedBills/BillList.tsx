import * as React from 'react';
import {
    PageSection,
    ExpandableSection,
    Stack, StackItem,
    Button,
    Alert, AlertVariant,
    List, ListItem,
    Divider,
} from '@patternfly/react-core';
import { BillParams } from "@app/Dashboard/BillInput/BillParams";
import { BillReadout } from '@app/Dashboard/BillReadout/BillReadout';
import { contributions, dummyFunction } from '@app/Dashboard/calc'

type BLProps = {}
type BLState = {}
export class BillList extends React.Component<BLProps, BLState> {

    render() {
        return (
            <>
                <PageSection>
                    <ExpandableSection
                    toggleTextExpanded="Show less"
                    toggleTextCollapsed="Show more"
                    displaySize="large"
                    // isWidthLimited
                    >
                        <BillReadout JSON_in={contributions(1)} headingSize='h3' />
                    </ExpandableSection>
                </PageSection>
            </>
        );
    }
}