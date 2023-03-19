import React from 'react';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';

export enum PayType {
  exact = "Exact",
  cash = "Cash"
}

type PTProps = {
  onChange: (value: PayType) => void
}

type PTState = {
  isOpen: boolean,
  selected: PayType
}

export class PayTypeSelect extends React.Component<PTProps, PTState> {
  onToggle: (isOpen: any) => void;
  onSelect: (event: any, selection: any, isPlaceholder: any) => void;

  constructor(props: Readonly<PTProps>) {
    super(props);

    this.state = {
      isOpen: false,
      selected: PayType.exact
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
    const { isOpen, selected } = this.state;
    return (
      <Select
        variant={SelectVariant.single}
        onToggle={this.onToggle}
        onSelect={this.onSelect}
        selections={selected}
        isOpen={isOpen}
        width={97}
      >
        <SelectOption value={PayType.exact} />
        <SelectOption value={PayType.cash} />
      </Select>
    );
  }
}