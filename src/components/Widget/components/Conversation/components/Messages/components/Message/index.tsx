import format from 'date-fns/format';
import cn from 'classnames';
import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';

import { MessageTypes } from 'src/store/types';

import './styles.scss';

type Props = {
  message: MessageTypes;
  showTimeStamp: boolean;
}

function Message({ message }: Props) {
  const sanitizedHTML = markdownIt({ break: true })
    .use(markdownItClass, {
      img: ['rcw-message-img']
    })
    .use(markdownItSup)
    .use(markdownItSanitizer)
    .use(markdownItLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } })
    .render(message.text);
  const isImg = message.text.includes('![]');
  
  return (
    <div className={cn("message",  !isImg ? '' : 'img-message')}>
      {message.timestamp && <span className="rcw-timestamp">{format(new Date(message.timestamp), 'hh:mm')}</span>}
      <div className={`rcw-${message.sender}`}>
        <div className="rcw-message-text" dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/,'') }} />
      </div>
    </div>
  );
}

export default Message;
