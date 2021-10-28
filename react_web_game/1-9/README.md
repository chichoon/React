# 함수형 setState

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

## 동기와 비동기

### 동기

서버에 요청을 보냈을 때 응답이 돌아와야 다음 동작을 수행할 수 있다

즉 A 작업이 다 끝날 때까지 B 작업은 대기해야 함

### 비동기

요청을 보냈을 때 응답과 상관없이 다음 동작을 수행할 수 있다

A 작업과 B 작업이 동시에 실행되고, A 작업은 결과값이 나오는 대로 출력된다
