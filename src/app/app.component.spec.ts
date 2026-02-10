import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { provideHttpClient } from "@angular/common/http";
import { AppRoutingModule } from "./app.routing";

import { provideZoneChangeDetection } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [AppRoutingModule,
        CoreModule],
      providers: [
        provideHttpClient(),
        provideZoneChangeDetection()
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'project-tanuki'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('project-tanuki');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toContain('Project-tanuki');
  });
});
