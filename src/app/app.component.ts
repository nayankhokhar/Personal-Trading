import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private router: Router,
    private toastController: ToastController
  ) { }

  public logoutConfirmation = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Yes',
      role: 'confirm'
    },
  ];

  async logout(ev: any) {
    if (ev.detail.role == "confirm") {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      this.router.navigate(['/login']);
  
      const toast = await this.toastController.create({
        message: "Logged out successfully!",
        duration: 1500,
        position: "bottom",
        color: "success"
      });
      await toast.present();
    }
  }
}
