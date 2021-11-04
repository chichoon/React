const path = require("path");
const webpack = require("webpack");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

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

  module: {
    rules: [
      {
        test: /\.jsx?/, //js 파일과 jsx 파일에 이 룰을 적용할 것이라는 뜻
        //정규표현식에 의하면, .js까지는 무조건 매치되어야 하고 x는 x가 존재하거나 존재하지 않는 경우만 판단
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["last 2 version", "> 10% in KR", "not dead"],
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel",
          ],
        },
      },
    ],
  },

  plugins: [new RefreshWebpackPlugin()],

  output: {
    //출력파일
    path: path.join(__dirname, "dist"), //__dirname은 현재 경로
    filename: "app.js",
  },

  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};
