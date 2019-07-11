import React from 'react';
import classnames from 'classnames';
import { Tabs, Radio, Checkbox, Row, Col, InputNumber, Select } from 'antd';
import getI18n from './i18n';
import { valudateCron } from '../utils';
import './index.less';

const { Option } = Select;
const { TabPane } = Tabs;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const options = [];
const hourOptions = [];
const daysForMonOptions = [];
const monthOptions = [];
const weekOptions = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
for (let i = 0; i < 60; i++) { options.push(i.toString()); }
for (let i = 0; i < 24; i++) { hourOptions.push(i.toString()); }
for (let i = 1; i < 32; i++) { daysForMonOptions.push(i.toString()); }
for (let i = 1; i < 13; i++) { monthOptions.push(i.toString()); }
// for (let i = 1; i < 8; i++) { weekOptions.push(i.toString()); }

class CRON extends React.Component {
  constructor(props) {
    super(props);
    const { value = '0 0 0 * * ?', type = ['minute', 'hour', 'day', 'month'] } = props;
    const values = valudateCron(value) ? value : '0 0 0 * * ?';

    const cronArr = values.split(' ');
    const time = ['second', 'minute', 'hour', 'day', 'month', 'week'];
    let TabsActiveKey = 1;
    for (let i = 0; i < time.length; i++) {
      if (type.indexOf(time[i]) > -1) {
        TabsActiveKey = i + 1;
        break;
      }
    }

    // 秒
    const second = cronArr[0];
    let secondCycleStart = 1;
    let secondCycleEnd = 1;
    let secondStart = 1;
    let secondEvery = 1;
    let secondChecked = '0';
    let SecondRadiochecked = 1;
    if (second === '*') {
      SecondRadiochecked = 1;
    } else if (second.indexOf('-') > -1) {
      SecondRadiochecked = 2;
      [secondCycleStart, secondCycleEnd] = second.split('-');
    } else if (second.indexOf('/') > -1) {
      SecondRadiochecked = 3;
      [secondStart, secondEvery] = second.split('/');
    } else {
      SecondRadiochecked = 4;
      secondChecked = second;
    }
    // 分
    const minute = cronArr[1];
    let minuteCycleStart = 1;
    let minuteCycleEnd = 1;
    let minuteStart = 1;
    let minuteEvery = 1;
    let minuteChecked = '0';
    let minuteRadiochecked = 1;
    if (minute === '*') {
      minuteRadiochecked = 1;
    } else if (minute.indexOf('-') > -1) {
      minuteRadiochecked = 2;
      [minuteCycleStart, minuteCycleEnd] = minute.split('-');
    } else if (minute.indexOf('/') > -1) {
      minuteRadiochecked = 3;
      [minuteStart, minuteEvery] = minute.split('/');
    } else {
      minuteRadiochecked = 4;
      minuteChecked = minute;
    }
    // 时
    const hour = cronArr[2];
    let hourCycleStart = 1;
    let hourCycleEnd = 1;
    let hourStart = 1;
    let hourEvery = 1;
    let hourChecked = '0';
    let hourRadiochecked = 1;
    if (hour === '*') {
      hourRadiochecked = 1;
    } else if (hour.indexOf('-') > -1) {
      hourRadiochecked = 2;
      [hourCycleStart, hourCycleEnd] = hour.split('-');
    } else if (hour.indexOf('/') > -1) {
      hourRadiochecked = 3;
      [hourStart, hourEvery] = hour.split('/');
    } else {
      hourRadiochecked = 4;
      hourChecked = hour;
    }

    // 天
    const day = cronArr[3];
    let daysCycleStart = 1;
    let daysCycleEnd = 1;
    let daysStart = 1;
    let daysEvery = 1;
    let daysChecked = '1';
    let daysForWorking = 1;
    let daysRadiochecked = 1;
    if (day === '*') {
      daysRadiochecked = 1;
    } else if (day === '?') {
      daysRadiochecked = 2;
    } else if (day.indexOf('-') > -1) {
      daysRadiochecked = 3;
      [daysCycleStart, daysCycleEnd] = day.split('-');
    } else if (day.indexOf('/') > -1) {
      daysRadiochecked = 4;
      [daysStart, daysEvery] = day.split('/');
    } else if (day.indexOf('W') > -1) {
      daysRadiochecked = 5;
      daysForWorking = day.slice(0, day.length - 1);
    } else if (day.indexOf('L') > -1) {
      daysRadiochecked = 6;
    } else {
      daysRadiochecked = 7;
      daysChecked = day;
    }

    // 月
    const month = cronArr[4];
    let monthCycleStart = 1;
    let monthCycleEnd = 1;
    let monthStart = 1;
    let monthEvery = 1;
    let monthChecked = '1';
    let monthRadiochecked = 1;
    if (month === '*') {
      monthRadiochecked = 1;
    } else if (month.indexOf('-') > -1) {
      monthRadiochecked = 3;
      [monthCycleStart, monthCycleEnd] = month.split('-');
    } else if (month.indexOf('/') > -1) {
      monthRadiochecked = 4;
      [monthStart, monthEvery] = month.split('/');
    } else {
      monthRadiochecked = 5;
      monthChecked = month;
    }

    // 周
    const week = cronArr[5];
    let weekCycleStart = 'MON';
    let weekCycleEnd = 'MON';
    let weekStart = 1; // 指定第几周
    let weekEvery = 'MON'; // 指定星期几
    let weekChecked = 'MON';
    let weekEnd = 'MON';
    let weekRadiochecked = 2;
    if (week === '*') {
      weekRadiochecked = 1;
    } else if (week === '?') {
      weekRadiochecked = 2;
    } else if (week.indexOf('-') > -1) {
      weekRadiochecked = 3;
      [weekCycleStart, weekCycleEnd] = week.split('-');
    } else if (week.indexOf('/') > -1) {
      weekRadiochecked = 4;
      [weekStart, weekEvery] = week.split('/');
    } else if (week.indexOf('L') > -1) {
      weekRadiochecked = 5;
      weekEnd = week.slice(0, week.length - 1);
    } else {
      weekRadiochecked = 6;
      weekChecked = week;
    }

    this.state = {
      secondVal: second, // 秒
      minVal: minute, // 分
      hourVal: hour, // 时
      dayOfMonVal: day, // 天
      MonVal: month, // 月
      dayOfWekVal: week, // 周
      yearVal: '', // 年

      secondCycleStart, // 周期开始
      secondCycleEnd, // 周期结束
      secondStart, // CRON-秒-几秒开始
      secondEvery, // CRON-秒-每几秒执行一次
      secondChecked, // CRON-秒-默认指定多选
      SecondRadiochecked, // CRON-秒-单选按钮

      minuteCycleStart, // 分
      minuteCycleEnd,
      minuteStart,
      minuteEvery,
      minuteChecked,
      minuteRadiochecked,

      hourCycleStart,
      hourCycleEnd,
      hourStart,
      hourEvery,
      hourChecked,
      hourRadiochecked,

      daysCycleStart,
      daysCycleEnd,
      daysStart,
      daysEvery,
      daysChecked,
      daysForWorking,
      daysRadiochecked,

      monthCycleStart,
      monthCycleEnd,
      monthStart,
      monthEvery,
      monthChecked,
      monthRadiochecked,

      weekCycleStart,
      weekCycleEnd,
      weekStart, // 第几周
      weekEvery, // 星期几
      weekChecked,
      weekEnd,
      weekRadiochecked,

      yearCycleStart: '',
      yearCycleEnd: '',
      yearRadiochecked: 1,

      TabsActiveKey,
      type,
    };
  }
  // 生成复选框
  // eslint-disable-next-line react/sort-comp
  createChecks = (data, radiochecked, radio) => {
    return data.map((index) => {
      return (
        <Col key={index} span={data.length === 7 ? 3 : 4}>
          <Checkbox disabled={radiochecked !== radio} value={index.toString()}>{index}</Checkbox>
        </Col>
      );
    });
  }
  // eslint-disable-next-line class-methods-use-this
  isShowDom = (chartsType, arr) => {
    return arr.includes(chartsType);
  }
  // CRONtabs页切换回调
  callback = (key) => {
    this.setState({
      TabsActiveKey: key,
    });
  }

