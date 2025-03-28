import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { DividendYearResult } from '../dividend.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  grid: ApexGrid;
  theme: ApexTheme;
};

@Component({
  selector: 'app-dividend-chart',
  templateUrl: './dividend-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgApexchartsModule]
})
export class DividendChartComponent {
  chartOptions: Partial<ChartOptions> | null = null;

  @Input() set data(value: DividendYearResult[] | null) {
    if (!value?.length) return;

    const isDark = document.documentElement.classList.contains('dark');

    this.chartOptions = {
      series: [
        {
          name: 'Total Value',
          data: value.map((v) => +v.totalValue.toFixed(2))
        }
      ],
      chart: {
        type: 'line',
        height: 350,
        toolbar: { show: false },
        background: 'transparent',
        foreColor: '#cbd5e1'
      },
      xaxis: {
        categories: value.map((v) => `Year ${v.year}`),
        labels: {
          style: {
            colors: '#cbd5e1',
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#cbd5e1',
            fontSize: '12px'
          }
        }
      },
      title: {
        text: 'Dividend Growth Over Time',
        style: {
          color: '#f1f5f9',
          fontSize: '16px'
        }
      },
      stroke: {
        width: 2,
        curve: 'smooth'
      },
      grid: {
        borderColor: '#334155'
      },
      theme: {
        mode: 'dark'
      }
    };
  }
}