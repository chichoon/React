const React = require("react");
const ReactDom = require("react-dom");

const WordRelay = require("./WordRelay"); //모듈 불러오는 부분

ReactDom.render(<WordRelay />, document.querySelector("#root"));
