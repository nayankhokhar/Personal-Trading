import { Component, ElementRef, Injector, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  appComponent!: AppComponent;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private injector: Injector
  ) {
    this.appComponent = this.injector.get(AppComponent);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  ngAfterViewInit() {
    const inputElements = this.elRef.nativeElement.querySelectorAll('ion-input');
    inputElements.forEach((input: any) => {
      this.renderer.setAttribute(input, 'mode', 'md');
    });
  }

  async onLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      if (username == "Nayan" && password == "Nayan@123") {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        this.appComponent.checkLoginStatus();
        this.router.navigate(['/']);

        const toast = await this.toastController.create({
          message: "Logged in successfully!",
          duration: 1500,
          position: "bottom",
          color: "success"
        });
        await toast.present();
      } else {
        const toast = await this.toastController.create({
          message: "Please enter valid username and password!",
          duration: 1500,
          position: "bottom",
          color: "danger"
        });
        await toast.present();
      }
    }
  }
}
