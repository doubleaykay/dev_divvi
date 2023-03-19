import * as React from 'react';
import {
  PageSection,
  Stack, StackItem,
  Button,
  Alert, AlertVariant,
  List, ListItem,
  Divider,
} from '@patternfly/react-core';
import { BillInput } from '@app/Dashboard/BillInput/BillInput';
import { BillParams } from "@app/Dashboard/BillInput/BillParams";
import { BillReadout } from '@app/Dashboard/BillReadout/BillReadout';
import { contributions, dummyFunction } from '@app/Dashboard/calc'

type CBProps = {}
type CBState = {
  params: BillParams,
  warnings: string[],
  resultsSection: React.ReactElement<any, any>,
}
export class CurrentBill extends React.Component<CBProps, CBState> {
  updateParams: (params: BillParams, warnings: string[]) => void;
  tryCompute: () => void;

  constructor(props: Readonly<CBProps>) {
    super(props)

    this.state = {
      params: new BillParams(),
      resultsSection: <></>,
      warnings: ['You must enter information before calculating'],
    };

    this.updateParams = (params, warnings) => {
      this.setState({ params, warnings });
    }

    this.tryCompute = () => {
      if (this.state.warnings.length == 0) {
        let toDisplay = contributions(this.state.params);
        var resultsSection = (
          <>
            <Divider inset={{ default: 'insetSm' }} />
            <PageSection>
              <Stack hasGutter={true}>
                <StackItem>
                  <BillReadout JSON_in={toDisplay} headingSize='h2' />
                </StackItem>
                <StackItem>
                  <Button onClick={() => dummyFunction('save(toDisplay)')}>
                    Save Bill
                  </Button>
                </StackItem>
              </Stack>
            </PageSection>
          </>
        );
      }
      else {
        let warnings: React.ReactElement<any, any>[] = [];
        for (let i = 0; i < this.state.warnings.length; i++) {
          warnings.push(<ListItem key={i}>{this.state.warnings[i]}</ListItem>)
        }

        var resultsSection = (
          <PageSection>
            <Alert title='Check your input' variant={AlertVariant.warning}>
              <List >{warnings}</List>
            </Alert>
          </PageSection>
        );
      }

      this.setState({ resultsSection });
    }
  }

  render() {
    return (
      <>
        <PageSection>
          <BillInput onUpdate={this.updateParams} />
        </PageSection>
        <PageSection>
          <Button variant={'primary'} isLarge onClick={this.tryCompute} >
            Compute
          </Button>
        </PageSection>
        {this.state.resultsSection}
      </>
    );
  }
}