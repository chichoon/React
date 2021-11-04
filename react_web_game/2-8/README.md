# 클래스형 컴포넌트로 만들기

## 1. State 선언

```jsx
state = {
  word: "감자탕",
  value: "",
  result: "",
  resultList: "감자탕",
};
```

페이지에서 변화가 생기는 값을 전부 state로 지정한다

## 2. render 부분 구성

```jsx
render() {
	return (
		<>
			<div>{this.state.resultList}</div>
			<br />
			<div>현재 단어: {this.state.word}</div>
			<form onSubmit={this.onSubmitResult}>
			<input
				ref={this.onRefInput}
				value={this.state.value}
				onChange={this.onChangeInput}></input>
			</form>
			<div>{this.state.result}</div>
		</>
	);
}
```

`onSubmitResult` : 폼 제출이 일어났을 때 (`onSubmit`) 발생할 이벤트

`onRefInput` : `input` Reference를 담아주는 이벤트

`onChangeInput` : input 태그에서 값에 변동이 일어났을 때 발생하는 이벤트

`input` 태그에서 `value`와 `onChange`는 세트이며, `onChange`를 사용하지 않을것이라면 `defaultValue`를 사용하세요

참고: controlled input과 uncontrolled input

## 3. 각각의 이벤트 구성

### onSubmitResult

```jsx
onSubmitResult = (e) => {
  e.preventDefault();
  if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
    this.setState({
      result: "정답입니다",
      word: this.state.value,
      value: "",
      resultList: this.state.resultList + " - " + this.state.value,
    });
    this.input.focus();
  } else {
    this.setState({
      result: "오답입니다",
      value: "",
    });
    this.input.focus();
  }
};
```

우선 `e.preventDefault()` 를 통해 기본으로 지정된 동작이 동작하지 않도록 해준다

단어의 마지막 글자 (`this.state.word[this.state.word.length - 1]`) 가 입력한 단어의 첫 글자 (`this.state.value[0]`) 와 같다면 끝말잇기를 잘 이은 것이고, 아니면 오답

나머지는 state 설정이고, `this.input.focus()` 를 통해 input을 포커스해준다

뽀대용으로 지금까지 입력한 모든 글자가 창에 뜨도록도 해주었다

### onRefInput

```jsx
onRefInput = (c) => {
  this.input = c;
};
```

Ref를 통해 `input` 태그 그 자체를 `c`로 전달하여 `this.input`에 옮겨주었다

### onChangeInput

```jsx
onChangeInput = (e) => {
  this.setState({
    value: e.currentTarget.value,
  });
};
```

`e.target.value`는 실제로 이벤트가 발생한 요소를 가리킨다

`e.currentTarget.value` 는 이벤트 리스너가 부착된 요소를 가리킨다 (예시에서는 input)

예를 들어 검은색 버튼에 이벤트를 설정하였다면,

- 검은색 버튼을 누르면 `target`: 검은색 버튼, `currentTarget`: 검은색 버튼
- 노란색 버튼을 누르면 `target`: 노란색 버튼, `currentTarget`: 검은색 버튼

# 함수형 컴포넌트 + Hooks로 만들기

## 1. State 선언

```jsx
const [word, setWord] = useState("감자탕");
const [value, setValue] = useState("");
const [result, setResult] = useState("");
const [resultList, setResultList] = useState("감자탕");
const inputRef = useRef(null);
```

`setState` 대신 각각 `useState`를 사용해서 변수와 변수를 바꿔주는 담당함수를 설정한다

`inputRef` 또한 `useRef`을 통해 초기화한다 (null로 우선 초기화)

```jsx
const { useState, useRef } = React;
```

`React.useState` 와 `React.useRef` 대신 `useState`와 `useRef`을 쓰기 위해 파일 맨 위에 이 줄을 추가해주면 된다

## 2. render 부분 구성

```jsx
return (
  <>
    <div>{resultList}</div>
    <br />
    <div>현재 단어: {word}</div>
    <form onSubmit={onSubmitResult}>
      <input ref={inputRef} value={value} onChange={onChangeInput} />
      <button>클릭!</button>
    </form>
    <div>{result}</div>
  </>
);
```

`render()` 필요없이 바로 반환한다

## 3. 각각의 이벤트 구성

### onSubmitResult

```jsx
const onSubmitResult = (e) => {
  e.preventDefault();
  if (word[word.length - 1] === value[0]) {
    setResult("정답입니다");
    setWord(value);
    setResultList(resultList + " - " + value);
    setValue("");
    inputRef.current.focus();
  } else {
    setResult("오답입니다");
    setValue("");
    inputRef.current.focus();
  }
};
```

`setState` 대신 `set<변수명>` 등 아까 설정해둔 함수를 사용하여 각각의 변수를 세팅한다

또한 클래스 내의 메서드가 아니라 단일 함수이므로 `const`로 선언한다

### onChangeInput

```jsx
const onChangeInput = (e) => {
  setValue(e.currentTarget.value);
};
```

마찬가지로 `setState`대신 `setValue` 사용
