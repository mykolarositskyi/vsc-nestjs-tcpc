# VS Code TCP Client Extension for NestJS

This is a **VS Code extension** that allows you to easily send messages from your local VS Code environment to a **NestJS TCP server**. The extension acts as a client for a TCP server running in a NestJS application, sending JSON messages based on user input, and displaying the server's response within VS Code.

## Features

- **Connect to a NestJS TCP server**: Seamlessly interact with a NestJS server using TCP connections.
- **Send custom JSON messages**: Send messages to the server in JSON format, including a `message` and `data` payload.
- **Display server response**: Receive and display server responses within VS Code.

## Requirements

- **VS Code**: This extension works within Visual Studio Code.
- **NestJS TCP Server**: A NestJS microservice running with the TCP transport, which listens for specific message patterns.
- **Node.js**: Make sure you have Node.js installed.