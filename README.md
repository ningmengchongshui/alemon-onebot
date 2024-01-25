## Alemon-Onebot

```sh
npm i alemon-onebot
```

`a.login.config.ts`

```ts
import { LoginMap } from 'alemonjs'
import { OneBotLoginMap } from 'alemon-onebot'
export const login: LoginMap & OneBotLoginMap = {
  test: {
    onebot: {
      url: '',
      access_token: ''
    }
  }
}
```

`alemon.config.ts`

```ts
import { defineAlemonConfig, analysis } from 'alemonjs'
import OneBot from 'alemon-onebot'
import { login } from './a.login.config.js'
export default defineAlemonConfig({
  login: analysis(login),
  // onebot v12
  platforms: [OneBot]
})
```
