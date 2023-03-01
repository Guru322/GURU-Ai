declare module "node-domexception" {
  class DOMException {
    constructor(message: string, name: string)
  }

  export default DOMException
}
