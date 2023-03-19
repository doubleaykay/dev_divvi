import React from 'react';
import { Divider, Select, SelectOption, SelectVariant } from '@patternfly/react-core';

export enum TipType {
  preTaxPct = "Pre-Tax %",
  postTaxPct = "Post-Tax %",
  tipDollar = "Tip $",
  totalDollar = "Total $"
}

type TSProps = {
  onChange: (value: TipType) => void
}
type TSState = {
  isOpen: boolean,
  selected: TipType
}

export class TipSelect extends React.Component<TSProps, TSState> {
  onToggle: (isOpen: boolean) => void;
  onSelect: (event: any, selection: any, isPlaceholder: any) => void;

  constructor(props: Readonly<TSProps>) {
    super(props);
    this.state = {
      isOpen: false,
      selected: TipType.preTaxPct
    };

    this.onToggle = isOpen => {
      this.setState({
        isOpen
      });
    };

    this.onSelect = (_event, selection, _isPlaceholder) => {
      this.setState({
        selected: selection,
        isOpen: false
      });
      this.props.onChange(selection);
    };

  }

  render() {
    const { isOpen, selected: selected } = this.state;
    return (
      <Select
        variant={SelectVariant.single}
        onToggle={this.onToggle}
        onSelect={this.onSelect}
        selections={selected}
        isOpen={isOpen}
        width={140}
      >
        <SelectOption value={TipType.preTaxPct} />
        <SelectOption value={TipType.postTaxPct} />
        <Divider />
        <SelectOption value={TipType.tipDollar} />
        <SelectOption value={TipType.totalDollar} />
      </Select>
    );
  }
}