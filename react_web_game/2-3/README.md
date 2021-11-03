# 웹팩 설치하기

## 웹팩을 왜 쓸까요

html 하나만 있어도 내부에서 자바스크립트를 사용가능하지만, 실무에서 컴포넌트가 하나인 경우는 절대 없다

사이트가 복잡할 수록 컴포넌트가 종류별로 매우 다양하고.. 줄도 길고...

페이스북 컴포넌트는 2만개라네요 (따헉) 실무에서는 수백 ~ 수천 개의 js 파일을 사용하기도 하고

여튼 이런 경우에는 유지보수도 점점 힘들어짐...

또 다른 방법으로 .js 파일을 `html src`로 불러오는 방법도 있겠으나 스크립트간의 중복이 발생할 수 있다

개발자의 원칙은 중복을 제거해야 하는 것 ⇒ 중복 제거가 쉽지가 않다 (컴포넌트가 2만개면...)

이것 때문에 고생을 하다가 웹팩이라는 시스템을 만들어 냄

이 웹팩은 여러 개의 자바스크립트 파일을 하나로 합칠 뿐만 아니라 바벨을 적용하거나 `console.log` 등 배포 단계에서 쓸모 없는 라인을 전부 삭제할 수 있는 기능 또한 있다

웹팩을 사용하려면 node에 대하여 알아야 함

### node는 백엔드 프레임워크가 아닌가요?

자바스크립트 실행 환경 입니다 (서버 아님!!!)

자바스크립트 실행기는 자바스크립트를 실행시켜줄 뿐이기 때문에 웹팩을 돌리기 위해서 노드 실행이 필요하다 이거입니다

노드랑 npm 설치 하세요

## node로 웹팩 세팅하기

1. 프로젝트 폴더 내에서 `npm init`
2. 다음 입력값들은 적당히 입력

   ```jsx
   package name: (2-3) test
   version: (1.0.0)
   description:
   entry point: (index.js)
   test command:
   git repository:
   keywords:
   author:
   license: (ISC)
   ```

3. 이상의 입력값을 잘 입맛대로 입력하면 package.json이 생긴다

   여기에 리액트 개발에 필요한 모든 패키지를 넣으면 된다

4. 설치할 패키지들

   1. `npm i react react-dom`
   2. `npm i -D webpack webpack-cli`

      D의 의미는 해당 패키지를 개발 (Development) 용으로만 사용하겠다는 의미 (Dev-dependencies)

5. **webpack.config.js** 파일 생성
6. **client.jsx** 파일 생성

   ```jsx
   const React = require("react");
   const ReactDom = require("react-dom");

   ReactDom.render(<WordRelay />, document.querySelector("#root"));
   ```

   다음과 같이 입력 (React, ReactDOM 불러오는 라인)

   굳이 jsx 확장자를 쓰는 이유는 밑에 jsx 문법을 쓸 일이 있으면 jsx로 해주는 것이 좋음

   그래야 jsx 문법을 갖고 있는 React 파일이라는 점이 눈에 확연히 들어오기 때문

7. **index.html** 파일 생성

   다만 이제 이전처럼 `script` 태그를 통해 react, reactDOM, babel 등을 불러올 필요가 없다

   npm에서 다 불러와주기 때문

   ```jsx
   <div id="root"></div>
   <script src="./dist/app.js"></script>
   ```

   body에 이 두 줄은 추가한다

### create-react-app

```bash
npx create-react-app <앱이름>
cd <앱이름>
npm start
```

이상의 커맨드와 설정들은 `create-react-app`을 통해서 자동으로 진행할 수 있으나 정확히 얘가 뭘 하는지 이해하기 힘들다

또한 `create-react-app` 시에 `eject`를 해주어야 하는데 `eject`의 역할을 알기 힘듦

## 컴포넌트 파일 분리하기

### 모듈 분리 및 내보내기

```jsx
const React = require("react"); //쓰이는 애들 추가하기
const { Component } = React;

class WordRelay extends Component {
  state = {};

  render() {}
}

module.exports = WordRelay;
```

한 파일에 컴포넌트 개수가 많아지면 가독성이 떨어지므로 파일 분리가 필수불가결하다

분리할 땐 파일을 새로 만들어주되 해당 파일에서 사용하는 라이브러리 (Ex. React) 는 따로 불러와준다

( `const React = require("react");` 라인)

또한 맨 마지막줄에 다른 파일에서도 사용하기 위해 내보낼 컴포넌트 모듈을 적어준다

( `module.exports = WordRelay;` 라인)

이것이 바로 node에서의 모듈 시스템

```jsx
const { Component } = React;
const { useState, useRef } = React;
```

또한 `React.Component`나 `React.useState` 이렇게 앞에 일일히 `React`를 붙이기 귀찮다면 이렇게 사용할 라이브러리만 따로 불러올 수도 있다

