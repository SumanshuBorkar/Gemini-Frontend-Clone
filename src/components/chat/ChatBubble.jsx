import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import './ChatBubble.css';

export default function ChatBubble({ message }) {
  const [hover, setHover] = useState(false);

  const copyToClipboard = () => {
    if (message.text) {
      navigator.clipboard.writeText(message.text);
      toast.success('Copied to clipboard!');
    }
  };

  const isUser = message.sender === 'user';

  return (
    <div
      className={`chat-bubble ${isUser ? 'user' : 'ai'} ${isUser && 'dark'}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-live="polite"
    >
      {message.image && (
        <img src={message.image} alt="Uploaded content" />
      )}
      <p>{message.text}</p>
      <div className="chat-bubble-footer">
        <span>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        {hover && message.text && (
          <button
            onClick={copyToClipboard}
            className="copy-button"
            aria-label="Copy message"
          >
            <FiCopy size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
