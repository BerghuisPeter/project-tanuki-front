import { AfterViewInit, Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCharToColor]',
  standalone: true,
})
export class CharToColorDirective implements AfterViewInit {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  ngAfterViewInit(): void {
    const characters = this.el.nativeElement.innerText;
    if (characters) {
      this.renderer.setStyle(this.el.nativeElement, 'color', this.stringToHexColor(characters));
    }
  }

  private stringToHexColor(str: string) {
    let r = 0;
    let g = 0;
    let b = 0;

    for (let i = 0; i < str.length; i++) {
      const charCode = str.codePointAt(i);
      if (charCode === undefined) {
        return '#000000';
      }
      r += charCode;
      g += charCode * 2;
      b += charCode * 3;
    }

    r = Math.round(r % 256);
    g = Math.round(g % 256);
    b = Math.round(b % 256);

    return `#${this.componentToHex(r)}${this.componentToHex(g)}${this.componentToHex(b)}`;
  }

  private componentToHex(c: number): string {
    return c.toString(16).padStart(2, '0');
  }

}
