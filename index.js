import 'react/jsx-runtime';

import ConnectedWidget from './src/containers/connected-widget/connected-widget';

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
