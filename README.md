## Alemon-Onebot

> AlemonJS V1.2.0-rc.20 以上

```sh
npm i alemon-onebot
```

`alemon.login.ts`

```ts
import { ALoginOptions } from 'alemonjs'
import { OneBotLoginMap } from 'alemon-onebot'
export default ALoginOptions<OneBotLoginMap>({
  test: {
    onebot: {
      //
    }
  }
})
```

`alemon.config.ts`

```ts
import { defineAlemonConfig, analysis } from 'alemonjs'
import OneBot from 'alemon-onebot'
export default defineAlemonConfig({
  // onebot v12
  platforms: [OneBot]
})
```
