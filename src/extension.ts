import * as vscode from "vscode";
import { sendMessageToTcpServer } from "./net";
import { buttonCss, inputCSS, responseCSS } from "./css";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "nestjstcpc.sendNestJSTCPMessage",
    async () => {
      const portNumber = await vscode.window.showInputBox({
        placeHolder: "Enter the TCP server port number",
        validateInput: (value: string) => {
          const port = Number(value);
          return isNaN(port) || port < 1 || port > 65535
            ? "Please enter a valid port number (1-65535)"
            : null;
        },
      });

      if (!portNumber) {
        vscode.window.showErrorMessage("Port number is required.");
        return;
      }

      const panel = vscode.window.createWebviewPanel(
        "sendTcpMessageUI",
        "Send TCP Message",
        vscode.ViewColumn.Beside,
        { enableScripts: true }
      );

      panel.webview.html = getWebviewContent(portNumber);

      panel.webview.onDidReceiveMessage(
        async (message: {
          command: string;
          message: string;
          jsonData: Record<string, any>;
        }) => {
          if (message.command === "sendData") {
            try {
              const host = "localhost";
              const port = parseInt(portNumber, 10);
              const response = await sendMessageToTcpServer(host, port, {
                message: message.message,
                payload: message.jsonData,
              });
              panel.webview.postMessage({
                command: "showResponse",
                response: response.response,
              });
            } catch (error) {
              panel.webview.postMessage({
                command: "showResponse",
                response: "Error sending data.",
              });
            }
          }
        },
        undefined,
        context.subscriptions
      );
    }
  );

  context.subscriptions.push(disposable);
}

function getWebviewContent(serverPort: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Send JSON Data</title>
  </head>

  <body>
    <h1>Connected to server port ${serverPort}</h1>

    <form id="jsonForm">
      <div class="input-wrapper">
        <label for="message" class="input-label">Name</label>
        <input
          type="input"
          class="input"
          placeholder="Message"
          name="message"
          id="message"
        />
      </div>

      <br /><br />

      <div class="input-wrapper">
        <label for="jsonData" class="input-label">JSON Data</label>
        <textarea
          class="input"
          placeholder="{}"
          name="jsonData"
          id="jsonData"
          rows="5"
          cols="30"
        ></textarea>
      </div>

      <br /><br />

      <button class="button-7" role="button" id="sendButton" type="button">
        Send
      </button>
    </form>

    <h3>Output</h3>
    <pre class="response" id="response"></pre>

    <script>
      const vscode = acquireVsCodeApi();

      document
        .getElementById("sendButton")
        .addEventListener("click", (event) => {
          const message = document.getElementById("message").value;
          const jsonData = document.getElementById("jsonData").value;

          try {
            const parsedJsonData = JSON.parse(jsonData);
            vscode.postMessage({
              command: "sendData",
              message: message,
              jsonData: parsedJsonData,
            });
          } catch (error) {
            document.getElementById("response").textContent =
              "Invalid JSON data.";
          }
        });

      window.addEventListener("message", (event) => {
        const message = event.data;
        if (message.command === "showResponse") {
          document.getElementById("response").textContent = JSON.stringify(
            message.response,
            null,
            2
          );
        }
      });
    </script>

    ${buttonCss}
    ${inputCSS}
    ${responseCSS}
  </body>
</html>
`;
}


export function deactivate() {}
