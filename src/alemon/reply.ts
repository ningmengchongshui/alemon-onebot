import { ClientONE } from '../sdk/index.js'
import { ABuffer } from 'alemonjs'
/**
 * 回复控制器
 * @param msg
 * @param villa_id
 * @param room_id
 * @returns
 */
export async function replyController(
  msg: Buffer | string | number | (Buffer | number | string)[],
  guild_id: string
) {
  // is buffer
  if (Buffer.isBuffer(msg)) {
    try {
      ClientONE.send(
        JSON.stringify({
          // 行为 发送消息
          action: 'send_group_msg',
          params: {
            group_id: guild_id,
            // 消息体
            message: [
              {
                type: 'image',
                data: {
                  file_id: `base64://${msg.toString('base64')}`
                }
              }
            ]
          },
          echo: '1234'
        })
      )
      return { middle: [], backhaul: true }
    } catch (err) {
      console.error(err)
      return { middle: [], backhaul: false }
    }
  }

  if (Array.isArray(msg) && msg.find(item => Buffer.isBuffer(item))) {
    const isBuffer = msg.findIndex(item => Buffer.isBuffer(item))
    const cont = msg
      .map(item => {
        if (typeof item === 'number') return String(item)
        return item
      })
      .filter(element => typeof element === 'string')
      .join('')
    try {
      const buff = msg[isBuffer] as Buffer
      ClientONE.send(
        JSON.stringify({
          // 行为 发送消息
          action: 'send_group_msg',
          params: {
            group_id: guild_id,
            // 消息体
            message: [
              {
                type: 'text',
                data: {
                  text: cont
                }
              },
              {
                type: 'image',
                data: {
                  file_id: `base64://${buff.toString('base64')}`
                }
              }
            ]
          },
          echo: '1234'
        })
      )
      return { middle: [], backhaul: true }
    } catch (err) {
      console.error(err)
      return { middle: [], backhaul: false }
    }
  }

  const content = Array.isArray(msg)
    ? msg.join('')
    : typeof msg === 'string'
    ? msg
    : typeof msg === 'number'
    ? `${msg}`
    : ''

  if (content == '') return { middle: [], backhaul: false }

  /**
   * http
   */

  const match = content.match(/<http>(.*?)<\/http>/)
  if (match) {
    const getUrl = match[1]
    const msg = await ABuffer.getUrl(getUrl)
    if (Buffer.isBuffer(msg)) {
      // 群聊
      ClientONE.send(
        JSON.stringify({
          action: 'send_group_msg',
          params: {
            group_id: guild_id,
            // 消息体
            message: [
              {
                type: 'image',
                data: {
                  file_id: `base64://${msg.toString('base64')}`
                }
              }
            ]
          },
          echo: '1234'
        })
      )
    }
  }
  const message = []

  const mentionRegex = /<@(\w+)>/g
  const mentionAllRegex = /<@everyone>/g

  let matchCentnt

  let lastIndex = 0

  while ((matchCentnt = mentionRegex.exec(content)) !== null) {
    const user_id = matchCentnt[1]
    const textBeforeMention = content.substring(lastIndex, matchCentnt.index)
    if (textBeforeMention) {
      message.push({
        type: 'text',
        data: {
          text: textBeforeMention
        }
      })
    }
    if (user_id != 'everyone') {
      message.push({
        type: 'mention',
        data: {
          user_id
        }
      })
    }
    lastIndex = mentionRegex.lastIndex
  }

  const remainingText = content.substring(lastIndex)

  if (remainingText) {
    message.push({
      type: 'text',
      data: {
        text: remainingText
      }
    })
  }

  if (mentionAllRegex.test(content)) {
    message.push({
      type: 'mention_all',
      data: {}
    })
  }

  ClientONE.send(
    JSON.stringify({
      action: 'send_group_msg',
      params: {
        group_id: guild_id,
        message: message
      },
      echo: '1234'
    })
  )
  return { middle: [], backhaul: true }
}
