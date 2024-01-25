import { ClientConfig } from './sdk/index.js'
export const BOTNAME = 'onebot'
export interface OneBotLoginMap {
  [key: string]: {
    [BOTNAME]?: ClientConfig
  }
}
