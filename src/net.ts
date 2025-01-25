import { Socket } from "net";
import * as vscode from "vscode";
import { generateRandomString } from "./helpers";

export const sendMessageToTcpServer = (
  host: string,
  port: number,
  data: any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const client = new Socket();

    client.connect(port, host, () => {
      console.log(`Connected to TCP server at ${host}:${port}`);

      vscode.window.showInformationMessage(`Connected!`);

      const payload = JSON.stringify({
        pattern: data.message,
        data: { data: data.payload },
        id: generateRandomString(),
      });

      client.write(payload.length + "#" + payload, "utf-8", (err) => {
        console.error(err);
      });
    });

    let responseBuffer = "";

    client.on("data", (data) => {
      responseBuffer += data.toString();

      try {
        const parsedResponse = JSON.parse(responseBuffer.split("#")[1]);
        resolve(parsedResponse);

        client.destroy();
      } catch (error) {}
    });

    client.on("error", (err) => {
      reject(`TCP client error: ${err.message}`);
    });

    client.on("close", () => {
      console.log("Connection closed");
    });
  });
};
