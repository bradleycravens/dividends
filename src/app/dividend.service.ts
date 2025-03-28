import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DividendInput {
  initialInvestment: number;
  annualYield: number; // in percent
  years: number;
  contributionsPerYear: number;
  contributionAmount: number;
}

export interface DividendYearResult {
  year: number;
  totalContributions: number;
  totalDividends: number;
  totalValue: number;
}

@Injectable({ providedIn: 'root' })
export class DividendService {
  private inputSubject = new BehaviorSubject<DividendInput | null>(null);
  input$ = this.inputSubject.asObservable();

  setInput(input: DividendInput): void {
    this.inputSubject.next(input);
  }

  readonly result$: Observable<DividendYearResult[]> = this.input$.pipe(
    map(input => {
      if (!input) return [];

      const {
        initialInvestment,
        annualYield,
        years,
        contributionsPerYear,
        contributionAmount
      } = input;

      const results: DividendYearResult[] = [];
      let totalValue = initialInvestment;
      let totalContributions = initialInvestment;

      for (let year = 1; year <= years; year++) {
        const yearlyContribution = contributionsPerYear * contributionAmount;
        totalContributions += yearlyContribution;
        totalValue += yearlyContribution;

        const dividends = totalValue * (annualYield / 100);
        totalValue += dividends;

        results.push({
          year,
          totalContributions,
          totalDividends: dividends,
          totalValue
        });
      }

      return results;
    })
  );
}