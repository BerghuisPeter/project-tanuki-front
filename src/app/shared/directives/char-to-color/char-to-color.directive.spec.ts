import { CharToColorDirective } from './char-to-color.directive';
import { ElementRef, Renderer2 } from "@angular/core";
import { TestBed } from "@angular/core/testing";

describe('CharToColorDirective', () => {
  let renderer: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);
  });

  it('should create an instance', () => {
    const mockElement: HTMLElement = document.createElement('span');
    const elementRef = new ElementRef<HTMLElement>(mockElement);

    TestBed.configureTestingModule({
      providers: [
        CharToColorDirective,
        { provide: ElementRef, useValue: elementRef },
        { provide: Renderer2, useValue: renderer }
      ]
    });

    const directive = TestBed.inject(CharToColorDirective);
    expect(directive).toBeTruthy();
  });

  it('should set color based on inner text', () => {
    const mockElement: HTMLElement = document.createElement('span');
    mockElement.innerText = 'A';
    const elementRef = new ElementRef<HTMLElement>(mockElement);

    TestBed.configureTestingModule({
      providers: [
        CharToColorDirective,
        { provide: ElementRef, useValue: elementRef },
        { provide: Renderer2, useValue: renderer }
      ]
    });

    const directive = TestBed.inject(CharToColorDirective);

    directive.ngAfterViewInit();

    // 'A' codePoint is 65.
    // r = 65 % 256 = 65 (0x41)
    // g = (65 * 2) % 256 = 130 (0x82)
    // b = (65 * 3) % 256 = 195 (0xc3)
    // Expected: #4182c3
    expect(renderer.setStyle).toHaveBeenCalledWith(mockElement, 'color', '#4182c3');
  });
});