  changeState = (obj) => {
    this.setState(obj, () => {
      this.creatCron();
    });
  }
  // ---------------------------------------秒-------------------------------------------------------------------------------------
  // CRON-秒-radio选择回调
  onSecondRadioChange = (e) => {
    const SecondRadiochecked = e.target.value;
    this.setState({ SecondRadiochecked });
    // eslint-disable-next-line default-case
    switch (SecondRadiochecked) {
      case 1: this.changeState({ secondVal: '*' }); break;
      case 2: this.changeState({ secondVal: `${this.state.secondCycleStart}-${this.state.secondCycleEnd}` }); break;
      case 3: this.changeState({ secondVal: `${this.state.secondStart}/${this.state.secondEvery}` }); break;
      case 4: this.changeState({ secondVal: this.state.secondChecked }); break;
    }
  }

  // CRON-秒-指定周期-周期开始值输入框的回调
  secondCycleStart = (value) => {
    this.setState({ secondCycleStart: value });
    if (this.state.SecondRadiochecked === 2) {
      this.changeState({
        secondVal: `${value}-${this.state.secondCycleEnd}`,
      });
    }
  };
  // CRON-秒-指定周期-周期结束值输入框的回调
  secondCycleEnd = (value) => {
    this.setState({ secondCycleEnd: value });
    if (this.state.SecondRadiochecked === 2) {
      this.changeState({
        secondVal: `${this.state.secondCycleStart}-${value}`,
      });
    }
  };


