## Alemon-Onebot

基于`onebot`的`AlemonJS`机器人

> AlemonJS @1.2.0-rc.20 -- @latest

### Ecosystem

| Project           | Status                                               | Description    |
| ----------------- | ---------------------------------------------------- | -------------- |
| [alemonjs]        | [![alemonjs-status]][alemonjs-package]               | 标准应用解析器 |
| [create-alemonjs] | [![create-alemonjs-status]][create-alemonjs-package] | 模板创建脚手架 |
| [afloat]          | [![afloat-status]][afloat-package]                   | 应用构建工具   |
| [alemon-onebot]   | [![alemon-onebot-status]][alemon-onebot-package]     | onebot 协议    |

>

[alemonjs]: https://github.com/ningmengchongshui/alemonjs
[alemonjs-status]: https://img.shields.io/npm/v/alemonjs.svg
[alemonjs-package]: https://www.npmjs.com/package/alemonjs

>

[create-alemonjs]: https://github.com/ningmengchongshui/alemonjs/tree/create-alemonjs
[create-alemonjs-status]: https://img.shields.io/npm/v/create-alemonjs.svg
[create-alemonjs-package]: https://www.npmjs.com/package/create-alemonjs

>

[afloat]: https://github.com/ningmengchongshui/alemonjs/tree/rollup
[afloat-status]: https://img.shields.io/npm/v/afloat.svg
[afloat-package]: https://www.npmjs.com/package/afloat

>

[alemon-onebot]: https://github.com/ningmengchongshui/alemon-onebot
[alemon-onebot-status]: https://img.shields.io/npm/v/alemon-onebot.svg
[alemon-onebot-package]: https://www.npmjs.com/package/alemon-onebot

### 开始

- 安装

```sh
npm i alemon-onebot
```

- 使用

`alemon.config.ts`

```ts
import { defineAlemonConfig, analysis } from 'alemonjs'
import OneBot from 'alemon-onebot'
export default defineAlemonConfig({
  // onebot v12
  platforms: [OneBot]
})
```

- 登录

`alemon.login.ts`

```ts
import { ALoginOptions } from 'alemonjs'
import { type OneBotLoginMap } from 'alemon-onebot'
export default ALoginOptions<OneBotLoginMap>({
  test: {
    onebot: {
      // 连接地址
      url: '',
      // 密钥
      access_token: ''
    }
  }
})
```

### 反馈

QQ group: 806943302
