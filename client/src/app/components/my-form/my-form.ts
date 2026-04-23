import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-form',
  imports: [FormsModule, NgClass],
  templateUrl: './my-form.html',
  styleUrls: ['./my-form.scss'],
})
export class MyForm {
  createUser: CreateUserDto;
  btnSubmitClass: string;

  constructor() {
    this.createUser = {
      isDisabled: false,
      isDisabledEmail: false,
      name: '',
      email: '',
    };

    this.btnSubmitClass = 'btn btn-primary';
  }

  handleSubmit() {
    // e.preventDefault();
    console.log(this.createUser);
    if (this.createUser.isDisabled) {
      this.btnSubmitClass = 'btn btn-primary';
      this.createUser.isDisabled = false;
      this.createUser.isDisabledEmail = false;
    } else {
      this.btnSubmitClass = 'btn btn-secondary';
      this.createUser.isDisabled = true;
      this.createUser.isDisabledEmail = true;
    }
  }
}
