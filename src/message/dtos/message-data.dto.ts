import { SendAudioDTO } from './send-audio.dto';
import { SendContactsDTO } from './send-contacts.dto';
import { SendDocumentDTO } from './send-document.dto';
import { SendGifDTO } from './send-gif.dto';
import { SendImageDTO } from './send-image.dto';
import { SendLocationDTO } from './send-location.dto';
import { SendStickerDTO } from './send-sticker.dto';
import { SendTextDTO } from './send-text.dto';
import { SendVideoDTO } from './send-video.dto';
import { SendVoiceDTO } from './send-voice.dto';

export type MessageDataDTO =
  | SendAudioDTO
  | SendContactsDTO
  | SendDocumentDTO
  | SendGifDTO
  | SendImageDTO
  | SendLocationDTO
  | SendStickerDTO
  | SendTextDTO
  | SendVideoDTO
  | SendVoiceDTO;
