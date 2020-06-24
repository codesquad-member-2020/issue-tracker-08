const useInput = (initialValue, validators) => {
  const [value, setValue] = useState(initialValue);
  let onChange = null;

  if (!validators) {
    onChange = ({ target }) => setValue(target.value);
  }

  let willUpdate = [];
  validators.forEach((v, i) => (willUpdate[i] = true));

  onChange = ({ target }) => {
    validators.forEach((valid, i) => (willUpdate[i] = valid(target.value)));

    if (willUpdate.every((v) => v === true)) setValue(target.value);
  };

  return { value, onChange };
};

export default useInput;

// 사용법
// const validMaxLen = (value) => value.length <= 10;
// const validNoInputString = (value) => !value.includes("#");
// const name = useInput("하이", [validMaxLen, validNoInputString]);
