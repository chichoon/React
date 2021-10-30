# 구구단 리액트로 만들기

## 컴포넌트 기본 형태

```jsx
class GuGuDan extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return;
  }
}
```

## 상태 변경할 때

`this.setState()` 를 활용하는 것이 좋다

값을 바로 넣어주기보단 이러한 방법을 써야 상태를 함부로 바꾸지 않아 에러가 덜 난다

```jsx
<input
  type="number"
  value={this.state.value}
  onChange={(e) => this.setState({ value: e.target.value })}
/>
```

이 방법으로 input에 변화가 일어났을 때 (`onChange`) state 중 하나인 value를 `e.target.value` 값 (변경된 값) 로 변경한다

값을 직접 입력하는 것보다 이러한 방법을 사용하는 것이 상태값을 바꾸기에 안전하다

e를 `console.log`를 통해 찍어보면 `onChange` 이벤트 시 발생하는 인터페이스임을 알 수 있다

따라서 이벤트가 일어났을 때 (`onChange`) 변화가 일어난 값이 `e.target` 내의 변수 (`e.target.value`) 로 저장된다

이 `e.target.value`를 state인 `value`로 설정해 주면 `input`의 `value`가 같이 변하면서 화면 상에 출력되는 것

다른 이벤트도 마찬가지 방법으로 동작한다

## state로 설정해 주어야 하는 값

```jsx
constructor(props) {
	super(props);
	this.state = {
		//바뀌는 값들이 속성으로 여기에 추가가 된다
		first: Math.ceil(Math.random() * 9),
		second: Math.ceil(Math.random() * 9),
		value: "",
		result: "",
	};
}
```

자동으로 바뀌는 값을 넣기보단 수동으로 `setState()` 로 직접 바꿔주어야 하는 값을 넣어야 한다

## on 시리즈 (자바스크립트 기본 문법)

`onClick`, `onChange`, `onSubmit`, `onLoad`, `onInput`, `onFocus`, `onBlur` 등

## Javascript와 JSX 왠만하면 섞어쓰지 말자

```jsx
render() {
	return (
		<div>
			<div>
				{this.state.first} 곱하기 {this.state.second} 는?
			</div>
			<form onSubmit={this.onSubmit}>
				<input
					type="number"
					value={this.state.value}
					onChange={this.onChange}
				/>
				<button> 입력 </button>
			</form>
			<div>{this.state.result}</div>
		</div>
		);
	}
}
```

`onSubmit`과 `onChange` 시에 동작하는 함수들은 컴포넌트 클래스의 메소드로 만들고 `this.onSubmit`이나 `this.onChange` 등으로 불러오는 것이 가독성에 좋다

이렇게 하면 JSX 파트는 태그만 남아 있고 자바스크립트 로직들은 클래스 메소드로 저장되어 있어 보기 편함

## 폼 제출 시 이벤트 설정 (onSubmit)

```jsx
onSubmit = (e) => {
  e.preventDefault();
  if (parseInt(this.state.value) === this.state.first * this.state.second) {
    this.setState({
      result: "정답",
      first: Math.ceil(Math.random() * 9),
      second: Math.ceil(Math.random() * 9),
      value: "",
    });
  } else {
    this.setState({
      result: "오답",
      value: "",
    });
  }
};
```

`e.preventDefault()`는 `onSubmit` 시 기본적으로 동작하도록 설정되어 있는 고유의 동작을 중단시킨다

따라서 사용자가 설정한 동작만 실행될 수 있도록 해주는 것

`e.stopPropagation()` 도 있다는데 얘는 상위 원소에 이벤트가 전달되지 않도록 막아 주는 역할

## React.Fragment

```jsx
<div>
  <div>
    {this.state.first} 곱하기 {this.state.second} 는?
  </div>
  <form onSubmit={this.onSubmit}>
    <input type="number" value={this.state.value} onChange={this.onChange} />
    <button> 입력 </button>
  </form>
  <div>
    {this.state.valueBefore} {this.state.valueBefore ? "=" : ""}{" "}
    {this.state.result}
  </div>
</div>
```

