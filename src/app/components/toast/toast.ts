import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastService, ToastType } from '../../services/toast-service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
currentToast: any;
  constructor(private toastService: ToastService) {
    this.currentToast = this.toastService.currentToast;
  }
  
  getToastClasses(type: ToastType | undefined): string {
    switch (type) {
      case 'success':
        return 'bg-green-600 text-white border-l-4 border-green-800';
      case 'error':
        return 'bg-red-600 text-white border-l-4 border-red-800';
      case 'warning':
        return 'bg-yellow-500 text-gray-900 border-l-4 border-yellow-700';
      case 'info':
      default:
        return 'bg-blue-600 text-white border-l-4 border-blue-800';
    }
  }
  getIcon(type: ToastType): string {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': default: return 'ℹ️';
    }
  }
}
