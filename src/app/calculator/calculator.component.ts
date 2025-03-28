import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { DividendService } from '../dividend.service';
import { DividendChartComponent } from '../dividend-chart/dividend-chart.component';
import { DividendTableComponent } from '../dividend-table/dividend-table.component';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, DividendChartComponent, DividendTableComponent],
  providers: [DividendService],
})
export class CalculatorComponent {
  dividendService = inject(DividendService);

  fb = inject(FormBuilder);

  form = this.fb.group({
    initialInvestment: [10000, [Validators.required, Validators.min(0)]],
    annualYield: [5, [Validators.required, Validators.min(0)]],
    years: [10, [Validators.required, Validators.min(1)]],
    contributionsPerYear: [12, [Validators.required, Validators.min(0)]],
    contributionAmount: [500, [Validators.required, Validators.min(0)]],
  });

  results$ = this.dividendService.result$;

  submit() {
    if (this.form.valid) {
      this.dividendService.setInput(this.form.value as any);
    }
  }
}