import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpensesService, Expense } from '../services/expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: 'expenses.page.html',
  styleUrls: ['expenses.page.scss'],
  standalone: false,
})
export class ExpensesPage implements OnInit {
  expenses: Expense[] = [];
  loading = true;
  showForm = false;
  formAmount: number | null = null;
  formCategory = '';
  formDescription = '';

  constructor(
    private route: ActivatedRoute,
    private expensesService: ExpensesService,
  ) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    const tripId = this.route.snapshot.paramMap.get('id')!;
    this.loading = true;
    this.expensesService.findByTrip(tripId).subscribe({
      next: (data) => {
        this.expenses = data;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  openAdd(): void {
    this.formAmount = null;
    this.formCategory = '';
    this.formDescription = '';
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
  }

  saveExpense(): void {
    const tripId = this.route.snapshot.paramMap.get('id')!;
    if (this.formAmount === null) return;
    this.expensesService.create(tripId, this.formAmount, this.formCategory, this.formDescription).subscribe({
      next: () => {
        this.showForm = false;
        this.loadExpenses();
      },
    });
  }

  deleteExpense(id: string): void {
    this.expensesService.remove(id).subscribe({
      next: () => this.loadExpenses(),
    });
  }

  trackById(_index: number, expense: Expense): string {
    return expense.id;
  }
}
