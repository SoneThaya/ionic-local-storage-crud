import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  @Input() task;

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

  ngOnInit() {
    console.log('update', this.task);
    this.taskName = this.task.value.itemName;
    this.taskDate = this.task.value.itemDueDate;
    this.taskPriority = this.task.value.itemPriority;
    this.taskCategory = this.task.value.itemCategory;
  }

  selectedCategory(index) {
    this.taskCategory = this.categories[index];
    console.log('task category', this.taskCategory);
  }

  async dismissModal() {
    await this.modalCtrl.dismiss();
  }

  async updateTask() {
    this.taskObject = {
      itemName: this.taskName,
      itemDueDate: this.taskDate,
      itemPriority: this.taskPriority,
      itemCategory: this.taskCategory,
    };
    let uid = this.task.key;
    await this.todoService.updateTask(uid, this.taskObject);
    this.dismissModal();
  }
}
