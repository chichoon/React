const React = require("react");
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState("감자탕");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [resultList, setResultList] = useState("감자탕");
  const inputRef = useRef(null);

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

  const onChangeInput = (e) => {
    setValue(e.currentTarget.value);
  };

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
};

module.exports = WordRelay;
