import { BotMessage } from './bot.js'
import { EventGroup, Heartbeat, Event } from '../sdk/index.js'
import { DIRECT_MESSAGE } from './message/DIRECT_MESSAGE.js'
import { MESSAGES } from './message/MESSAGES.js'
import { AMessage } from 'alemonjs'
/**
 * 会话控制
 */
export const conversation = {
  meta: (event: Heartbeat) => {
    if (event.status && event.status.bots) {
      const bot = event.status.bots[0]
      BotMessage.set('id', bot.self.user_id)
      BotMessage.set('name', bot.self.nickname)
    }
  },
  message: (event: Event | EventGroup): AMessage => {
    if (process.env?.ALEMONJS_EVENT == 'dev') console.info('event', event)
    if (event.detail_type == 'private') {
      return DIRECT_MESSAGE(event as Event)
    } else {
      return MESSAGES(event as EventGroup)
    }
  }
}
