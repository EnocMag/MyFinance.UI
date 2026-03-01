import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { TransactionService } from '../../services/transaction-service';
import { forkJoin } from 'rxjs';
import { Report } from '../../models/report-model';

@Component({
  selector: 'app-report-chart',
  standalone: true,
  imports: [HighchartsChartComponent],
  templateUrl: './report-chart.html',
  styleUrl: './report-chart.css',
})
export class ReportChart implements OnInit {
  constructor (private transactionService: TransactionService) {}
  Highcharts: typeof Highcharts = Highcharts;
  currentYear = new Date().getFullYear();
  updateFlag = false;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'area'
    },

    title: {
      text: `Income and Expense ${this.currentYear}`
    },

    subtitle: {
      text: 'Period: January - December'
    },

    xAxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      title: {
        text: 'Month'
      }
    },

    yAxis: {
      title: {
        text: 'Amount ($)'
      }
    },

    tooltip: {
      shared: true,
      valuePrefix: '$'
    },

    plotOptions: {
      area: {
        marker: {
          enabled: false,
        }
      }
    },

    series: [
      {
        type: 'area',
        name: 'Income',
        color: '#5ccb5f',
        data: []
      },
      {
        type: 'area',
        name: 'Expense',
        color: '#f00',
        data: []
      }
    ]
  };

  ngOnInit(): void {
    this.loadReportData();
  }

  private loadReportData(): void {
    forkJoin({
      income: this.transactionService.getMonthlyReport('Income', this.currentYear - 1),
      expense: this.transactionService.getMonthlyReport('Expense', this.currentYear - 1)
    }).subscribe({
      next: ({ income, expense }) => {
        const incomeData = this.mapReportToChartData(income.data);
        const expenseData = this.mapReportToChartData(expense.data);

        this.chartOptions.series = [
          {
            type: 'area',
            name: 'Income',
            color: '#5ccb5f',
            data: incomeData
          },
          {
            type: 'area',
            name: 'Expense',
            color: '#f00',
            data: expenseData
          }
        ];

        this.updateFlag = true;
      },
      error: (error) => {
        console.error('Error loading report data:', error);
      }
    });
  }

  private mapReportToChartData(reports: Report[]): number[] {
    const monthlyData = new Array(12).fill(0);
    
    reports.forEach(report => {
      if (report.month >= 1 && report.month <= 12) {
        monthlyData[report.month - 1] = report.total;
      }
    });

    return monthlyData;
  }
}
