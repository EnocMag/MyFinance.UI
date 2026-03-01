# Confirmation Dialog Component - Integration Guide

## Overview
The `ConfirmationDialog` is a reusable modal component designed for critical actions like deleting transactions. It provides a professional dialog with clear messaging and distinct button styling.

## Features
- ✅ Reusable across your entire application
- ✅ Customizable title, message, and button text
- ✅ Callback handlers for confirm/cancel actions
- ✅ Accessible (ARIA labels, autofocus on cancel button)
- ✅ Click-outside-to-close functionality
- ✅ Smooth animations and transitions
- ✅ Red delete button styling by default
- ✅ Full TypeScript support

## Component Inputs
```typescript
@Input() isOpen: boolean = false;              // Controls dialog visibility
@Input() title: string = '';                   // Dialog title
@Input() message: string = '';                 // Dialog message
@Input() confirmText: string = 'Confirm';      // Confirm button text
@Input() cancelText: string = 'Cancel';        // Cancel button text
@Input() confirmButtonClass: string = '';      // Custom button styling
```

## Component Outputs
```typescript
@Output() confirm = new EventEmitter<void>();  // Emitted when user clicks confirm
@Output() cancel = new EventEmitter<void>();   // Emitted when user clicks cancel
```

---

## Usage Examples

### Example 1: Delete Transaction (Basic)
```typescript
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';
import { TransactionService } from '../../services/transaction-service';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, ConfirmationDialog],
  template: `
    <button (click)="openDeleteDialog(transactionId)">
      Delete
    </button>

    <app-confirmation-dialog
      [isOpen]="showDeleteDialog()"
      title="Delete Transaction"
      message="Are you sure you want to delete this transaction?"
      messageSecondary="This action cannot be undone."
      confirmText="Delete"
      cancelText="Cancel"
      confirmButtonClass="bg-red-600 hover:bg-red-700"
      (confirm)="confirmDelete()"
      (cancel)="closeDeleteDialog()"
    ></app-confirmation-dialog>
  `
})
export class TransactionList {
  showDeleteDialog = signal(false);
  transactionIdToDelete: string | null = null;

  constructor(
    private transactionService: TransactionService,
    private toastService: ToastService
  ) {}

  openDeleteDialog(transactionId: string): void {
    this.transactionIdToDelete = transactionId;
    this.showDeleteDialog.set(true);
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog.set(false);
    this.transactionIdToDelete = null;
  }

  confirmDelete(): void {
    if (!this.transactionIdToDelete) return;

    this.transactionService.deleteTransaction(this.transactionIdToDelete).subscribe({
      next: () => {
        this.toastService.showToast('Transaction deleted successfully', 'success');
        this.closeDeleteDialog();
        // Refresh your transaction list here
      },
      error: () => {
        this.toastService.showToast('Failed to delete transaction', 'error');
      }
    });
  }
}
```

### Example 2: Delete Transaction (With Multiple Dialogs)
```typescript
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-transaction-management',
  imports: [CommonModule, ConfirmationDialog],
  template: `
    <div>
      <button (click)="openDeleteDialog('trans-123')">Delete Transaction</button>
      <button (click)="openClearAllDialog()">Clear All</button>

      <!-- Delete Single Transaction Dialog -->
      <app-confirmation-dialog
        [isOpen]="deleteDialog()"
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        (confirm)="onConfirmDelete()"
        (cancel)="closeDeleteDialog()"
      ></app-confirmation-dialog>

      <!-- Clear All Dialog -->
      <app-confirmation-dialog
        [isOpen]="clearAllDialog()"
        title="Clear All Transactions"
        message="Are you sure you want to delete all transactions? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        (confirm)="onConfirmClearAll()"
        (cancel)="closeClearAllDialog()"
      ></app-confirmation-dialog>
    </div>
  `
})
export class TransactionManagement {
  deleteDialog = signal(false);
  clearAllDialog = signal(false);
  selectedTransactionId: string | null = null;

  openDeleteDialog(transactionId: string): void {
    this.selectedTransactionId = transactionId;
    this.deleteDialog.set(true);
  }

  closeDeleteDialog(): void {
    this.deleteDialog.set(false);
    this.selectedTransactionId = null;
  }

  openClearAllDialog(): void {
    this.clearAllDialog.set(true);
  }

  closeClearAllDialog(): void {
    this.clearAllDialog.set(false);
  }

  onConfirmDelete(): void {
    if (this.selectedTransactionId) {
      // Handle delete logic
      console.log('Deleting transaction:', this.selectedTransactionId);
      this.closeDeleteDialog();
    }
  }

  onConfirmClearAll(): void {
    // Handle clear all logic
    console.log('Clearing all transactions');
    this.closeClearAllDialog();
  }
}
```