  // CRON-秒-指定从几秒开始
  secondStart = (value) => {
    this.setState({ secondStart: value });
    if (this.state.SecondRadiochecked === 3) {
      this.changeState({
        secondVal: `${value}/${this.state.secondEvery}`,
      });
    }
  };
  // CRON-秒-指定每几秒执行一次
  secondEvery = (value) => {
    this.setState({ secondEvery: value });
    if (this.state.SecondRadiochecked === 3) {
      this.changeState({
        secondVal: `${this.state.secondStart}/${value}`,
      });
    }
  };

  // CRON-秒-指定选择复选框
  onSecndcheckChange=(checkedValues) => {
    const secondChecked = checkedValues.length > 0 ? checkedValues.join(',') : '0';
    this.setState({ secondChecked });
    if (this.state.SecondRadiochecked === 4) {
      this.changeState({ secondVal: secondChecked });
    }
  };
  // ---------------------------------------秒-------------------------------------------------------------------------------------


  // ---------------------------------------分-------------------------------------------------------------------------------------
  // CRON-分钟-radio选择回调
  onMinuteRadioChange = (e) => {
    const minuteRadiochecked = e.target.value;
    this.setState({ minuteRadiochecked });
    // eslint-disable-next-line default-case
    switch (minuteRadiochecked) {
      case 1: this.changeState({ minVal: '*' }); break;
      case 2: this.changeState({ minVal: `${this.state.minuteCycleStart}-${this.state.minuteCycleEnd}` }); break;
      case 3: this.changeState({ minVal: `${this.state.minuteStart}/${this.state.minuteEvery}` }); break;
      case 4: this.changeState({ minVal: this.state.minuteChecked }); break;
    }
  }

  // CRON-分钟-指定周期-周期开始值输入框的回调
  minuteCycleStart = (value) => {
    this.setState({ minuteCycleStart: value });
    if (this.state.minuteRadiochecked === 2) {
      this.changeState({ minVal: `${value}-${this.state.minuteCycleEnd}` });
    }
  };
  // CRON-分钟-指定周期-周期结束值输入框的回调
  minuteCycleEnd = (value) => {
    this.setState({ minuteCycleEnd: value });
    if (this.state.minuteRadiochecked === 2) {
      this.changeState({ minVal: `${this.state.minuteCycleStart}-${value}` });
    }
  };

  // CRON-分钟-指定从几秒开始
  minuteStart = (value) => {
    this.setState({ minuteStart: value });
    if (this.state.minuteRadiochecked === 3) {
      this.changeState({ minVal: `${value}/${this.state.minuteEvery}` });
    }
  };
  // CRON-分钟-指定每几秒执行一次
  minuteEvery = (value) => {
    this.setState({ minuteEvery: value });
    if (this.state.minuteRadiochecked === 3) {
      this.changeState({ minVal: `${this.state.minuteStart}/${value}` });
    }
  };
  // CRON-分钟-指定选择复选框
  onMinuteCheckChange=(checkedValues) => {
    const minuteChecked = checkedValues.length > 0 ? checkedValues.join(',') : '0';
    this.setState({ minuteChecked });
    if (this.state.minuteRadiochecked === 4) { this.changeState({ minVal: minuteChecked }); }
  };
  // ---------------------------------------分-------------------------------------------------------------------------------------

  // ---------------------------------------时-------------------------------------------------------------------------------------
  // CRON-小时-radio选择回调
  onHourRadioChange = (e) => {
    const hourRadiochecked = e.target.value;
    this.setState({ hourRadiochecked });
    // eslint-disable-next-line default-case
    switch (hourRadiochecked) {
      case 1: this.changeState({ hourVal: '*' }); break;
      case 2: this.changeState({ hourVal: `${this.state.hourCycleStart}-${this.state.hourCycleEnd}` }); break;
      case 3: this.changeState({ hourVal: `${this.state.hourStart}/${this.state.hourEvery}` }); break;
      case 4: this.changeState({ hourVal: this.state.hourChecked }); break;
    }
  }

  // CRON-小时-指定周期-周期开始值输入框的回调
  hourCycleStart = (value) => {
    this.setState({ hourCycleStart: value });
    if (this.state.hourRadiochecked === 2) {
      this.changeState({ hourVal: `${value}-${this.state.hourCycleEnd}` });
    }
  };
  // CRON-小时-指定周期-周期结束值输入框的回调
  hourCycleEnd = (value) => {
    this.setState({ hourCycleEnd: value });
    if (this.state.hourRadiochecked === 2) {
      this.changeState({ hourVal: `${this.state.hourCycleStart}-${value}` });
    }
  };
  // CRON-小时-指定从几秒开始
  hourStart = (value) => {
    this.setState({ hourStart: value });
    if (this.state.hourRadiochecked === 3) {
      this.changeState({ hourVal: `${value}/${this.state.hourEvery}` });
    }
  };
  // CRON-小时-指定每几秒执行一次
  hourEvery = (value) => {
    this.setState({ hourEvery: value });
    if (this.state.hourRadiochecked === 3) {
      this.changeState({ hourVal: `${this.state.hourStart}/${value}` });
    }
  };

