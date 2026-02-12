import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleshipLegendComponent } from './battleship-legend.component';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { provideZoneChangeDetection } from '@angular/core';

describe('BattleshipLegendComponent', () => {
  let component: BattleshipLegendComponent;
  let fixture: ComponentFixture<BattleshipLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BattleshipLegendComponent],
      imports: [
        MatCardModule,
        MatIconModule
      ],
      providers: [provideZoneChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BattleshipLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
