import { startOfDay } from 'date-fns';

import { IChatById } from '../interfaces';
import { MESSAGE_MAP } from '../constants/messages.constants';

export type TMessagesByDay = Record<string, IChatById[]>;
export const prepareMessageByDay = (items: IChatById[]): TMessagesByDay => items.reduce<TMessagesByDay>((acc, message) => {
  const day = startOfDay(new Date(message.createdAt)).toISOString();
  if (!acc[day]) {
    acc[day] = [];
  }
  acc[day].push(message);
  return acc;
}, {});

type TMessageMapValue = typeof MESSAGE_MAP[keyof typeof MESSAGE_MAP];
export const convertMessage = (
  message: keyof typeof MESSAGE_MAP,
  defaultMessage: TMessageMapValue,
): TMessageMapValue => MESSAGE_MAP[message] || defaultMessage;

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const getFirstResponseError = (e: any, defaultMessage = MESSAGE_MAP.UNKNOWN_ERROR): TMessageMapValue => {
  if (e?.response?.data?.errors?.length) {
    return convertMessage(e.response.data.errors[0].message, defaultMessage);
  }
  return defaultMessage;

};