  // CRON-小时-指定选择复选框
  onHourCheckChange=(checkedValues) => {
    const hourChecked = checkedValues.length > 0 ? checkedValues.join(',') : '0';
    this.setState({ hourChecked });
    if (this.state.hourRadiochecked == 4) { this.changeState({ hourVal: hourChecked }); }
  };
  // ---------------------------------------时-------------------------------------------------------------------------------------


  // ---------------------------------------日-------------------------------------------------------------------------------------
  // CRON-日-radio选择回调
  onDaysRadioChange = (e) => {
    const daysRadiochecked = e.target.value;
    this.setState({ daysRadiochecked });
    if (daysRadiochecked !== 2) {
      this.changeState({
        dayOfWekVal: '?',
        weekRadiochecked: 2,
      });
    }
    // eslint-disable-next-line default-case
    switch (daysRadiochecked) {
      case 1: this.changeState({ dayOfMonVal: '*' }); break;
      case 2: this.changeState({ dayOfMonVal: '?' }); break;
      case 3: this.changeState({ dayOfMonVal: `${this.state.daysCycleStart}-${this.state.daysCycleEnd}` }); break;
      case 4: this.changeState({ dayOfMonVal: `${this.state.daysStart}/${this.state.daysEvery}` }); break;
      case 5: this.changeState({ dayOfMonVal: `${this.state.daysForWorking}W` }); break;
      case 6: this.changeState({ dayOfMonVal: 'L' }); break;
      case 7: this.changeState({ dayOfMonVal: this.state.daysChecked }); break;
    }
  }

  // CRON-日-指定周期-周期开始值输入框的回调
  daysCycleStart = (value) => {
    this.setState({ daysCycleStart: value });
    if (this.state.daysRadiochecked == 3) {
      this.changeState({ dayOfMonVal: `${value}-${this.state.daysCycleEnd}` });
    }
  };
  // CRON-日-指定周期-周期结束值输入框的回调
  daysCycleEnd = (value) => {
    this.setState({ daysCycleEnd: value });
    if (this.state.daysRadiochecked == 3) {
      this.changeState({ dayOfMonVal: `${this.state.daysCycleStart}-${value}` });
    }
  };
  // CRON-日-指定从多少开始
  daysStart = (value) => {
    this.setState({ daysStart: value });
    if (this.state.daysRadiochecked == 4) {
      this.changeState({ dayOfMonVal: `${value}/${this.state.daysEvery}` });
    }
  };
  // CRON-日-指定每多久执行一次
  daysEvery = (value) => {
    this.setState({ daysEvery: value });
    if (this.state.daysRadiochecked == 4) {
      this.changeState({ dayOfMonVal: `${this.state.daysStart}/${value}` });
    }
  };
  // CRON-日-指定最近日期的工作日执行
  daysForWorking = (value) => {
    this.setState({ daysForWorking: value });
    if (this.state.daysRadiochecked == 5) {
      this.setState({ dayOfMonVal: `${value}W` });
    }
  };
  // CRON-日-指定选择复选框
  onDaysCheckChange=(checkedValues) => {
    const daysChecked = checkedValues.length > 0 ? checkedValues.join(',') : '1';
    this.setState({ daysChecked });
    if (this.state.daysRadiochecked == 7) { this.changeState({ dayOfMonVal: daysChecked }); }
  };
  // ---------------------------------------日-------------------------------------------------------------------------------------


  // ---------------------------------------月-------------------------------------------------------------------------------------
  // CRON-月-radio选择回调
  onMonthRadioChange = (e) => {
    const monthRadiochecked = e.target.value;
    this.setState({ monthRadiochecked });
    // eslint-disable-next-line default-case
    switch (monthRadiochecked) {
      case 1: this.changeState({ MonVal: '*' }); break;
      // case 2: this.changeState({ MonVal: '?' }); break;
      case 3: this.changeState({ MonVal: `${this.state.monthCycleStart}-${this.state.monthCycleEnd}` }); break;
      case 4: this.changeState({ MonVal: `${this.state.monthStart}/${this.state.monthEvery}` }); break;
      case 5: this.changeState({ MonVal: this.state.monthChecked }); break;
    }
  }

