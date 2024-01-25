import ws, { WebSocket } from 'ws'

let ClientONE: WebSocket

/**
 * 创建连接
 * @param options
 * @param fun
 */
export function createWsHandler(
  options: {
    url: string
    access_token?: string
  },
  fun: (...args: any[]) => any
) {
  const { url, access_token } = options
  ClientONE = new ws(
    url,
    access_token == '' || access_token == undefined
      ? {}
      : {
          headers: {
            ['Authorization']: `Bearer ${access_token}`
          }
        }
  )
  ClientONE.on('open', () => {
    console.debug(`open：${url}`)
  })
  ClientONE.on('message', data => {
    const event = JSON.parse(data.toString())
    if (event) fun(event)
  })
  ClientONE.on('close', (code, reason) => {
    console.error(`${options.url} colse`)
    console.debug(`code:${code},reason:${reason.toString('utf8')}`)
  })
}

export { ClientONE }
