import { LightningElement } from "lwc";

export default class ParentHook extends LightningElement {
  displayChild = false;
  constructor() {
    //as first statement must be supre()
    super();
    console.log("constructor from parent");
  }
  connectedCallback() {
    console.log("connnectedCallback from parent");
  }
  renderedCallback() {
    console.log("renderedCallback from parent");
  }
  errorCallback(error, stack) {
    console.log("errorCallback from parent");
  }

  disconnectedCallback() {
    console.log("discoonnected callback from Parent.");
  }
  changeHandler(event) {
    this.displayChild = event.target.checked;
  }
}
