import { LightningElement } from "lwc";

export default class ChildHook extends LightningElement {
  constructor() {
    super();
    console.log("constructor from child");
  }
  connectedCallback() {
    console.log("connnectedCallback from child");
    throw new Error("The Error while loading in child component.");
  }
  renderedCallback() {
    console.log("renderedCallback from child");
  }
  errorCallback(error, stack) {
    console.log("errorCallback from child");
  }
  disconnectedCallback() {
    console.log("discoonnected callback from child.");
  }
}