  // CRON-月-指定周期-周期开始值输入框的回调
  monthCycleStart = (value) => {
    this.setState({ monthCycleStart: value });
    if (this.state.monthRadiochecked === 3) {
      this.changeState({ MonVal: `${value}-${this.state.monthCycleEnd}` });
    }
  };
  // CRON-月-指定周期-周期结束值输入框的回调
  monthCycleEnd = (value) => {
    this.setState({ monthCycleEnd: value });
    if (this.state.monthRadiochecked === 3) {
      this.changeState({ MonVal: `${this.state.monthCycleStart}-${value}` });
    }
  };
  // CRON-月-指定从多久开始
  monthStart = (value) => {
    this.setState({ monthStart: value });
    if (this.state.monthRadiochecked === 4) {
      this.changeState({ MonVal: `${value}/${this.state.monthEvery}` });
    }
  };
  // CRON-月-指定每多久执行一次
  monthEvery = (value) => {
    this.setState({ monthEvery: value });
    if (this.state.monthRadiochecked === 4) {
      this.changeState({ MonVal: `${this.state.monthStart}/${value}` });
    }
  };

  // CRON-月-指定选择复选框
  onMonthCheckChange=(checkedValues) => {
    const monthChecked = checkedValues.length > 0 ? checkedValues.join(',') : '1';
    this.setState({ monthChecked });
    if (this.state.monthRadiochecked === 5) { this.changeState({ MonVal: monthChecked }); }
  };

  // ---------------------------------------月-------------------------------------------------------------------------------------


  // CRON-周-radio选择回调
  onWeekRadioChange = (e) => {
    const weekRadiochecked = e.target.value;
    this.setState({ weekRadiochecked });
    if (weekRadiochecked !== 2) {
      this.changeState({
        dayOfMonVal: '?',
        daysRadiochecked: 2,
      });
    }
    // eslint-disable-next-line default-case
    switch (weekRadiochecked) {
      case 1: this.changeState({ dayOfWekVal: '*' }); break;
      case 2: this.changeState({ dayOfWekVal: '?' }); break;
      case 3: this.changeState({ dayOfWekVal: `${this.state.weekCycleStart}-${this.state.weekCycleEnd}` }); break;
      case 4: this.changeState({ dayOfWekVal: `${this.state.weekEvery}#${this.state.weekStart}` }); break;
      case 5: this.changeState({ dayOfWekVal: `${this.state.weekEnd}L` }); break;
      case 6: this.changeState({ dayOfWekVal: this.state.weekChecked }); break;
    }
  }

  // CRON-周-指定周期-周期开始值输入框的回调
  weekCycleStart = (value) => {
    this.setState({ weekCycleStart: value });
    if (this.state.weekRadiochecked === 3) {
      this.changeState({ dayOfWekVal: `${value}-${this.state.weekCycleEnd}` });
    }
  };
  // CRON-周-指定周期-周期结束值输入框的回调
  weekCycleEnd = (value) => {
    this.setState({ weekCycleEnd: value });
    if (this.state.weekRadiochecked === 3) {
      this.changeState({ dayOfWekVal: `${this.state.weekCycleStart}-${value}` });
    }
  };
  // CRON-周-指定该月的第几周
  weekStart = (value) => {
    this.setState({ weekStart: value });
    if (this.state.weekRadiochecked === 4) {
      this.changeState({ dayOfWekVal: `${this.state.weekEvery}#${value}` });
    }
  };
  // CRON-周-指定星期几
  weekEvery = (value) => {
    this.setState({ weekEvery: value });
    if (this.state.weekRadiochecked === 4) {
      this.changeState({ dayOfWekVal: `${value}#${this.state.weekStart}` });
    }
  };
  // CRON-周-每月最后一个星其几
  changeweekEnd = (value) => {
    this.setState({ weekEnd: value });
    if (this.state.weekRadiochecked === 5) {
      this.changeState({ dayOfWekVal: `${value}L` });
    }
  };
  // CRON-周-指定选择复选框
  onWeekCheckChange=(checkedValues) => {
    const weekChecked = checkedValues.length > 0 ? checkedValues.join(',') : 'MON';
    this.setState({ weekChecked });
    if (this.state.weekRadiochecked === 6) { this.changeState({ dayOfWekVal: weekChecked }); }
  };


  // CRON-年-radio选择回调
  onYearRadioChange = (e) => {
    const yearRadiochecked = e.target.value;
    this.setState({ yearRadiochecked });
    // eslint-disable-next-line default-case
    switch (yearRadiochecked) {
      case 1: this.setState({ yearVal: '' }); break;
      case 2: this.setState({ yearVal: '*' }); break;
      case 3: this.setState({ yearVal: `${this.state.yearCycleStart}-${this.state.yearCycleEnd}` }); break;
    }
    if (yearRadiochecked != 2) {
      const { secondVal, minVal, hourVal, dayOfMonVal, MonVal, dayOfWekVal } = this.state;
      if (secondVal == '*') { this.setState({ secondVal: '0' }); }
      if (minVal == '*') { this.setState({ minVal: '0' }); }
      if (hourVal == '*') { this.setState({ hourVal: '0' }); }
      if (dayOfMonVal == '*') { this.setState({ dayOfMonVal: '0' }); }
      if (MonVal == '*') { this.setState({ MonVal: '0' }); }
      if (dayOfWekVal == '*') { this.setState({ dayOfWekVal: '?' }); }
    }
  }
  // CRON-年-指定周期-周期开始值输入框的回调
  yearCycleStart = (e) => {
    if (this.state.yearRadiochecked == 3) {
      this.setState({ yearVal: `${e.target.value}-${this.state.yearCycleEnd}` });
    }
    this.setState({ yearCycleStart: e.target.value });
  };
  // CRON-年-指定周期-周期结束值输入框的回调
  yearCycleEnd = (e) => {
    if (this.state.yearRadiochecked == 3) {
      this.setState({ yearVal: `${this.state.yearCycleStart}-${e.target.value}` });
    }
    this.setState({ yearCycleEnd: e.target.value });
  };

