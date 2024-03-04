import { LightningElement } from "lwc";

export default class ToDoListMiniProject extends LightningElement {
  taskName = "";
  taskDate = null;
  IncompleteTasks = [];
  CompleteTasks = [];

  changeHandler(event) {
    let { name, value } = event.target;
    if (name === "taskname") {
      this.taskName = value;
    } else if (name === "taskdate") {
      this.taskDate = value;
    }
  }

  resetHandler() {
    this.taskName = "";
    this.taskDate = null;
  }

  addTaskHandler() {
    if (!this.taskDate) {
      this.taskDate = new Date().toISOString().slice(0, 10);
    }

    if (this.validateMethod()) {
      this.IncompleteTasks = [
        ...this.IncompleteTasks,
        {
          taskname: this.taskName,
          taskdate: this.taskDate
        }
      ];
      this.resetHandler();
      let sortedArray = this.sortTasks(this.IncompleteTasks);
      this.IncompleteTasks = [...sortedArray];
    }
  }

  validateMethod() {
    let isValid = true;
    let element = this.template.querySelector(".taskname");

    if (!this.taskName) {
      isValid = false;
      element.setCustomValidity("Please Enter Task Name.");
    } else {
      let taskItem = this.IncompleteTasks.find(
        (currItem) =>
          currItem.taskname === this.taskName &&
          currItem.taskdate === this.taskDate
      );
      if (taskItem) {
        isValid = false;
        element.setCustomValidity(
          "Task already Exists, Please Enter Another One."
        );
      }
    }
    if (isValid) {
      element.setCustomValidity("");
    }
    element.reportValidity();
    return isValid;
  }

  sortTasks(inputArray) {
    return inputArray.sort(
      (a, b) => new Date(a.taskdate) - new Date(b.taskdate)
    );
  }

  removalHandler(event) {
    let index = event.target.name;
    this.IncompleteTasks.splice(index, 1);
    let sortedArray = this.sortTasks(this.IncompleteTasks);
    this.IncompleteTasks = [...sortedArray];
  }

  CompleteTaskHandler(event) {
    let index = event.target.name;
    let removeItem = this.IncompleteTasks.splice(index, 1);
    let sortedArray = this.sortTasks(this.IncompleteTasks);
    this.IncompleteTasks = [...sortedArray];
    this.CompleteTasks.push(removeItem[0]);
  }
}
