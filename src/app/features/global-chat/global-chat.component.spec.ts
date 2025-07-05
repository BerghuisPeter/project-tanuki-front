import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalChatComponent } from './global-chat.component';
import { ChatService } from '../../shared/services/chat.service';
import { Socket } from 'ngx-socket-io';
import { of, Subject } from 'rxjs';
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { CharToColorModule } from "../../shared/directives/char-to-color/char-to-color.module";
import { LoadingComponent } from "../../shared/components/loading/loading.component";

describe('GlobalChatComponent', () => {
  let component: GlobalChatComponent;
  let fixture: ComponentFixture<GlobalChatComponent>;

  class MockSocket {
    emit = jasmine.createSpy();
    fromEvent = jasmine.createSpy().and.returnValue(of());
    disconnect = jasmine.createSpy();
  }

  class MockChatService {
    message = new Subject();
    systemNotification = new Subject();

    connect() {
      return {};
    }


    disconnect() {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    joinChat(room: string) {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendMessage(room: string, msg: string) {
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalChatComponent],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatListModule,
        NoopAnimationsModule,
        CharToColorModule,
        LoadingComponent
      ],
      providers: [
        { provide: ChatService, useClass: MockChatService },
        { provide: Socket, useClass: MockSocket }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
