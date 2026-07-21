import { ChangeDetectionStrategy, Component } from '@angular/core';
import { injectI18n } from '../../services/caption.service';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePicker {
  i18n = injectI18n();
}