이렇게 하면 `Component`, `useState` 처럼 모듈 그 자체만 쓸 수 있음

### 모듈 불러오기

```jsx
const React = require("react");
const ReactDom = require("react-dom");

const WordRelay = require("./wordRelay"); //모듈 불러오는 부분

ReactDom.render(<WordRelay />, document.querySelector("#root"));
```

내보내기한 컴포넌트 모듈은 다음과 같이 불러온다 (상대경로)

이 방식을 사용하면 모든 모듈을 한번에 불러올 필요 없이 내가 필요로 하는 모듈만 골라 가져올 수 있어서 편리하고 효율적이다

옛날 방식으론 만약 2만개의 모듈이 있으면 그 중 5개만 사용하더라도 2만개를 다 불러왔어야 하는데, 지금은 모듈 시스템 덕에 딱 5개만 불러와서 사용할 수 있게 됨

# 웹팩 설정하기

```html
<script src="./dist/app.js"></script>
```

html src에는 딱 하나의 js 파일만을 불러올 수 있는 것이 문제다

따라서 위의 방법으로 모듈을 별개의 js 파일로 분리하면 html에서 읽어올 방법이 없다 (하나의 js 파일에 몰아넣지 않는 이상)

이 때문에 웹팩을 사용한다

## webpack.config.js

웹팩은 webpack.config.js에 설정된 대로 돌아간다

```jsx
const path = require("path");

module.exports = {
  name: "wordrelay-setting",
  mode: "development",
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },

  //중요한 애들
  entry: {
    //입력파일
    app: ["./client.jsx", "./wordRelay.jsx"],
  },

  module: {
    //적용할 규칙
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },

  output: {
    //출력파일
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  },
};
```

1. `name`: 해당 설정의 이름 (아무거나 하시오.)
2. `mode`: 해당 설정의 모드
   1. 개발 단계라면 `development`
   2. 배포 단계라면 `production`
