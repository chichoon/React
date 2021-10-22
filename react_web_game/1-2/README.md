# 첫 리액트 컴포넌트

리액트는 기본적으로 `JavaScript`로 구성되어 있으므로, `js` 파일로 저장한다

웹에는 `html`가 필요하므로 여기에 `js` 파일을 불러오는 식으로 제작

## html에서 javascript 불러오기

### js 파일을 가져오는 방법

```html
<html lang="en">
  <head> </head>
  <body>
    <script src="like-button.js"></script>
  </body>
</html>
```

### 내부에서 바로 작성하는 방법

```html
<html lang="en">
  <head> </head>
  <body>
    <script>
      //Javascript 코드 작성 영역
    </script>
  </body>
</html>
```

React 또한 Javascript로 이루어져 있기 때문에 두 가지 방법으로 모두 불러올 수 있다

## Webpack이란

리액트 프로젝트 (내부의 쪼개진 `javascript` 파일) 를 `html`에서 읽어들일 수 있는 `javascript` 파일로 만들어주는 역할

따라서 `html`에서 불러올 땐 `js` 파일 하나면 된다

## react CDN 불러오기

### 개발용

```html
<script
  crossorigin
  src="https://unpkg.com/react@17/umd/react.development.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"
></script>
```

### 배포용

```html
<script
  crossorigin
  src="https://unpkg.com/react@17/umd/react.production.min.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"
></script>
```

`react`는 리액트를 웹에서 동작시키기 위한 핵심적인 코드가 들어있음

`react-dom`은 `react` 코드를 웹에 붙여주는 역할

얘네 둘을 맨 처음에 미리 설치해 놓고 시작해야 하며, 배포 버전에서는 production 버전으로 교체해서 사용하여야 함

---

## 스크립트 작성

### html 내에 root div를 하나 작성

```html
<div id="root"></div>
```

### html 태그를 만들기

```jsx
const e = React.createElement;
```

### 컴포넌트를 만들기

```jsx
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return e(
      "button",
      { onClick: () => this.setState({ liked: true }) },
      "like"
    );
  }
}
```

`React` 라이브러리 안에 내장된 `Component`를 상속한 `LikeButton` 클래스를 만든다

내부의 생성자 (`constructor`) 는 `props`를 상속받아 사용하고 이는 그냥 기본적인 사항

`render` 메소드는 이전에 만들었던 태그 상수 e를 반환하되, 내부 속성을 설정해주고 반환한다

```jsx
return e("button", null, "Like");
```

이렇게 반환값을 설정하면

```html
<button>Like</button>
```

이라는 형식의 태그를 만들겠다는 뜻이다

첫 번째 인자값은 태그의 유형, 두 번째 인자값은 속성 (attribute), 세 번째 인자값은 내용물

---

## ReactDOM 사용하기

리액트에서 제작한 스크립트 (어떤 컴포넌트를 만들겠다 라고 설정한 사항들) 를 ReactDOM이 실제로 화면에 반영 (렌더링) 해주는 역할을 한다

우선 `html` `body` 내에 `script` 태그를 하나 더 만들고, ReactDOM을 통해 렌더링한다

```jsx
ReactDOM.render(e(LikeButton), document.querySelector("#root"));
```

`root` 라는 id의 원소에 값을 렌더링하겠다는 의미이다

결국 이 과정을 통해

```html
<div id="root">
  <button>Like</button>
</div>
```

이와 같이 `root`라는 태그의 `div` 안에 컴포넌트로 제작한 `button` 원소를 넣겠다는 것

실제로 html을 실행시켜 보면 like 버튼이 잘 렌더링 되고, root div 안에 버튼이 잘 들어가 있는 것을 볼 수 있다
