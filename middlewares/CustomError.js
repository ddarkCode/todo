class CustomError extends Error {
  constructor(msg, status) {
    super();
    this.msg = msg;
    this.status = status;
  }
}

export default CustomError;
