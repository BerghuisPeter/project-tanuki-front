import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSetupComponent } from './room-setup.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RoomSetupComponent', () => {
  let component: RoomSetupComponent;
  let fixture: ComponentFixture<RoomSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomSetupComponent, NoopAnimationsModule]
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
