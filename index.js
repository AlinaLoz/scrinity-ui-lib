import 'react/jsx-runtime';

import ConnectedWidget from './src/containers/connected-widget/connected-widget';
import CustomConnectedWidget, { ChatProps } from './src/containers/custom-connected-widget/custom-connected-widget';

import {
  addUserMessage,
  addResponseMessage,
  addLinkSnippet,
  renderCustomComponent,
  toggleWidget,
  toggleInputDisabled,
  toggleMsgLoader,
  dropMessages,
  isWidgetOpened,
  setQuickButtons,
  deleteMessages,
  markAllAsRead,
  setBadgeCount
} from './src/store/dispatcher';

export {
  ConnectedWidget as Widget,
  CustomConnectedWidget as CustomWidget,
  ChatProps,
  addUserMessage,
  addResponseMessage,
  addLinkSnippet,
  renderCustomComponent,
  toggleWidget,
  toggleInputDisabled,
  toggleMsgLoader,
  dropMessages,
  isWidgetOpened,
  setQuickButtons,
  deleteMessages,
  markAllAsRead,
  setBadgeCount
};