  creatCron = () => {
    const {
      secondVal,
      minVal,
      hourVal,
      dayOfMonVal,
      MonVal,
      dayOfWekVal,
      yearVal,
    } = this.state;
    const str = `${secondVal} ${
      minVal} ${
      hourVal} ${
      dayOfMonVal} ${
      MonVal} ${
      dayOfWekVal}`;
    const { onChange } = this.props;
    if (onChange) {
      onChange(str);
    }
  }
  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const {
      SecondRadiochecked = '1',
      secondCycleStart,
      secondCycleEnd,
      secondStart,
      secondEvery,
      secondChecked,

      minuteCycleStart,
      minuteCycleEnd,
      minuteStart,
      minuteEvery,
      minuteChecked,
      minuteRadiochecked,

      hourCycleStart,
      hourCycleEnd,
      hourStart,
      hourEvery,
      hourChecked,
      hourRadiochecked,

      daysCycleStart,
      daysCycleEnd,
      daysStart,
      daysEvery,
      daysChecked,
      daysForWorking,
      daysRadiochecked,

      monthCycleStart,
      monthCycleEnd,
      monthStart,
      monthEvery,
      monthChecked,
      monthRadiochecked,

      weekCycleStart,
      weekCycleEnd,
      weekStart,
      weekEvery,
      weekChecked,
      weekEnd,
      weekRadiochecked,

      TabsActiveKey,
      type,
    } = this.state;
    const { style={ width: 576 }, className, lang="zh_CN"  } = this.props;
    const i18n = getI18n(lang); // 国际化
    const Cls = classnames('cron', className);

