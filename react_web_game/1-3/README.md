# HTML 속성과 상태 (state)

## 기본적으로 알아야 할 사항

### `root` div

React를 사용하려면 HTML 내에 `root`라는 id를 가진 `div` 태그가 하나 필요하다

React에서 만들어져 렌더링되는 모든 태그들은 이 `root` div 안에 들어간다

### `render` 내에서 `return` 시의 인자값

```jsx
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
  }
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
        },
        type: "submit", //버튼 속성 2 (타입)
      },
      "like" //태그 내용물
    );
  }
}
```

- 첫 번째 인자값에는 태그의 유형 (`div`, `button`, `span` 등...) 이 들어간다

- 태그의 Attribute는 react 컴포넌트에서 `render()` 시에 2번째 인자값으로 넣어줄 수 있다

  - 예를 들어 버튼 같은 경우는 `onClick` Attribute가 거의 필수적인데 (버튼을 눌렀을 때 동작이 정의되어야 하므로) 클릭 시에 어떤 동작을 할 지 정의하는 부분이 이 인자값의 중괄호 안에 들어간다

  - 물론 넣을 Attribute가 없다면 `Null`로 맞춰 주면 된다

- 3번째 인자값에는 태그 안의 내용물이 들어간다 (텍스트 등..)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/baea9b2b-78f3-40f2-bda8-89741599ea5b/Untitled.png)

위와 같이 버튼의 속성을 맞춰 주었을 때, 버튼을 누를 때마다 **button clicked**가 출력되는 것을 볼 수 있다

---

## State (상태)

화면 상에서 특정 조작을 했을 때 바뀔 수 있는 값, 바뀔 수 있는 부분을 상태라고 한다

```jsx
const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //이 곳에 상태 (바뀔 수 있는 값) 를 모두 적어준다
      liked: false, //초기 상태를 일단 적어준다
    };
  }
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
      //이 컴포넌트의 state인 liked가 true라면 3번째 인자값인 내용물 (content) 은 "Liked", 그 외에는 "Like"
    );
  }
}
```

컴포넌트 내의 모든 State들은 생성자의 `this.state` 내에 선언된다

이때 초기화는 기본적으로 가지고 있는 값을 지정해 준다

`state`는 `render` 시에 동작을 정의해 줄 때 `this.setState` 메소드로 값을 변경해 줄 수 있다

위의 예시에서는 버튼을 누를 때 (`onClick`) `liked`라는 state가 `false`에서 `true`로 변경된다

```jsx
this.state.liked === true ? "Liked" : "Like";
```

컴포넌트 내에서 `state`는 어디에서든 `this.state.<상태명>` 으로 접근할 수 있다

```jsx
this.setState({
  liked: this.state.liked === true ? false : true,
}); //상태 (state) 를 변경해주는 문
```

같은 방식으로 `liked`가 `true`이면 `false`로, `false`이면 `true`로 바꿔주는 방식도 가능하다

곁다리: 자바스크립트에서 `==`는 강제 형변환을 시도하고, `===`는 형변환을 시도하지 않는다

### state의 장점

state를 잘 사용하면 화면과 데이터를 리액트가 알아서 연동시켜 주기 때문에 화면에서 값의 변화 등을 주기 간단해진다

버튼 1개밖에 없는 간단한 코드에서는 이러한 형식이 복잡해보이지만, 실제 서비스에서 다양한 컴포넌트를 만들어서 사용할 때는 훨씬 더 효율적임을 깨달을 수 있음

다만 위와 같은 선언 방법은 원시적이고 (legacy) 가독성도 떨어지며 최근에는 조금 다른 방법을 사용한다

---

## 번외: 리액트 확장 프로그램

설치하면 요소들을 Element 단위가 아닌 Components 단위로 볼 수 있어요