3. `devtool`: 소스 맵 생성 여부와 방법 제어

   1. 개발 단계라면 `eval` (일단 이걸로 세팅)
   2. 배포 단계라면 `hidden-source-map`

   자세한건 [여기](https://runebook.dev/ko/docs/webpack/configuration/devtool)서... `eval`이 빌드 빠름 재구축 빠름 으로 나와있음

4. `resolve`: 모듈 해석에 대한 설정 (경로나 확장자 등..)
   1. `extensions`: 사용할 파일들의 확장자 배열
5. `entry`: 입력 파일들 **(중요)**
   1. `app`: 사용할 파일들 (예시와 같이 배열로 불러오면 된다)
6. `module`: 입력 파일에 적용할 규칙 (이 규칙을 적용하여 출력 파일을 만든다)

   1. `rules`: 실질적인 규칙의 내용

      1. `test`: 규칙을 적용할 파일

         예시에서 해당 규칙에는 `//` 사이에 정규표현식이 포함되어 있다

         `\.`는 .을 특수문자 처리하지 않고 텍스트 일치 여부를 체크하겠다는 뜻

         `jsx?` 는 js 또는 jsx와 일치하는지 판단한다

         (이때 x 옆에 붙은 물음표는 x가 아예 포함되지 않거나, 무조건 들어있는 두 가지 경우를 판단한다)

      2. `loader`: 사용할 로더
      3. `options`: 적용할 추가 옵션
         1. `presets`: 옵션 프리셋

7. `output`: 출력 파일들 **(중요)**
   1. `path`: 출력 파일의 경로
   2. `filename`: 출력 파일의 이름

## 바벨 설치

```bash
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

마찬가지로 개발용으로 설치

**babel/core**가 바벨 본체, **babel/preset-env**가 브라우저에 맞춰 옛날 문법을 지원해주는 기능

**babel/preset-react**는 jsx 등을 지원해줌

**babel-loader**는 바벨과 웹팩을 연결해주는 기능

## 한 jsx 파일이 다른 jsx 파일의 모듈을 불러올 때

```jsx
const React = require("react");
const ReactDom = require("react-dom");

const WordRelay = require("./WordRelay"); //모듈 불러오는 부분

ReactDom.render(<WordRelay />, document.querySelector("#root"));
```

여길 확인해보면 **client.jsx** 파일이 `WordRelay` 모듈을 불러오고 있다

이러한 경우 **client.jsx** 파일은 **wordRelay.jsx**를 불러와 사용하므로 웹팩이 이 부분을 알아서 처리한다

```jsx
entry: {
	app: ["./client.jsx"],
},
```

따라서 **wordRelay.jsx**는 굳이 불러올 필요 없다 웹팩이 알아서 하기 때문에

## entry 파일의 확장자

```jsx
resolve: {
	extensions: [".js", ".jsx"],
},
```

config 파일에서 `module.exports`에 다음과 같이 추가해주면 웹팩이 알아서 .js, .jsx 확장자를 가진 파일을 찾는다

```jsx
entry: {
	app: ["./client"],
},
```

따라서 확장자도 붙일필요없다

# 웹팩으로 빌드하기

`webpack` 명령어만 사용하면 `command not found`라며 아무런 동작도 하지 않는 것을 볼 수 있다

이는 웹팩을 현재 프로젝트 상에서만 설치했기 때문에 (가상환경처럼) 전역 명령어로 등록이 안 되어 있기 때문

## package.json에 등록하기

```jsx
"scripts": {
    "dev": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

**package.json** 파일의 `scripts` 항목에 추가한다 (이름은 뭘로 해도 상관없다)

그리고 `npm run <설정한 이름>` 으로 실행시킨다 (예시에선 `npm run dev`)

내부 코드 문제로 에러가 나긴 하는데.. 아무튼 작동은 한다

또한 설정한 폴더에 설정한 출력 파일 (예시에서는 app.js) 이 저장되어 있는 것을 볼 수 있다

## npx 사용하기

**npm**은 자바스크립트 패키지 관리 모듈, **npx**는 npm 레지스트리에 올라간 패키지를 쉽게 설치하고 관리할 수 있도록 해주는 명령어 도구이다

**npm** = 패키지 관리자, **npx** = 패키지 실행기 라고 생각하면 될 듯

npm 버전 5.2.0 이상이면 npx는 디폴트로 설치되어 있다

프로젝트 루트 폴더에서 `npx webpack` 명령어를 입력하면 아까와 마찬가지로 실행이 잘 된다

성공적으로 빌드가 되었다면 에러 없이 빌드 성공 문구가 제대로 출력되는 것을 볼 수 있다

app.js 파일을 열어보면 상당히 무슨말인지 모르겠는... 코드가 있으나 아무튼 쓰면 된댄다

```html
<body>
  <div id="root"></div>
  <script src="./dist/app.js"></script>
</body>
```

`body`에서 app.js 스크립트를 불러온 html 파일도 열어보면 잘 동작을 한다

# @babel/preset-env

```jsx
module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },
```

`"@babel/preset-env"` 는 자동으로 옛날 브라우저를 지원해주는 모듈로, 수십 개의 플러그인들의 집합

플러그인들이 많기 때문에 설정할 내용들이 많다

```jsx
presets: [
	["@babel/preset-env",
		{
			targets: {
				browsers: ["last 2 chrome versions"],
			},
		},],
	"@babel/preset-react",
],
```

`"@babel/preset-env"` 의 상세설정을 바꾸고 싶다면 먼저 대괄호 (`[]`) 를 열고 첫 번째 원소로 `"@babel/preset-env"` 를 넣고, 두 번째 원소로 중괄호 (`{}`) 를 열어 설정을 적어넣는다

예시의 `targets`는 해당 코드가 지원할 환경을 적을 수 있고, 내부의 `browsers: ["last 2 chrome versions"],` 같은 경우는 최신의 두 크롬 브라우저만을 지원하겠다는 뜻이다

이 설정이 중요한 이유는 옛날 브라우저일수록 지원이 힘들어지기 때문에, 바벨에서 매번 옛날 브라우저에 맞춰서 컴파일하면 바벨의 작업량이 많아져 속도가 굉장히 느려진다

따라서 지원을 원하는 브라우저에서만 구동되도록 한정하는게 중요

브라우저 한정을 원하지만 타겟을 어떻게 잡을지 감이 안 온다면 [링크](https://github.com/browserslist/browserslist) 참고

```jsx
targets: {
	browsers: ["last 2 version", "> 5% in KR", "not dead"],
},
```

만약 이렇게 타겟을 잡는다면 최신의 두 버전만, 한국 (KR) 에서 점유율 5% 넘는 것만, 죽지 않은 브라우저만 지원한다

---

# 여담

## npm에서 추가된 라이브러리 패키지 확인하기

`npm list`를 입력하면 뭔가 설치된 것을 볼 수 있다

## path 라이브러리

```jsx
const path = require("path");

[...]

path: path.join(__dirname, "dist"),
```

`path` 라이브러리는 node 설치 시 내장되어있는 라이브러리

`require` (`#include`나 `fromimport`와 비슷하다) 을 통해 `path` 라이브러리를 불러온다

`path.join()` 함수를 통해 경로를 합칠 수 있다 (파이썬의 그것과 매우 유사)

`__dirname` 은 현재 경로가 들어간다

```jsx
path: path.join(__dirname, "dist"),
```

따라서 해당 라인은 `path: '<현재경로>/dist'` 로 설정해주는것
