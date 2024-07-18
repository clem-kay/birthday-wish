// src/wishes/wishes.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WishesGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('new-wish')
  handleNewWish(@MessageBody() wish: string): void {
    this.server.emit('new-wish', wish);
  }
}
