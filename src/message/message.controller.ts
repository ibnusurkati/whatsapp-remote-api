import { Body, Controller, Param, Post, Res, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Response } from 'express';
import { fromEvent, map, Observable } from 'rxjs';
import { MessageEventSseDTO } from 'src/common/dtos/sse.dto';
import { DefaultResponseInterface } from 'src/common/interfaces/reformating-response.interface';
import { SendAudioDTO } from './dtos/send-audio.dto';
import { SendContactsDTO } from './dtos/send-contacts.dto';
import { SendDocumentDTO } from './dtos/send-document.dto';
import { SendGifDTO } from './dtos/send-gif.dto';
import { SendImageDTO } from './dtos/send-image.dto';
import { SendLocationDTO } from './dtos/send-location.dto';
import { SendStickerDTO } from './dtos/send-sticker.dto';
import { SendTextDTO } from './dtos/send-text.dto';
import { SendVideoDTO } from './dtos/send-video.dto';
import { SendVoiceDTO } from './dtos/send-voice.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Post('send-text')
  async sendText(
    @Body() payload: SendTextDTO,
  ): Promise<DefaultResponseInterface<boolean>> {
    this.eventEmitter.emit(`message-${payload.key}`, {
      type: 'text',
      ...payload,
    });
    return { data: true };
  }

  @Post('send-location')
  async sendLocation(
    @Body() payload: SendLocationDTO,
  ): Promise<DefaultResponseInterface<boolean>> {
    this.eventEmitter.emit(`message-${payload.key}`, {
      type: 'location',
      ...payload,
    });
    return { data: true };
  }

  @Post('send-contacts')
  async sendContacts(
    @Body() payload: SendContactsDTO,
  ): Promise<DefaultResponseInterface<boolean>> {
    this.eventEmitter.emit(`message-${payload.key}`, {
      type: 'contacts',
      ...payload,
    });
    return { data: true };
  }

  @Post('send-image')
  async sendImage(
    @Body() payload: SendImageDTO,
  ): Promise<DefaultResponseInterface<boolean>> {
    this.eventEmitter.emit(`message-${payload.key}`, {
      type: 'image',
      ...payload,
    });
    return { data: true };
  }

  @Post('send-video')
  async sendVideo(
    @Body() payload: SendVideoDTO,
  ): Promise<DefaultResponseInterface<boolean>> {
    this.eventEmitter.emit(`message-${payload.key}`, {
      type: 'video',
      ...payload,
    });
    return { data: true };
  }

  @Post('send-voice')
  async sendVoice(
    @Body() payload: SendVoiceDTO,
  ): Promise<DefaultResponseInterface<boolean>> {
    this.eventEmitter.emit(`message-${payload.key}`, {
      type: 'voice',
      ...payload,
    });
    return { data: true };
  }

  @Post('send-document')
  async sendDocument(
    @Body() payload: SendDocumentDTO,
  ): Promise<DefaultResponseInterface<boolean>> {
    this.eventEmitter.emit(`message-${payload.key}`, {
      type: 'document',
      ...payload,
    });
    return { data: true };
  }

  @Post('send-audio')
  async sendAudio(
    @Body() payload: SendAudioDTO,
  ): Promise<DefaultResponseInterface<boolean>> {
    this.eventEmitter.emit(`message-${payload.key}`, {
      type: 'audio',
      ...payload,
    });
    return { data: true };
  }

  @Post('send-sticker')
  async sendSticker(
    @Body() payload: SendStickerDTO,
  ): Promise<DefaultResponseInterface<boolean>> {
    this.eventEmitter.emit(`message-${payload.key}`, {
      type: 'sticker',
      ...payload,
    });
    return { data: true };
  }

  @Post('send-gif')
  async sendGif(
    @Body() payload: SendGifDTO,
  ): Promise<DefaultResponseInterface<boolean>> {
    this.eventEmitter.emit(`message-${payload.key}`, {
      type: 'gif',
      ...payload,
    });
    return { data: true };
  }

  @Sse('events/:key')
  events(
    @Param('key') key: string,
    @Res() response: Response,
  ): Observable<MessageEventSseDTO<any>> {
    response.on('close', () => response.end());
    return fromEvent(this.eventEmitter, `message-${key}`).pipe(
      map((payload: any) => {
        delete payload.key;
        const data = payload;
        return { type: 'message', data, id: Date.now().toString() };
      }),
    );
  }
}
