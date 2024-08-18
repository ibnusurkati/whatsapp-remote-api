export type MessageEventSseDTO<T = string> = {
  data: T;
  id?: string;
  type?: string;
  retry?: number;
};