    const children = (
      weekOptions.map((w) => {
        return <Option key={w} value={w}>{w}</Option>;
      })
    );
    return (
      <div className={Cls} style={style}>
        <Tabs defaultActiveKey={String(TabsActiveKey)} onChange={this.callback}>
          {
              this.isShowDom('second', type) &&
              <TabPane tab={i18n.second} key="1">
                <RadioGroup name="radiogroup" value={SecondRadiochecked} onChange={this.onSecondRadioChange}>
                  <Radio style={radioStyle} value={1}>{i18n.EverySecond}</Radio>
                  <Radio style={radioStyle} value={2}>{i18n.thecycle}
                    {i18n.from1} <InputNumber disabled={SecondRadiochecked !== 2} min={0} max={59} value={secondCycleStart} size="small" onChange={this.secondCycleStart} style={{ width: 100 }} />
                    &nbsp;- <InputNumber disabled={SecondRadiochecked !== 2} min={0} max={59} value={secondCycleEnd} size="small" onChange={this.secondCycleEnd} style={{ width: 100 }} /> {i18n.second1}
                  </Radio>
                  <Radio style={radioStyle} value={3}>
                    {i18n.from} <InputNumber disabled={SecondRadiochecked !== 3} min={0} max={59} value={secondStart} size="small" onChange={this.secondStart} style={{ width: 100 }} /> {i18n.secondstart}
                    {i18n.Every} <InputNumber disabled={SecondRadiochecked !== 3} min={0} max={59} value={secondEvery} size="small" onChange={this.secondEvery} style={{ width: 100 }} /> {i18n.doOne}
                  </Radio>
                  <Radio style={radioStyle} value={4}>{i18n.appoint}<br />
                    <CheckboxGroup value={secondChecked.split(',')} style={{ width: '100%' }} onChange={this.onSecndcheckChange} >
                      <Row> {this.createChecks(options, SecondRadiochecked, 4)} </Row>
                    </CheckboxGroup>
                  </Radio>
                </RadioGroup>
              </TabPane>
          }
          {
            this.isShowDom('minute', type) &&
            <TabPane tab={i18n.minute} key="2">
              <RadioGroup name="radiogroup" value={minuteRadiochecked} onChange={this.onMinuteRadioChange}>
                <Radio style={radioStyle} value={1}>{i18n.Everyminute}</Radio>
                <Radio style={radioStyle} value={2}>{i18n.thecycle}
                  {i18n.from1} <InputNumber disabled={minuteRadiochecked !== 2} min={0} max={59} value={minuteCycleStart} size="small" onChange={this.minuteCycleStart} style={{ width: 100 }} />
                    &nbsp;- <InputNumber disabled={minuteRadiochecked !== 2} min={0} max={59} value={minuteCycleEnd} size="small" onChange={this.minuteCycleEnd} style={{ width: 100 }} /> {i18n.minute1}
                </Radio>
                <Radio style={radioStyle} value={3}>
                  {i18n.from} <InputNumber disabled={minuteRadiochecked !== 3} min={0} max={59} value={minuteStart} size="small" onChange={this.minuteStart} style={{ width: 100 }} /> {i18n.minutestart}
                  {i18n.Every} <InputNumber disabled={minuteRadiochecked !== 3} min={0} max={59} value={minuteEvery} size="small" onChange={this.minuteEvery} style={{ width: 100 }} /> {i18n.doOne}
                </Radio>
                <Radio style={radioStyle} value={4}>{i18n.appoint}<br />
                  <CheckboxGroup value={minuteChecked.split(',')} style={{ width: '100%' }} onChange={this.onMinuteCheckChange} >
                    <Row> {this.createChecks(options, minuteRadiochecked, 4)} </Row>
                  </CheckboxGroup>
                </Radio>
              </RadioGroup>
            </TabPane>
          }
          {
            this.isShowDom('hour', type) &&
            <TabPane tab={i18n.hour} key="3">
              <RadioGroup name="radiogroup" value={hourRadiochecked} onChange={this.onHourRadioChange}>
                <Radio style={radioStyle} value={1}>{i18n.Everyhour}</Radio>
                <Radio style={radioStyle} value={2}>{i18n.thecycle}
                  {i18n.from1} <InputNumber disabled={hourRadiochecked !== 2} min={0} max={23} value={hourCycleStart} size="small" onChange={this.hourCycleStart} style={{ width: 100 }} />
                    &nbsp;- <InputNumber disabled={hourRadiochecked !== 2} min={0} max={23} value={hourCycleEnd} size="small" onChange={this.hourCycleEnd} style={{ width: 100 }} /> {i18n.hour1}
                </Radio>
                <Radio style={radioStyle} value={3}>
                  {i18n.from} <InputNumber disabled={hourRadiochecked !== 3} min={0} max={23} value={hourStart} size="small" onChange={this.hourStart} style={{ width: 100 }} /> {i18n.hourstart}
                  {i18n.Every} <InputNumber disabled={hourRadiochecked !== 3} min={0} max={23} value={hourEvery} size="small" onChange={this.hourEvery} style={{ width: 100 }} /> {i18n.doOne}
                </Radio>
                <Radio style={radioStyle} value={4}>{i18n.appoint}<br />
                  <CheckboxGroup value={hourChecked.split(',')} style={{ width: '100%' }} onChange={this.onHourCheckChange} >
                    <Row> {this.createChecks(hourOptions, hourRadiochecked, 4)} </Row>
                  </CheckboxGroup>
                </Radio>
              </RadioGroup>
            </TabPane>
          }
          {
            this.isShowDom('day', type) &&
            <TabPane tab={i18n.day} key="4">
              <RadioGroup name="radiogroup" value={daysRadiochecked} onChange={this.onDaysRadioChange}>
                <Radio style={radioStyle} value={1}>{i18n.Everyday}</Radio>
                <Radio style={radioStyle} value={2}>{i18n.noappoint}</Radio>
                <Radio style={radioStyle} value={3}>{i18n.thecycle}
                  {i18n.from1} <InputNumber disabled={daysRadiochecked !== 3} min={1} max={31} value={daysCycleStart} size="small" onChange={this.daysCycleStart} style={{ width: 100 }} />
                    &nbsp;- <InputNumber disabled={daysRadiochecked !== 3} min={1} max={31} value={daysCycleEnd} size="small" onChange={this.daysCycleEnd} style={{ width: 100 }} /> {i18n.day1}
                </Radio>
                <Radio style={radioStyle} value={4}>
                  {i18n.from} <InputNumber disabled={daysRadiochecked !== 4} min={1} max={31} value={daysStart} size="small" onChange={this.daysStart} style={{ width: 100 }} /> {i18n.daystart}
                  {i18n.Every} <InputNumber disabled={daysRadiochecked !== 4} min={1} max={31} value={daysEvery} size="small" onChange={this.daysEvery} style={{ width: 100 }} /> {i18n.doOne}
                </Radio>
                {/* <Radio style={radioStyle} value={5}>
                  {i18n.Everymonth1} <InputNumber disabled={daysRadiochecked !== 5} min={1} max={31} value={daysForWorking} size="small" onChange={this.daysForWorking} style={{ width: 100 }} /> {i18n.latestDays}
                </Radio>
                <Radio style={radioStyle} value={6}>{i18n.monthend}</Radio> */}
                <Radio style={radioStyle} value={7}>{i18n.appoint}<br />
                  <CheckboxGroup value={daysChecked.split(',')} style={{ width: '100%' }} onChange={this.onDaysCheckChange} >
                    <Row> {this.createChecks(daysForMonOptions, daysRadiochecked, 7)} </Row>
                  </CheckboxGroup>
                </Radio>
              </RadioGroup>
            </TabPane>
         }
          {
          this.isShowDom('month', type) &&
            <TabPane tab={i18n.month} key="5">
              <RadioGroup name="radiogroup" value={monthRadiochecked} onChange={this.onMonthRadioChange}>
                <Radio style={radioStyle} value={1}>{i18n.Everymonth}</Radio>
                {/* <Radio style={radioStyle} value={2}>不指定</Radio> */}
                <Radio style={radioStyle} value={3}>{i18n.thecycle}
                  {i18n.from1} <InputNumber disabled={monthRadiochecked !== 3} min={1} max={12} value={monthCycleStart} size="small" onChange={this.monthCycleStart} style={{ width: 100 }} />
                    &nbsp;- <InputNumber disabled={monthRadiochecked !== 3} min={1} max={12} value={monthCycleEnd} size="small" onChange={this.monthCycleEnd} style={{ width: 100 }} /> {i18n.month1}
                </Radio>
                <Radio style={radioStyle} value={4}>
                  {i18n.from} <InputNumber disabled={monthRadiochecked !== 4} min={1} max={12} value={monthStart} size="small" onChange={this.monthStart} style={{ width: 100 }} /> {i18n.monthstart}
                  {i18n.Every} <InputNumber disabled={monthRadiochecked !== 4} min={1} max={12} value={monthEvery} size="small" onChange={this.monthEvery} style={{ width: 100 }} /> {i18n.doOne}
                </Radio>
                <Radio style={radioStyle} value={5}>{i18n.appoint}<br />
                  <CheckboxGroup value={monthChecked.split(',')} style={{ width: '100%' }} onChange={this.onMonthCheckChange} >
                    <Row> {this.createChecks(monthOptions, monthRadiochecked, 5)} </Row>
                  </CheckboxGroup>
                </Radio>
              </RadioGroup>
            </TabPane>
         }
          {
          this.isShowDom('week', type) &&
            <TabPane tab={i18n.week} key="6">
              <RadioGroup name="radiogroup" value={weekRadiochecked} onChange={this.onWeekRadioChange}>
                <Radio style={radioStyle} value={1}>{i18n.Everyweek}</Radio>
                <Radio style={radioStyle} value={2}>{i18n.noappoint}</Radio>
                <Radio style={radioStyle} value={3}>{i18n.thecycle}
                  {i18n.from1} {i18n.week1} <Select disabled={weekRadiochecked !== 3} value={weekCycleStart} size="small" onChange={this.weekCycleStart} style={{ width: 100 }}>
                    {children}
                                            </Select>
                    &nbsp;- <Select disabled={weekRadiochecked !== 3} value={weekCycleEnd} size="small" onChange={this.weekCycleEnd} style={{ width: 100 }}>
                      {children}
                    </Select>
                </Radio>
                <Radio style={radioStyle} value={4}>
                  {i18n.monthweek} <InputNumber disabled={weekRadiochecked !== 4} min={1} max={5} value={weekStart} size="small" onChange={this.weekStart} style={{ width: 100 }} /> {i18n.week3}
                  {i18n.week2} <Select disabled={weekRadiochecked !== 4} value={weekEvery} size="small" onChange={this.weekEvery} style={{ width: 100 }} >
                    {children}
                               </Select>
                </Radio>
                <Radio style={radioStyle} value={5}>{i18n.weekend} <Select disabled={weekRadiochecked !== 5} value={weekEnd} size="small" onChange={this.changeweekEnd} style={{ width: 100 }} >
                  {children}
                                                                   </Select>
                </Radio>
                <Radio style={radioStyle} value={6}>{i18n.appoint}<br />
                  <CheckboxGroup value={weekChecked.split(',')} style={{ width: '100%' }} onChange={this.onWeekCheckChange} >
                    <Row> {this.createChecks(weekOptions, weekRadiochecked, 6)} </Row>
                  </CheckboxGroup>
                </Radio>
              </RadioGroup>
            </TabPane>
          }
          {/* <TabPane tab="年" key="7">
            <RadioGroup name="radiogroup" defaultValue={1} onChange={this.onYearRadioChange}>
              <Radio style={radioStyle} value={1}>不指定 允许的通配符[, - * /] 非必填 </Radio>
              <Radio style={radioStyle} value={2}>每年 </Radio>
              <Radio style={radioStyle} value={3}>{i18n.thecycle}
                  {i18n.from1} <InputNumber type="number" size="small" onChange={this.yearCycleStart} style={{ width: 100 }} />
                  - <InputNumber size="small" type="number" onChange={this.yearCycleEnd} style={{ width: 100 }} />
              </Radio>
            </RadioGroup>
          </TabPane> */}
        </Tabs>
      </div>
    );
  }
}

export default CRON;

