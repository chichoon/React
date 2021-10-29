# ref

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

## 여담

`setState`를 할 때마다 렌더링 (`render()`)이 다시 이루어진다

렌더링이 만약에 지나치게 오래 걸린다면 `setState`를 자중해야 함을 알아두세요

(성능 최적화 시에 중요)
