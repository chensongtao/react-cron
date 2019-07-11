import React, { PureComponent } from 'react';
import { Dropdown, Input } from 'antd';
import Cron from '../Cron';
import 'antd/dist/antd.css'
class InputCron extends PureComponent {
  constructor(props) {
    super(props);
    const { value = '0 0/30 * * * ?' } = props;
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
  render() {
    const { dateVisible, value } = this.state;
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
                style={{ width: 576 }}
                lang='zh_CN'
                type={['second', 'minute', 'hour', 'day', 'month', 'week']}
            />
            )}
        >
            <Input readOnly value={value} style={{ width: 576 }}/>
        </Dropdown>
    );
  }
}
export default InputCron;
