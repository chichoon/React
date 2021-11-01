const path = require("path"); //path 라이브러리 불러오기
//node 설치했다면 path는 자동으로 설치된다

module.exports = {
  name: "wordrelay-setting", //설정의 이름
  mode: "development", //설정의 모드 (실 서비스에서는 production으로, 개발중에는 development)
  devtool: "eval", //툴 속도 빠르게
  resolve: {
    extensions: [".js", ".jsx"],
  },

  //중요한 애들
  entry: {
    //입력파일
    app: ["./client"],
  },
  output: {
    //출력파일
    path: path.join(__dirname, "dist"), //__dirname은 현재 경로
    filename: "app.js",
  },
};
