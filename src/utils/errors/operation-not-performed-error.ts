export class OperationNotPerformedError extends Error {
  constructor(){
      super("Operation not performed")
  }
}