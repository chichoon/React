# 4월 30일 (금요일) React.js 초급 02

## 1.2

- 프로젝트 폴더에는 node_modules, public, src라는 하위 폴더가 생성
  - **node_modules**는 건드리지 않음
  - **public**에는 웹사이트 패비콘, index.html, manifest.json이 있음
  - **src**에는 프로젝트를 이루는 파일들이 들어있음
- 리액트의 동작 원리는 웹에 사용하는 모든 요소들을 자바스크립트에서 제작하고, 이를 html에 첨부한다
  - App.js 파일 내의 요소들은 index.html 내의 root div 안에 모두 들어간다
  - 해당 요소들을 index.html 안에 밀어넣는 역할을 하는 것이 index.js
  - index.html은 텅 비어있다
  - 따라서 html 내에서 html 코드를 수정할 필요 없이 리액트를 통해 html을 손볼 수 있다
