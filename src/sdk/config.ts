import { BaseConfig } from 'alemonjs'
export interface ClientConfig {
  /**
   * 地址
   */
  url: string
  /**
   * 钥匙
   */
  access_token?: string
  /**
   * 主人编号
   */
  masterID?: string | string[]
}
export const config = new BaseConfig<ClientConfig>({
  url: '',
  access_token: '',
  masterID: ''
})
