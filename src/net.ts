import { Socket } from 'net'
import * as vscode from 'vscode'
import { generateRandomString } from './helpers'

function serializeMessage(message: Record<string, unknown>): string {
  const stringifyJson = JSON.stringify(message)
  return `${stringifyJson.length}#${stringifyJson}`
}

function deserializeMessage(message: string): Record<string, unknown> {
  return JSON.parse(message.split('#')[1])
}

export const sendMessageToTcpServer = (host: string, port: number, data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const client = new Socket()

    client.connect(port, host, () => {
      console.log(`Connected to TCP server at ${host}:${port}`)

      vscode.window.showInformationMessage(`Sending message`)

      client.write(
        serializeMessage({
          // TODO: Serialize pattern to support string, object
          pattern: data.message,
          data: data.payload,
          id: generateRandomString(),
        }),
        'utf-8',
        (err) => {
          if (err) {
            vscode.window.showErrorMessage(`Sending message error occurred: ${JSON.stringify(err)}`)
          }
        },
      )
    })

    let responseBuffer = ''

    client.on('data', (data) => {
      responseBuffer += data.toString()

      try {
        const parsedResponse = deserializeMessage(responseBuffer)
        resolve(parsedResponse)

        client.destroy()
      } catch (error) {
        vscode.window.showErrorMessage(`Client error occurred: ${JSON.stringify(error)}`)
      }
    })

    client.on('error', (err) => {
      reject(`TCP client error: ${err.message}`)
    })

    client.on('close', () => {
      console.log('Connection closed')
    })
  })
}
