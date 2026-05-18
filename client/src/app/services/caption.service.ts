import { Injectable } from '@angular/core';
import { captions, ICaption } from '../i18n/captions';

@Injectable({
  providedIn: 'root',
})
export class CaptionService {
  private current: ICaption = captions['en-US'];

  setCulture(culture: string): void {
    this.current = captions[culture] ?? captions['en-US'];
  }

  get(key: string): string {
    const parts = key.split('.');
    let value: unknown = this.current;
    for (const part of parts) {
      value = (value as Record<string, unknown>)?.[part];
    }
    return typeof value === 'string' ? value : key;
  }
}
