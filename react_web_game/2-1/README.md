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

---

# Class와 Hooks 비교하기

둘 다 취향차이로 쓰고싶은거 써도 되나 React 공식에서 추천하는건 Hooks

## setState

```jsx
//클래스형 컴포넌트
this.state = {
  first: Math.ceil(Math.random() * 9),
  second: Math.ceil(Math.random() * 9),
  value: "",
  result: "",
};

this.setState({
  result: "정답",
  first: Math.ceil(Math.random() * 9),
  second: Math.ceil(Math.random() * 9),
  value: "",
});

//함수형 컴포넌트 with Hooks
const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
const [value, setValue] = React.useState("");
const [result, setResult] = React.useState("");

setResult("정답");
setFirst(Math.ceil(Math.random() * 9));
setSecond(Math.ceil(Math.random() * 9));
setValue("");
```

```jsx
const [state, setState] = React.useState({
	first: Math.ceil(Math.random() * 9);
	second: Math.ceil(Math.random() * 9);
	value: '';
	result: '';
});
```

함수형 컴포넌트에서 `setState`를 비슷하게 사용하고 싶다면 위처럼 `useState`에 한 번에 여러 값을 넣으면 된다

다만 이때는 상태 값을 전부 바꿔주고 싶지 않을 때 (예를 들어 `value`랑 `result`만 바꿔주고 싶을 때) 바꾸지 않은 상태값 (명시되지 않은 상태값) 에 오류가 생긴다 (없어져버린다)

따라서 `setState` 시에 모든 state를 명시해야 한다는 부분에서 매우 귀찮아진다

```jsx
setResult((prevResult) => {
  return "정답: " + value;
});
```

이전의 상태값을 사용하여 현재의 상태값을 변화시켜 주고 싶은 경우에 인자로 다음과 같이 함수를 넣어주면 된다

## ref 사용 부분

```jsx
//클래스형 컴포넌트
input; //input reference 선언

onRefInput = (c) => {
  this.input = c;
};
// input을 input태그의 reference와 연결

this.input.focus(); // input을 통해 태그에 특정 조작을 가함

<input
  ref={this.onRefInput}
  type="number"
  value={this.state.value}
  onChange={this.onChange}
/>;

//함수형 컴포넌트
const inputRef = React.useRef(null); //input reference 선언 및 useRef 설정

inputRef.current.focus(); //input을 통해 태그에 특정 조작을 가함

<input ref={inputRef} type="number" value={value} onChange={onChangeInput} />;
```

## this 사용여부

```jsx
//클래스형 컴포넌트
{this.state.first} 곱하기 {this.state.second} 는?

if ( parseInt(this.state.value) ===
	this.state.first * this.state.second
)

//함수형 컴포넌트
{first} 곱하기 {second} 는?

if (parseInt(value) === first * second)
```

## 기타

Hooks가 Class형 컴포넌트보다 약 10줄 정도 짧으며, 이는 나중에 코드가 길어질 수록 줄어드는 양 또한 늘어난다

다만 Hooks는 State의 값이 바뀔 때마다 함수 전체가 다시 실행되므로, 웹이 조금 더 느려질 수 있다

`setResult`, `setFirst` 등등 상태값 설정 시마다 렌더링이 계속 반복적으로 일어날 것 같은데, 사실 리액트 측에서 상태값 설정 함수들을 한번에 실행시키기 때문에 (비동기 방식) 실질적인 렌더링은 한 번만 일어난다

```jsx
<button className="name1">허허허</button>
<label htmlFor="(id)">라벨</label>
```

리액트에선 태그 속성을 줄 때 `class`를 사용할 수 없고 `className`이라 해야한다

마찬가지로 `label` 태그에서 `for` 속성 또한 `htmlFor`로 사용한다
