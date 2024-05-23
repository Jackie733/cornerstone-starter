import { atom } from 'jotai';
// import { removeFromArray } from '../utils';

export enum MessageType {
  Error,
  Warning,
  Info,
  Success,
}

export type MessageOptions = {
  details?: string;
  persist?: boolean;
};

export interface Message {
  id: string;
  type: MessageType;
  title: string;
  options: MessageOptions;
}

export type UpdateProgressFunction = (progress: number) => void;
export type TaskFunction = (updateProgress?: UpdateProgressFunction) => unknown;

// state atom
export const _nextID = atom(1);
export const byIDAtom = atom<Record<string, Message>>({});
export const msgListAtom = atom<string[]>([]);

// getter atom
export const messagesAtom = atom((get) =>
  get(msgListAtom).map((id) => get(byIDAtom)[id])
);
export const importantMessagesAtom = atom((get) =>
  get(messagesAtom).filter((msg) => msg.type !== MessageType.Success)
);

// actions
// TODO
