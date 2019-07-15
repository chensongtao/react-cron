import React, { PureComponent } from 'react';
import { Dropdown, Input } from 'antd';
import Cron from '../Cron';
class InputCron extends PureComponent {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      dateVisible: false,
      value,
    };
  }
  handleChange = (value) => {
    this.setState({
      value,
    });
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }
  clear = () => {
    this.setState({
      value: null,
    })
  }
  render() {
    const { dateVisible, value } = this.state;
    const { style, lang, type, width} = this.props;
    return (
        <Dropdown
            trigger={['click']}
            placement="bottomLeft"
            visible={dateVisible}
            onVisibleChange={visible => this.setState({ dateVisible: visible })}
            overlay={(
            <Cron
                onChange={this.handleChange}
                value={value}
                style={style}
                lang={lang}
                type={type}
            />
            )}
        >
            <Input readOnly value={value} style={{ width }}/>
        </Dropdown>
    );
  }
}
export default InputCron;
