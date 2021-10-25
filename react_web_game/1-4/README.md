# JSX와 바벨 (babel)

## 여담

컴포넌트 하나 = 클래스 하나

생성자에서는 컴포넌트 내에서 사용할 state를 담는다는 것만 우선 기억하자

## JSX

```jsx
render() {
  return e(
	  //태그의 속성이 들어가는 자리
    //첫 번째 인자는 태그의 유형, 두 번째 인자는 속성, 세 번째는 내용물
	  "button", //태그의 유형 (button element)
    {
      onClick: () => {
        //버튼 속성 1
        console.log("button clicked"); //버튼 클릭 시에 실행되는 문
        //로그에 button clicked가 출력된다
        this.setState({ liked: true }); //상태 (state) 를 변경해주는 문
        //버튼을 누르면 liked가 true로 변경된다
      },
      type: "submit", //버튼 속성 2 (타입)
    },
	  this.state.liked === true ? "Liked" : "Like"
  );
}
```

이것은 너무나도 가독성이 떨어지는 코드입니다

무엇을 얘기하고자 하는 건지 전혀 모르겠는 코드

```jsx
render() {
          return (
            <button type="submit" onClick={() => {
                this.setState({
                  liked: this.state.liked ? false : true,
                });
              }}>
              {this.state.liked ? "Liked" : "Like"}
            </button>
          );
        }
      }
```

`React.createElement`를 통해 e를 만들 필요가 없어졌고, html 태그가 직관적으로 보이기 때문에 가독성이 좋아졌다

또한 태그와 컨텐츠 내부에 {} (중괄호) 를 이용하면 자바스크립트 문법을 사용할 수 있다

물론 `this.state.liked === true` 또한 `this.state.liked`가 `true`이면 그 자체로 참이기 때문에 굳이 `=== true`를 적을 필요가 없었다

```jsx
ReactDOM.render(<LikeButton />, document.querySelector("#root"));
```

DOM을 통한 렌더링 시에도 `e(LikeButton)` 대신 html 태그로 넣으면 끝

e를 만들어서 인자값을 넣는 것보다 훨씬 간단명료한 방법임을 볼 수 있다

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

같은 컴포넌트의 원소 3개를 만들고 싶다면 이런 식으로 내부에서 복붙만 하면 된다

다만 JSX 문법에서 여러 요소를 반환하거나 인자로 넣고 싶다면 반드시 부모 요소 하나가 감싸는 형태 (예시에서는 `div`) 를 취해야 한다

리액트가 사용하는 Virtual DOM 방식에서는 컴포넌트 변화를 효율적으로 감지하고자 컴포넌트 내부는 단 하나의 DOM 트리 구조로 이루어져야 한다는 규칙을 갖고 있기 때문

원소 3개를 만들면 3개는 각각 독립적으로 동작한다

컴포넌트를 클래스로 선언했기 때문에, `liked` 라는 status는 각 원소마다 독립적으로 들어가는 상태값이기 때문이죠

### JSX

이러한 태그 문법을 **JSX**라고 부르는데, JavaScript + XML을 뜻한다

이름에서 볼 수 있듯 html보다 xml에 더 가까운 문법이다

html은 `<LikeButton>` 만으로도 사용이 가능하지만, JSX는 xml과 닮아있기 때문에 `<LikeButton />` 이처럼 닫는 괄호 형식으로 꼭 만들어 주어야 좋다 (문법이 더 엄격하다)

## Babel

다만 이러한 방식에 문제점이 하나 있다면, 자바스크립트 그 자체에서는 저러한 태그 문법을 지원하지 않기 때문에 **바벨 (Babel)** 을 사용하여야 태그 문법이 해석이 된다

바벨을 사용하지 않으면 html 파일을 열어도 리액트로 만든 컴포넌트가 하나도 표시되지 않는 것을 볼 수 있다

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

html 최상단 `head`의 React, React-DOM 추가한 곳에 같이 추가하시오.

(디버그가 아닌 실 프로젝트라면 이러한 방법 대신 리액트 프로젝트 내부에 설정하는 것을 추천)

```html
<script type="text/babel">
```

또한 자바스크립트 코드가 담긴 `script` 블록의 `type`을 `text/babel` 로 지정해 주어야 한다

오류 없이 잘 나오는 것을 확인할 수 있을 것

이러한 동작이 이루어지는 이유는 바벨이 알아서 html 태그를 이용한 문법을 앞서 살펴봤던 `const e = createElement()` 와 인자값 3개를 넣는 문법으로 바꿔주기 때문에다
