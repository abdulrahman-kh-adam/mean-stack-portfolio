import { ContactService } from './contact.service';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IMessage } from './contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contactForm!: FormGroup;
  contactService = inject(ContactService);
  done = false;
  ngOnInit() {
    this.contactForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }
  submitForm() {
    const message: IMessage = {
      name: this.contactForm.value.username,
      email: this.contactForm.value.email,
      subject: this.contactForm.value.subject,
      body: this.contactForm.value.message,
    };
    this.contactService.sendMessage(message).subscribe((res) => {
      if (res.status === 'success') {
        this.done = true;
        this.contactForm.patchValue({
          username: '',
          email: '',
          subject: '',
          message: '',
        });
      }
    });
  }
}
