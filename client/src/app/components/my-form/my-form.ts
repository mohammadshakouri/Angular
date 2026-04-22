import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { text } from 'stream/consumers';

@Component({
  selector: 'my-form',
  imports: [FormsModule],
  templateUrl: './my-form.html',
  styleUrls: ['./my-form.scss'],
})
export class MyForm {
  disableName: boolean = false;
  disableEmail: boolean = false;
  inputTextName: string = '';
  inputTextEmail: string = '';
  handleInputChange(e: any) {
   this.inputTextName = e.target.value;
  }

}