JSX는 여러 태그를 한번에 반환할 때 무조건 하나의 태그 안에 감싸서 넣기를 요구한다 ([이유](https://www.notion.so/1-4-JSX-Babel-71a227b937d74cd49d08a947f4b0d8aa))

하지만 쓸모없는 div가 추가되면 나중에 css 효과 적용 시에도 불편하고 여러모로 귀찮아짐

```jsx
<React.Fragment>
  <div>
    {this.state.first} 곱하기 {this.state.second} 는?
  </div>
  <form onSubmit={this.onSubmit}>
    <input type="number" value={this.state.value} onChange={this.onChange} />
    <button> 입력 </button>
  </form>
  <div>
    {this.state.valueBefore} {this.state.valueBefore ? "=" : ""}{" "}
    {this.state.result}
  </div>
</React.Fragment>
```

`React.Fragment`를 사용하면 새로운 태그가 생성되지 않음 (더미 태그처럼)

따라서 Root `div` 하위에 `div` 없이 바로 컴포넌트가 배치된다

## 함수형 setState

상태 (state) 를 변화시키면 화면의 값도 자동으로 수정된다

다만 `setState`에서 set되는 상태는 미래에 set될 값이고, 내부에서 불러와지는 `this.state.<상태이름>` 은 방금 불러온 과거의 값이라 이 부분에서 헷갈릴 수 있다

헷갈림을 덜기 위해 `setState`를 함수처럼 사용하여 반환값에 state를 지정하는 방법이 있다

```jsx
this.setState((prevState) => {
  return {
    result: "정답",
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    valueBefore: prevState.value,
    value: "",
  };
});
```

이 방법을 사용할 경우 인자의 `prevState`에는 직전 상태값이 저장된다

이 값을 다음에 변경해줄 상태값 (`return` 내의 `state` 세팅값들) 에서 사용할 수 있다

이러한 방법을 사용하는 이유는 `setState`가 비동기이기 때문

```jsx
this.setState({
  value: this.state.value + 1,
});
this.setState({
  value: this.state.value + 1,
});
this.setState({
  value: this.state.value + 1,
});
// 예상값: value는 이전 value값 + 3
// 실제값: + 1일 수도 있음
```

`setState`가 비동기이면 이러한 케이스에서 이전값 + 3이 아니라 + 1이 될 수도 있다

예전 값 (이전 state) 로 새로운 값 (새로운 state) 을 만들 때는 함수형 `setState`를 이용하기

(return을 이용한 state 설정 방식)

## ref

리액트가 화면을 다루고, 우리는 데이터만 다룰 수 있도록 해야 분업이 잘 된다

특정 태그에 효과를 주고 싶을 때 (예시: 매번 정답 / 오답 판정 후 `input`에 focus를 주고자 할 때) = DO에 직접 접근하고 싶을 때에 `document.querySelector` 대신 `ref`를 쓰는 방법이 있다

```jsx
class GuGuDan extends React.Component {
	//state들 생략
	onSubmit = (e) => {
		e.preventDefault();
			if (
				parseInt(this.state.value) ===
				this.state.first * this.state.second
			) {
			this.setState({
				//생략
				});
			this.input.focus(); //document.querySelector(input).focus();
		} else {
			this.setState({
				//생략
				});
			this.input.focus(); //document.querySelector(input).focus();
			}
		};
		onChange = (e) => {
			this.setState({ value: e.target.value });
		};
	input;
	render() {
		return (
			<React.Fragment>
				{//기타 원소들 생략}
				<form onSubmit={this.onSubmit}>
					<input
						ref={(c) => {
						this.input = c;
						}}
						//생략
					/>
				{//기타 원소들 생략}
				</form>
			</React.Fragment>
		);
	}
}
```

여기서

```jsx
<input
  ref={(c) => {
    this.input = c;
  }}
/>
```

`ref`를 통해 c에 `input` 태그 그 자체를 넣어주고, 이 클래스 (`this`) 의 `input` 변수에 c를 담음으로써 input 태그 바깥에서도 해당 태그에 접근할 수 있도록 한다

```jsx
<input
  ref={this.onRefInput} //함수로 따로 빼준 부분
  type="number"
  value={this.state.value}
  onChange={this.onChange}
/>
```

이 `ref = {}` 내에 있는 함수 또한 메서드로 뺄 수 있다

메서드로 따로 빼 주는 이유는 `render()` 이 새로 실행될 때마다 render의 JSX 내에 있는 함수가 계속 새로 생성되고, `render()` 는 생각보다 굉장히 자주 실행되기 때문에 함수가 만약 복잡한 구조를 갖는다면 굉장히 낭비가 심할 것이다

---

# 팁

## Math: floor, ceil, round

`Math.floor(숫자)` : 소수점 이하를 버림

`Math.ceil(숫자)` : 소수점 이하를 올림

`Math.round(숫자)` : 소수점 이하를 반올림

## 괄호 종류

`( )` 는 그룹 연산자로, 사실 있어도 없어도 똑같은 동작을 한다

한 가지 유의미한 곳이 **우선순위 높일 때** 밖에 없음

`return` 시에 소괄호로 묶는 등 굳이 소괄호로 묶어줄 필요가 없다는 뜻, 다만 있으면 좀 깔끔하고 보기좋다

## onSubmit과 button에서의 onClick

`form`에서는 `onSubmit`을 쓰고, `form`이 없는 경우는 `onClick`을 쓰면?

## 함수를 클래스 (컴포넌트) 내에서 정의할 때

무조건 ⇒ (화살표) 함수 써야 한다

직접 함수를 정의하는 경우 `function (e)` 로 선언하면 `this`의 의미가 다르게 적용된다

다만 render() 는 화살표 없이 그냥 선언해서 사용

## Constructor (생성자) 가 뭔지 몰라요

그럼 지워도 상관없다

다만 `state` 선언할 때 `this` 빼고 클래스 내에서 바로 선언해도 상관 없음

실무에서도 Constructor 거의 안 쓰고 `state`를 바로 선언해서 쓴다

```jsx
class GuGuDan extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		//바뀌는 값들이 속성으로 여기에 추가가 된다
			first: Math.ceil(Math.random() * 9),
			second: Math.ceil(Math.random() * 9),
			value: "",
			valueBefore: "",
			result: "",
		};
	}
[...]
```

이거랑

```jsx
class GuGuDan extends React.Component {
	state = {
	//바뀌는 값들이 속성으로 여기에 추가가 된다
	first: Math.ceil(Math.random() * 9),
	second: Math.ceil(Math.random() * 9),
	value: "",
	valueBefore: "",
	result: "",
	};
[...]
```

이거랑 같음

## 동기와 비동기

### 동기

서버에 요청을 보냈을 때 응답이 돌아와야 다음 동작을 수행할 수 있다

즉 A 작업이 다 끝날 때까지 B 작업은 대기해야 함

### 비동기

요청을 보냈을 때 응답과 상관없이 다음 동작을 수행할 수 있다

A 작업과 B 작업이 동시에 실행되고, A 작업은 결과값이 나오는 대로 출력된다

## 렌더링

`setState`를 할 때마다 렌더링 (`render()`)이 다시 이루어진다

렌더링이 만약에 지나치게 오래 걸린다면 `setState`를 자중해야 함을 알아두세요

(성능 최적화 시에 중요)
