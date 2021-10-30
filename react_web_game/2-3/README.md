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

   ```jsx
   module.exports = {};
   ```

   다음과 같이 입력

6. **client.jsx** 파일 생성

   ```jsx
   const React = require("react");
   const ReactDom = require("react-dom");
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

`npm list`를 입력하면 뭔가 설치된 것을 볼 수 있다

```bash
npx create-react-app <앱이름>
cd <앱이름>
npm start
```

이상의 커맨드와 설정들은 `create-react-app`을 통해서 자동으로 진행할 수 있으나 정확히 얘가 뭘 하는지 이해하기 힘들다

또한 `create-react-app` 시에 `eject`를 해주어야 하는데 `eject`의 역할을 알기 힘듦
