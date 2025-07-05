import { CharToColorDirective } from './char-to-color.directive';
import { ElementRef } from "@angular/core";

describe('CharToColorDirective', () => {
  it('should create an instance', () => {
    const mockElement: HTMLElement = document.createElement('span');
    const elementRef = new ElementRef<HTMLElement>(mockElement);
    const directive = new CharToColorDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
