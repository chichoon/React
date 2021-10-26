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

## Math: floor, ceil, round

`Math.floor(숫자)` : 소수점 이하를 버림

`Math.ceil(숫자)` : 소수점 이하를 올림

`Math.round(숫자)` : 소수점 이하를 반올림

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
