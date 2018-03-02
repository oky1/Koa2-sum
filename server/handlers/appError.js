export default function AppError({ status, message, errors, name }) {
  Error.call(this)
  Error.captureStackTrace(this)
  this.message = message
  this.status = status
  this.errors = errors
  this.name = name
}
