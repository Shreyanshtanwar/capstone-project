function Loader({ message = "Loading..." }) {
  return (
    <div className="loader-container" role="status">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
}

export default Loader;