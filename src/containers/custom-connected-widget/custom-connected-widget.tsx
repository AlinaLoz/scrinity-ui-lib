import React from 'react';
import cn from 'classnames';

import '../../../assets/styles/main.scss';
import './style.scss';
import Widget from '../../components/Widget';

import { IChatById, ISendMessageRequest } from './../../interfaces';
import { TMessagesByDay } from '../../helpers';
import { useChangeOpenedChat, useSubmitChat, useUpdateChatMessages } from './hooks';
import store from "../../store";
import { Provider } from 'react-redux';
import { Props } from '../connected-widget/connected-widget';

export type ChatProps = Props & {
  chatTitle: string;
  userId?: number;
  messages: IChatById[];
  messagesById: TMessagesByDay;
  institution: { id: number } | null;
  goBack: () => void;
  sendMessageAPI: (data: ISendMessageRequest) => Promise<void>;
  uploadImagesAPI: (data: FormData) => Promise<{ imagesKeys: string[] }>;
} & typeof defaultProps;

const Help = (props: ChatProps) => {
  const [onSubmitChat, onSendMessage] = useSubmitChat({
    userId: props.userId,
    messagesById: props.messagesById,
    goBack: props.goBack,
    institutionId: props.institution?.id,
    sendMessageAPI: props.sendMessageAPI,
    uploadImagesAPI: props.uploadImagesAPI,
    chatId: props.chatId,
  });
  useChangeOpenedChat(props.messages);
  useUpdateChatMessages({
    userId: props.userId,
    messagesById: props.messagesById,
    institution: props.institution,
  });
  
  return (
    <div
      role="button"
      onKeyPress={() => {}}
      onClick={onSubmitChat}
      tabIndex={-1}
      className={cn('wrapper')}
    >
      <Widget
        {...props}
        handleNewUserMessage={onSendMessage}
      />
    </div>
  );
};
export const CustomConnectedWidget = (props: ChatProps) => (
  <Provider store={store}>
    <Help {...props} />
  </Provider>
);

const defaultProps = {
  userId: 0,
  chatId: 0,
  emojis: true,
  title: 'Аноним',
  subtitle: 'This is your chat subtitle',
  senderPlaceHolder: 'Напишите сообщение',
  showCloseButton: true,
  fullScreenMode: false,
  autofocus: true,
  launcherOpenLabel: 'Open chat',
  launcherCloseLabel: 'Close chat',
  launcherOpenImg: '',
  launcherCloseImg: '',
  sendButtonAlt: 'Send',
  showTimeStamp: true,
  imagePreview: true,
  zoomStep: 80,
  showBadge: true,
};
CustomConnectedWidget.defaultProps = defaultProps;

export default CustomConnectedWidget;
