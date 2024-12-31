import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface toastOptions {
  position?: string,
  direction?: string,
  type?: string,
  time?: number
}

@Component({
  selector: 'app-toast',
  imports: [
    CommonModule
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  title: string;
  toastMessage: string = '';
  isToastVisible: boolean = false;

  position: string;
  direction: string;
  type: string;

  positions:{ [key: string]: string } = {
    top: "top-0",
    middle: "top-50",
    bottom: "bottom-0",
  };

  directions:{ [key: string]: string } = {
    start: 'start-0',
    center: 'start-50 translate-middle mt-5',
    end: 'end-0'
  };

  types:{ [key: string]: string } = {
    info: '',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-danger text-white'
  }

  showToast(message: string, title: string = '', toastOption?: toastOptions): void {
    this.toastMessage = message;
    this.title = title;
    this.isToastVisible = true;

    this.position = this.positions[toastOption?.position ?? 'bottom'];
    this.direction = this.directions[toastOption?.direction ?? 'end'];
    this.type = this.types[toastOption?.type ?? 'info'];


    // Oculta automaticamente após 3 segundos
    setTimeout(() => {
      this.hideToast();
    }, toastOption?.time ?? 3000);
  }

  hideToast(): void {
    this.isToastVisible = false;
  }
}
