import 'idempotent-babel-polyfill';

import React, { useCallback, useEffect, useState } from 'react';
import { startOfDay } from 'date-fns';
import { toast } from 'react-toastify';

import { IChatById, ISendMessageRequest } from '../../interfaces';
import { getFirstResponseError, TMessagesByDay } from '../../helpers';
import { toggleWidget, isWidgetOpened, dropMessages } from '../../store/dispatcher';
import { sendMessage } from './helpers';

export const useChangeOpenedChat = (messages: IChatById[]): void => {
  useEffect(() => {
    if (!messages.length) {
      return;
    }
    (async () => {
      if (!isWidgetOpened()) {
        toggleWidget();
      }
      dropMessages();
    })();
  }, [messages]);
};

type TUseUpdateChatMessagesProps = {
  userId: number;
  institution: { id: number } | null;
  messagesById: TMessagesByDay;
};
export const useUpdateChatMessages = ({ messagesById, userId, institution }: TUseUpdateChatMessagesProps): void => {
  
  useEffect(() => {
    if (!Object.entries(messagesById).length || !userId || !institution) {
      return;
    }
    (async () => {
      const entries = Object.entries(messagesById);
      dropMessages();
      await entries.reduce(async (promise, [day, dayMessages]) => {
        await promise;
        await sendMessage({ createdAt: day, content: '' }, '', 'day');
        await dayMessages.reduce(async (insidePromise, item, index) => {
          await insidePromise;
          const needShowTime = dayMessages[index - 1]?.sender?.id !== item.sender?.id;
          if (userId === item.sender?.id) {
            await sendMessage(item, 'Вы', 'userMessage', needShowTime);
          } else {
            await sendMessage(item, '', 'response', needShowTime);
          }
          return insidePromise;
        }, Promise.resolve());
        return promise;
      }, Promise.resolve());
      const today = startOfDay(new Date()).toISOString();
      if (!messagesById[today]) {
        await sendMessage({ createdAt: today, content: '' }, '', 'day');
      }
    })();
  }, [messagesById, userId, institution]);
};

type TUseSendMessageToBackProps = {
  userId?: number;
  sendMessageAPI: (data: ISendMessageRequest) => Promise<void>;
};
type TUseSendMessageToBackReturn = [
  (data: ISendMessageRequest) => Promise<void>,
];
export const useSendMessageToBack = ({ userId, sendMessageAPI }: TUseSendMessageToBackProps): TUseSendMessageToBackReturn => {

  const cb = useCallback(async (data: ISendMessageRequest) => {
    try {
      await sendMessageAPI(data);
    } catch (err) {
      toast.error(getFirstResponseError(err));
    }
  }, [userId]);
  return [cb];
};

const convertBase64ToFile = async (url: string): Promise<File | null> => {
  try {
    const arr = url.split(',');
    // @ts-ignore
    const type = (/:(.*?);/.exec(arr[0]))[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const ext = type.replace('image/', '.');
    const newFileName = (new Date().toISOString()) + ext;
    return new File([u8arr], newFileName, { type });
  } catch (err) {
    return null;
  }

};

type TUploadImages = (data: FormData) => Promise<{ imagesKeys: string[] }>;
type TUploadFeedbackImagesReturn = [(files: File[]) => Promise<string[]>];

const uploadFeedbackImages = (uploadImagesApi: TUploadImages): TUploadFeedbackImagesReturn => {
  const uploadImages = async (files: File[]) => {
    const data = new FormData();
    await Promise.all(files.map(async (file) => {
      data.append('images', file);
    }));
    const { imagesKeys } = await uploadImagesApi(data);
    return imagesKeys;
  };
  return [uploadImages];
};

type TUseSubmitChatProps = {
  chatId?: number;
  userId?: number;
  institutionId?: number;
  messagesById: TMessagesByDay;
  goBack: () => void;
  sendMessageAPI: (data: ISendMessageRequest) => Promise<void>;
  uploadImagesAPI: (data: FormData) => Promise<{ imagesKeys: string[] }>;
};

type TUseSubmitChat = [
  (event: React.MouseEvent) => Promise<void>,
  (newMessage: string) => Promise<void>,
];
export const useSubmitChat = ({
  userId, messagesById, goBack,
  sendMessageAPI, chatId, uploadImagesAPI,
}: TUseSubmitChatProps): TUseSubmitChat => {
  const [onSendToBack] = useSendMessageToBack({
    userId,
    sendMessageAPI,
  });
  const [uploadImages] = uploadFeedbackImages(uploadImagesAPI);
  
  const onClickWrapper = useCallback(async (event: React.MouseEvent) => {
    if ((event.target as HTMLButtonElement).classList.contains('rcw-close-button')) {
      goBack();
      return;
    }
  }, []);
  const onSendMessage = useCallback(async (newMessage: string) => {
    if (!chatId || !newMessage) { return; }
    newMessage = newMessage?.trim();
    if (!newMessage?.length || (!newMessage.includes('base64') && newMessage?.length > 300)) {
      return;
    }
    const filesKeys: string[] = [];
    if (newMessage.includes('base64')) {
      const fileName = newMessage
        .replace('![](', '')
        .replace(/\)$/, '');
      const file = await convertBase64ToFile(fileName);
      if (file) {
        filesKeys.push(...await uploadImages([file]));
      }
      newMessage = '';
    }
    await onSendToBack({ chatId, message: newMessage.trim(), filesKeys });
  }, [chatId, messagesById]);

  return [onClickWrapper, onSendMessage];
};
