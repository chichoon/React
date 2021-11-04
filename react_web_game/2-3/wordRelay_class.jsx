const React = require("react"); //쓰이는 패키지 라이브러리 추가하기
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: "감자탕",
    value: "",
    result: "",
    resultList: "감자탕",
  };

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

  onChangeInput = (e) => {
    this.setState({
      value: e.currentTarget.value,
    });
  };

  input;

  onRefInput = (c) => {
    this.input = c;
  };

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
}

module.exports = WordRelay;
