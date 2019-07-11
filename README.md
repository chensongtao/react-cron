# react-cron



## Usage
    

```sh

demo:https://chensongtao.github.io/react-cron/src-index
import Crons from 'react-crons'
import {Cron, InputCron} = Crons
Cron
    onChange
    value
    style
    className
    lang // 支持zh_CN/en_US
    type={['second', 'minute', 'hour', 'day', 'month', 'week']} // 可选择


InputCron
    onChange
    value

```

## 1.带Input and Dropdown的cron表达式
```sh
<InputCron 
    onChange 
    value
/>
```
## 2.cron表达式
```sh
<Cron 
    style={{ width: 576 }}
    lang='zh_CN'
    type={['second', 'minute', 'hour', 'day', 'month', 'week']}
/>
```
## LICENSE

MIT
