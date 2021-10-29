# React Hooks 사용하기

## Hooks

최근 리액트의 선호 방향: Class 사용하지 말고 Hooks로 만들어라

단 Class도 알긴 알아야 한다 (대부분의 코드가 Class로 작성되어 있기 때문)

```jsx
class Gugudan extends React.Component {
  //클래스형 컴포넌트
}

const Gugudan = () => {
  //함수형 컴포넌트
};
```

함수형 컴포넌트는 클래스에 비해 생성자가 없다거나 `render()` 가 없는 등 줄이 복잡하지 않고 간결하여 좋다

그래서 함수형 컴포넌트에서도 `setState`나 `ref` 등을 쓸 수 있도록 개선하였다 ⇒ 이게 바로 React Hooks

Hooks가 훨씬 간결하고 코드가 짧으며 Class를 Hooks로 전환하기도 쉽기 때문에 많은 사람들에게 사랑받고 있으며 리액트에서도 Hooks를 사용하기를 장려하고 있다

## 함수형 컴포넌트에서의 state 선언

```jsx
const GuGuDan = () => {
  const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState("");
  const [valueBefore, setValueBefore] = React.useState("");
};
```

이 선언부는 무조건 컴포넌트 내부에 넣어주어야 한다

```jsx
const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
const [value, setValue] = React.useState("");
```

`React.useState()` 의 괄호 안에 인자로 state의 초기값 (초기 상태) 이 들어간다

따라서 state가 만들어질 때 해당 값으로 초기화된다

또한 배열의 `set[state명]` (`setFirst`, `setValue` 등) 는 해당 변수 전용 `setState`라 보면 된다

(`setFirst`는 `first` 전용 `setState`)

여기서 `React.useState()`가 Hooks이고, 이러한 할당 방법을 **비구조화 할당** (구조분해 할당 = destructuring) 이라 한다

## 함수형 컴포넌트에서의 메서드

그냥 함수 선언하듯이 `const <함수명>` 으로 선언해주면 된다

단 클래스와 다르게 state 선언 및 `setState` 부분에서 차이점이 있기 때문에 소소한 수정점이 있다

### this.setState의 변화

```jsx
onChange = (e) => {
  this.setState({ value: e.target.value });
}; //클래스형 컴포넌트 안에서의 메서드 선언

const onChange = (e) => {
  setValue(e.target.value);
}; //함수형 컴포넌트 안에서의 함수 선언
```

`this.setState` 대신 각 state 값마다 배정받은 함수를 사용한다 (여기서는 `setValue`)

### ref의 변화

```jsx
const inputRef = React.useRef(null);
```

state값들이 선언되는 부분 (함수의 맨 위쪽) 에 `React.useRef` Hooks를 통해 ref 변수를 선언 및 초기화한다

(`React.useState()` 와 마찬가지로 괄호 안에 넣어준 인자로 값이 초기화된다)

```jsx
inputRef.current.focus();
```

사용할 때는 클래스형 컴포넌트와 조금 다르게 `<변수명>.current.focus()` 와 같이 사용한다

```jsx
<input
  ref={inputRef}
  type="number"
  value={value}
  onChange={this.onChangeInput}
/>
```

ref값을 받아올 때는 `ref={<변수명>}` 으로 아주 간단히 이루어진다

## 함수형 컴포넌트에서의 return

```jsx
return (
  <React.Fragment>
    <div>
      {first} 곱하기 {second} 는?
    </div>
    <form onSubmit={onSubmit}>
      <input
        ref={this.onRefInput}
        type="number"
        value={value}
        onChange={onChange}
      />
      <button> 입력 </button>
    </form>
    <div>
      {valueBefore} {valueBefore ? "=" : ""} {result}
    </div>
  </React.Fragment>
);
```

`render()` 내부에 있던 return과 똑같다

다만 `this.state` 또는 `this` 가 없이 변수명, 함수명을 바로 사용 (`this.state.value` ⇒ `value`)
