/* eslint-disable  import/no-duplicates */
import ru from 'date-fns/locale/ru';
/* eslint-disable  import/no-duplicates */
import { format } from 'date-fns';
import React from 'react';

import {addResponseMessage, addUserMessage, renderCustomComponent} from '../../store/dispatcher';
import { IChatById } from '../../interfaces';

export const CustomChatDay = (props: { date: string }) => (
  <div className="rcw-message-day">
    <p>{format(new Date(props.date), 'dd MMMM', { locale: ru })}</p>
  </div>
);

export const sendMessage = async (
  item: Partial<IChatById>,
  sender: string, type: 'day' | 'response' | 'userMessage',
  needShowTime = false,
): Promise<void> => {
  try {
    if (type === 'day') {
      renderCustomComponent(CustomChatDay, { date: item.createdAt }, false);
    } else if (type === 'response') {
      if (item.content) {
        addResponseMessage(item.content, '0', !needShowTime ? null : item.createdAt);
      }
      item.files?.forEach(({ filename }) => (
        addResponseMessage(`![](https://project-z-feedback.s3.eu-west-1.amazonaws.com/${filename})`)
      ));
    } else {
      if (item.content) {
        addUserMessage(item.content, '0', !needShowTime ? null : item.createdAt);
      }
      item.files?.forEach(({ filename }) => (
        addUserMessage(`![](https://project-z-feedback.s3.eu-west-1.amazonaws.com/${filename})`)
      ));
    }
  } catch (err) {
    alert(err);
  }
};
