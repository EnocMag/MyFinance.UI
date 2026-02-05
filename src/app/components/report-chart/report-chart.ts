import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { TransactionService } from '../../services/transaction-service';

@Component({
  selector: 'app-report-chart',
  standalone: true,
  imports: [HighchartsChartComponent],
  templateUrl: './report-chart.html',
  styleUrl: './report-chart.css',
})
export class ReportChart {
  constructor (private transactionService: TransactionService) {}
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'area'
    },

    title: {
      text: 'Income and Expense Year'
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
        data: [
          5000, 4500, 5000, 3000, 2000, 5000,
          5000, 4300, 5000, 6000, 6000, 5000,
        ]
        
      },
      {
        type: 'area',
        name: 'Expense',
        color: '#f00',
        data: [
          3000, 5000, 4000, 2000, 5000, 4000, 
          2000, 2000, 3000, 5000, 5000, 4000,
        ]
      }
    ]
  };
}
