import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DividendYearResult } from '../dividend.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dividend-table',
  templateUrl: './dividend-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe]
})
export class DividendTableComponent {
  @Input() data: DividendYearResult[] | null = [];
}