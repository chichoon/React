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
