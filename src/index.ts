import { conversation } from './alemon/conversation.js'
import { createWsHandler, ClientConfig, config } from './sdk/index.js'
import { Controllers } from './alemon/controller.js'
// alemonjs
import { PlatformsItemType } from 'alemonjs'
import { BOTNAME } from './one.js'
export * from './one.js'
export default {
  /**
   * 平台名
   */
  name: BOTNAME,
  /**
   * 传入登录配置
   * @param options
   * @returns
   */
  login: (options: ClientConfig, responseMessage, responseEventType) => {
    // 加载配置
    for (const item in options) {
      config.set(item as any, options['item'])
    }
    createWsHandler(
      {
        url: options?.url ?? '',
        access_token: options?.access_token ?? ''
      },
      event => {
        if (process.env.ONEBOT_WS == 'dev') console.log(event)
        if (conversation[event.type]) {
          if (event.type == 'meta') {
            conversation[event.type](event)
          } else {
            const e = conversation[event.type](event)
            responseMessage(e)
          }
        } else {
          if (event?.status != 'ok') {
            //
          }
        }
      }
    )
  },
  // 控制器
  controllers: Controllers
} as PlatformsItemType
