function filtration(val: any) {
  let _value = val;
  if (typeof val == "string") {
    _value = val.trim();
  } else if (typeof val == "number") {

  }

  // ...

  return _value;
}

export {
  filtration
};
