import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { Subject } from "rxjs";
import { Socket } from "ngx-socket-io";


class MockSocket {
  emit = jasmine.createSpy('emit');
  connect = jasmine.createSpy('connect');
  disconnect = jasmine.createSpy('disconnect');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private streams: Record<string, Subject<any>> = {};

  fromEvent<T>(eventName: string) {
    if (!this.streams[eventName]) {
      this.streams[eventName] = new Subject<T>();
    }
    return this.streams[eventName].asObservable();
  }

  trigger<T>(event: string, value: T) {
    this.streams[event]?.next(value);
  }
}


describe('ChatService', () => {
  let service: ChatService;
  let mockSocket: MockSocket;

  beforeEach(() => {
    mockSocket = new MockSocket();

    TestBed.configureTestingModule({
      providers: [
        ChatService,
        { provide: Socket, useValue: mockSocket }
      ]
    });

    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
