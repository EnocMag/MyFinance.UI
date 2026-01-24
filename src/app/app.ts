import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionForm } from './components/transaction-form/transaction-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TransactionForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MyFinance.UI');
}
