import { Select } from 'antd';
import React, {Component } from 'react';
import {
  SelectProps
} from 'antd/es/Select';

interface OptionsRecord {
  label: string;
  key: string;
  value: any
}


export interface MushinySelectProps extends SelectProps {
  optionsSources: Array<OptionsRecord>;
}

class MushinySelect extends Component<MushinySelectProps>{


  renderOption = () => {
    const { optionsSources } = this.props
    const data_: Array<React.ReactNode> = []
    for (let index = 0; index < optionsSources.length; index++) {
      const element = optionsSources[index];
      data_.push(
        <Select.Option value={element.value} key={element.key}>
          {element.label}
        </Select.Option>
      )
    }
    return data_
  }

  render(): React.ReactNode {
    return (
      <Select
        {...this.props}
      >
        {this.renderOption()}
      </Select>
    )
  }
}

export default MushinySelect;
