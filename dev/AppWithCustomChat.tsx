import CustomWidget from '../src/containers/custom-connected-widget/custom-connected-widget';

const INSTITUTION: { id: number } = {
  id: 1,
};

const MESSAGES = [
  {
    id: 1,
    content: 'тестовое сообщение',
    sender: { id: 2, phoneNumber: '+375333117243' },
    createdAt: '2021-12-28T17:08:56.327Z',
    files: [{ filename: '1636219714583-1636219714577.png', index: 0 }],
  },
];

const MESSAGES_BY_ID = {
  '2021-12-28T17:08:56.327Z': MESSAGES,
};

export const App = () => {
  return (
    <CustomWidget
      chatTitle={"Аноним"}
      chatId={1}
      userId={1}
      goBack={async () => alert('goBack')}
      messages={MESSAGES}
      institution={INSTITUTION}
      handleNewUserMessage={() => {}}
      sendMessageAPI={async () => console.log('sendMessageAPI')}
      uploadImagesAPI={async () => ({ imagesKeys: []})}
      messagesById={MESSAGES_BY_ID}
    />
  );
};