### Example 3: Service-Based Approach (Recommended)
For maximum reusability, consider creating a dialog service:

```typescript
import { Injectable, signal } from '@angular/core';

export interface DialogState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private dialogState = signal<DialogState>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: () => {},
  });

  dialogState$ = this.dialogState.asReadonly();

  openDeleteTransactionDialog(transactionId: string, onConfirm: () => void): void {
    this.dialogState.set({
      isOpen: true,
      title: 'Delete Transaction',
      message: 'Are you sure you want to delete this transaction? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: onConfirm,
      onCancel: () => this.closeDialog(),
    });
  }

  openClearAllDialog(onConfirm: () => void): void {
    this.dialogState.set({
      isOpen: true,
      title: 'Clear All Transactions',
      message: 'Are you sure you want to delete all transactions? This action cannot be undone.',
      confirmText: 'Clear All',
      cancelText: 'Cancel',
      onConfirm: onConfirm,
      onCancel: () => this.closeDialog(),
    });
  }

  closeDialog(): void {
    this.dialogState.update(state => ({ ...state, isOpen: false }));
  }

  getConfirmAction(): (() => void) {
    return this.dialogState().onConfirm;
  }
}
```

**Usage with Service:**
```typescript
constructor(private confirmationService: ConfirmationService) {}

deleteTransaction(transactionId: string): void {
  this.confirmationService.openDeleteTransactionDialog(transactionId, () => {
    // Perform actual delete
    this.transactionService.deleteTransaction(transactionId).subscribe({
      next: () => {
        this.toastService.showToast('Deleted successfully', 'success');
      }
    });
  });
}
```

---

## Styling Customization

### Predefined Button Classes
```typescript
// Red Delete Button (Default)
confirmButtonClass="bg-red-600 hover:bg-red-700"

// Blue Confirm Button
confirmButtonClass="bg-blue-600 hover:bg-blue-700"

// Green Accept Button
confirmButtonClass="bg-green-600 hover:bg-green-700"

// Orange Warning Button
confirmButtonClass="bg-orange-500 hover:bg-orange-600"
```

### Custom Styling
You can pass any Tailwind CSS classes to customize the confirm button appearance.

---

## Accessibility
The component includes several accessibility features:
- ✅ ARIA labels (`aria-labelledby`, `aria-describedby`)
- ✅ Cancel button uses `autofocus` attribute
- ✅ Proper semantic HTML with `<button>` and `role="dialog"`
- ✅ Keyboard navigation support

---

## Tips & Best Practices

1. **Use Signals for State**: Leverage Angular's signals for reactive dialog state
2. **Reuse Across Components**: Import the component in any module that needs it
3. **Service Pattern**: Create a dialog service for complex applications
4. **Error Handling**: Always handle service errors before closing the dialog
5. **User Feedback**: Show toast notifications after confirm/cancel actions
6. **Lock Background**: The dark backdrop prevents interaction with background content

---

## Testing

The component includes comprehensive unit tests. Run them with:
```bash
npm test -- --include-src='**/confirmation-dialog.spec.ts'
```

See [confirmation-dialog.spec.ts](./confirmation-dialog.spec.ts) for test examples.
