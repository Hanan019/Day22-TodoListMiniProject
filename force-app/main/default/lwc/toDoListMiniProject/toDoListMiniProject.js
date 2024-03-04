import { LightningElement } from "lwc";

export default class ToDoListMiniProject extends LightningElement {
  debugger;
  taskname = "";
  taskdate = null;
  IncompleteTasks = [];
  CompleteTasks = [];

  changeHandler(event) {
    let { name1, valuee } = event.target;
    if (name1 === "taskName") {
      this.taskname = valuee;
    } else if (name1 === "taskDate") {
      this.taskdate = valuee;
    }
  }
  resetHandler() {
    this.taskname = "";
    this.taskdate = null;
  }
  addTaskHandler() {
    //first check if end date is missing  populate todays date as end dat.
    if (!this.taskdate) {
      this.taskdate = new Date().toISOString().slice(0, 10);
    }

    if (this.validateMethod()) {
      this.IncompleteTasks = [
        ...this.IncompleteTasks,
        {
          taskname: this.taskname,
          taskdate: this.taskdate
        }
      ];
      this.resetHandler();
      //now after inserting the task we have to sort the array.
      let sortedArray = this.sortTasks(this.IncompleteTasks);
      //now we have to override the array with sorted array
      this.IncompleteTasks = [...sortedArray]; // this will sort the array.

      console.log("this.incompleteTasks ", this.IncompleteTasks);
    }
  }

  validateMethod() {
    //to check if the task already exists..?
    let isValid = true;
    let element = this.template.querySelector(".taskname");
    //condition 1.. check if task is empty or not.?
    //condition 2.. if taskname not empty,,,> check for duplicate.
    if (!this.taskname) {
      //check if the task is empty ..?
      this.isValid = true;
    } else {
      //if find method  will find an item in array it will return task item.,
      // if not found, it will return undefined.
      let taskItem = this.IncompleteTasks.find(
        (currItem) =>
          currItem.taskname === this.taskname &&
          currItem.taskdate === this.taskdate
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
    let sortedArray = inputArray.sort((a, b) => {
      const dateA = new Date(a.taskdate);
      const dateB = new Date(b.taskdate);
      return dateA - dateB;
    });
    return sortedArray;
  }
  removalHandler(event) {
    //from incomplete task array we have to remove the item
    let index = event.target.name;
    this.IncompleteTasks.splice(index, 1);
    this.IncompleteTasks = [...this.sortedArray];
    let sortedArray = this.sortTasks(this.IncompleteTasks);
    this.IncompleteTasks = [...sortedArray];
    console.log("this incompletetasks", this.IncompleteTasks);
  }
  CompleteTaskHandler(event) {
    let index = event.target.name;
    let removeItem = this.IncompleteTasks.splice(index, 1);
    //add some entry in comlete item
    this.CompleteTasks = [...this.CompleteTasks, removeItem[0]];
  }
}
