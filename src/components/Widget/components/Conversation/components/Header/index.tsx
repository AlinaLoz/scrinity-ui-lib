const close = require('../../../../../../../assets/images/clear-button.svg') as string;

import './style.scss';

type Props = {
  title: string;
  subtitle: string;
  toggleChat: () => void;
  showCloseButton: boolean;
  titleAvatar?: string;
}

function Header({ title, subtitle, toggleChat, showCloseButton, titleAvatar }: Props) {
  return (
    <div className="rcw-header">
      <button className="rcw-close-button" onClick={toggleChat}>
        <img src={close} className="rcw-close" alt="close" />
      </button>
      <p className="rcw-title">
        {title}
      </p>
    </div>
  );
}

export default Header;
