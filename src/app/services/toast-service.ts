import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  message: string;
  type: ToastType;
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  currentToast = signal<Toast | null>(null);

  private timeoutId: any;

  show(message: string, type: ToastType = 'success', duration: number = 3000): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.currentToast.set({ message, type, duration });

    this.timeoutId = setTimeout(() => {
      this.currentToast.set(null);
    }, duration);
  }

  success(message: string, duration: number = 3000) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration: number = 5000) {
    this.show(message, 'error', duration);
  }
}
