# Q & A

### html 태그 vs 컴포넌트

```jsx
ReactDOM.render(
  <div>
    <LikeButton />
    <LikeButton />
    <LikeButton />
  </div>,
  document.querySelector("#root")
);
```

대문자로 시작하는 태그명 (`LikeButton`)은 컴포넌트

소문자로 시작하는 태그명 (`div`) 은 html 태그

클래스는 대문자로 시작해야 한다는 규칙이 있으므로 구분하기 쉽다

### JSX → babel 변환할 때

```jsx
ReactDOM.render(
  <div>
    <LikeButton />
    <LikeButton />
    <LikeButton />
  </div>,
  document.querySelector("#root")
);
```

태그 하나하나가 전부 createElement 형식으로 변환된다

### Babel

클래스, 화살표 ⇒ 함수 모두 ES6 문법이며 리액트는 이를 다 지원한다

babel을 사용하면 ES6 문법과 같은 실험적인 문법도 ES5처럼 모든 브라우저에서 돌아가는 문법으로 변환해준다

다만 세부 설정을 위해서는 Webpack이나 Babel tool이 필요

따라서 급하게 (세팅 필요 없이) JSX 또는 ES6 문법을 사용하고자 한다면 html head에 `babel script`를 추가하고 `type="text/babel"` 로 맞춰주기만 하면 된다

최신 메서드나 객체를 사용하기 위해서는 `babel-polyfill`을 추가하여야 한다

### ie10 브라우저

돼요

### state와 props

state와 props가 제일 중요하다

페이지 내에서 변경되는 값이 state
