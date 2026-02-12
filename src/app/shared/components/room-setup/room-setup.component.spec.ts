import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSetupComponent } from './room-setup.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { provideZoneChangeDetection } from '@angular/core';

describe('RoomSetupComponent', () => {
  let component: RoomSetupComponent;
  let fixture: ComponentFixture<RoomSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomSetupComponent, NoopAnimationsModule],
      providers: [provideZoneChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoomSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
