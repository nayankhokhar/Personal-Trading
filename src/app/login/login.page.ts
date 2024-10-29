import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
    // localStorage.setItem("username", "test");
    // localStorage.setItem("password", "test");
  }

  ngAfterViewInit() {
    const inputElements = this.elRef.nativeElement.querySelectorAll('ion-input');
    inputElements.forEach((input: any) => {
      this.renderer.setAttribute(input, 'mode', 'md');
    });
  }

  onLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      // this.loginForm.value;
      // localStorage.setItem("username", "test");
      // localStorage.setItem("password", "test");
    }
  }
}
