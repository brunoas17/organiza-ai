import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-under-construction',
  imports: [
    CommonModule,
    FormsModule,
    ToastComponent
  ],
  templateUrl: './under-construction.component.html',
  styleUrl: './under-construction.component.scss'
})
export class UnderConstructionComponent implements OnInit {

  #apiService = inject(ApiService);

  @ViewChild('toast') toastComponent!: ToastComponent;

  sending: boolean = false;

  ngOnInit() {

  }

  subscribe(email: NgModel) {

    if(email.valid) {
      this.sending = true;

      this.#apiService.createData('newsletter', { email: email.value }).subscribe({
        next: (response) => {
          this.toastComponent.showToast(`${response.message} \n Agora você se mantera informado \n sobre as novidades sobre a nossa plataforma`, '', {type: 'success', position: 'top', direction: 'center', time: 30000});
          this.sending = false;
        },
        error: (error) => {
          this.toastComponent.showToast(error.error.errors.email, '', {type: 'error', position: 'top', direction: 'center', time: 3000});
          this.sending = false;
        },
        complete: () => this.sending = false
      });

    }

  }

}
