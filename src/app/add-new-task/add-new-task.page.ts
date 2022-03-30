import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories = ['work', 'personal', 'home'];

  taskName;
  taskDate;
  taskPriority;
  taskCategory;

  taskObject;

  constructor(
    public modalCtrl: ModalController,
    public todoService: TodoService
  ) {}

  ngOnInit() {}

  async dismissModal() {
    await this.modalCtrl.dismiss(this.taskObject);
  }

  selectedCategory(index) {
    this.taskCategory = this.categories[index];
  }

  async addTask() {
    this.taskObject = {
      itemName: this.taskName,
      itemDueDate: this.taskDate,
      itemPriority: this.taskPriority,
      itemCategory: this.taskCategory,
    };
    console.log('taskObject', this.taskObject);
    let uid = this.taskName + this.taskDate;

    if (uid) {
      await this.todoService.addTask(uid, this.taskObject);
    } else {
      console.log('cant save empty task');
    }

    this.dismissModal();
  }
}
