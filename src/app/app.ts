import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionForm } from './components/transaction-form/transaction-form';
import { LoginForm } from "./components/login-form/login-form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MyFinance.UI');
}
