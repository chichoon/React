# Fragment와 기타 팁들

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

JSX는 여러 태그를 한번에 반환할 때 무조건 하나의 태그 안에 감싸서 넣기를 요구한다 ([이유](https://www.notion.so/1-4-71a227b937d74cd49d08a947f4b0d8aa))

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

---

## 팁

### 괄호 종류

`( )` 는 그룹 연산자로, 사실 있어도 없어도 똑같은 동작을 한다

한 가지 유의미한 곳이 **우선순위 높일 때** 밖에 없음

`return` 시에 소괄호로 묶는 등 굳이 소괄호로 묶어줄 필요가 없다는 뜻, 다만 있으면 좀 깔끔하고 보기좋다

### onSubmit과 button에서의 onClick

`form`에서는 `onSubmit`을 쓰고, `form`이 없는 경우는 `onClick`을 쓰면?

### 함수를 클래스 (컴포넌트) 내에서 정의할 때

무조건 ⇒ (화살표) 함수 써야 한다

직접 함수를 정의하는 경우 `function (e)` 로 선언하면 `this`의 의미가 다르게 적용된다

다만 render() 는 화살표 없이 그냥 선언해서 사용

### Constructor (생성자) 가 뭔지 몰라요

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
