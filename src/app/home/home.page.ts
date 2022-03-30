import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { TodoService } from '../todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todoList = [];
  // todoList = [
  //   {
  //     itemName: 'coding',
  //     itemDueDate: '4-10-22',
  //     itemPriority: 'high',
  //     itemCategory: 'Work',
  //   },
  //   {
  //     itemName: 'Design',
  //     itemDueDate: '4-16-22',
  //     itemPriority: 'low',
  //     itemCategory: 'Work',
  //   },
  //   {
  //     itemName: 'Shopping',
  //     itemDueDate: '4-30-22',
  //     itemPriority: 'middle',
  //     itemCategory: 'Personal',
  //   },
  //   {
  //     itemName: 'Workout',
  //     itemDueDate: '5-10-22',
  //     itemPriority: 'high',
  //     itemCategory: 'Personal',
  //   },
  // ];

  today: number = Date.now();

  constructor(
    public modalCtrl: ModalController,
    public todoService: TodoService
  ) {
    this.getAllTask();
  }

  async addTask() {
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage,
    });

    modal.onDidDismiss().then((newTaskObj) => {
      this.getAllTask();
    });

    return await modal.present();
  }

  getAllTask() {
    this.todoList = this.todoService.getAllTasks();
  }

  delete(key) {
    this.todoService.deleteTask(key);
    this.getAllTask();
    // this.todoList.splice(index, 1);
  }

  async update(selectedTask) {
    const modal = await this.modalCtrl.create({
      component: UpdateTaskPage,
      componentProps: { task: selectedTask },
    });

    modal.onDidDismiss().then(() => {
      this.getAllTask();
    });

    return await modal.present();
  }
}
