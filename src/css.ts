export const buttonCss = `
  <style>
    .button-7 {
      background-color: #0095ff;
      border: 1px solid transparent;
      border-radius: 3px;
      box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0 0 inset;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-family: -apple-system, system-ui, "Segoe UI", "Liberation Sans", sans-serif;
      font-size: 13px;
      font-weight: 400;
      line-height: 1.15385;
      margin: 0;
      outline: none;
      padding: 8px 0.8em;
      position: relative;
      text-align: center;
      text-decoration: none;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      vertical-align: baseline;
      white-space: nowrap;
    }

    .button-7:hover,
    .button-7:focus {
      background-color: #07c;
    }

    .button-7:focus {
      box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
    }

    .button-7:active {
      background-color: #0064bd;
      box-shadow: none;
    }
  </style>
`;

export const inputCSS = `
  <style>
    .input-label {
      font-size: 16px;
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
    }

    .input {
      border: 1px solid black;
      border-radius: 2px;
      padding: 8px 16px;
      margin-top: 2px;
    }
  </style>
`;

export const responseCSS = `
  <style>
    pre {
      margin: 10px 0px 0px 0px;
      background-color: #f4f4f4;
      padding: 20px;
      border-radius: 5px;
      font-family: monospace;
      white-space: pre-wrap;
      color: #000;
    }
  </style>
`;
