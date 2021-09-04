function Child({ count, message }) {
  return (
    <>
      <h1>Hello from child!</h1>
      <h2>{count}</h2>
      <h2>{message}</h2>
    </>
  );
}

export default Child;