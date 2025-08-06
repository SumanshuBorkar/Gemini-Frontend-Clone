import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FiSend, FiImage } from 'react-icons/fi';
import { sendMessage, addAIMessage, setTyping, setActiveRoom } from './../../redux/chatSlice';
import ChatBubble from './ChatBubble';
import { toast } from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import './ChatInterface.css';

const ChatInterface = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const { messages, typing } = useSelector(state => state.chat);
  const isDark = useSelector((state) => state.ui.darkMode);
  const messagesEndRef = useRef(null);
  const [messageText, setMessageText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const { ref: loadMoreRef, inView } = useInView();

  const roomMessages = roomId ? messages[roomId] || [] : [];

  useEffect(() => {
    if (roomId) {
      dispatch(setActiveRoom(roomId));
    }
  }, [roomId, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [roomMessages]);

  useEffect(() => {
    if (inView && page > 1 && !loadingMore) {
      loadMoreMessages();
    }
  }, [inView]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMoreMessages = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoadingMore(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!messageText.trim() && !imagePreview) return;

    dispatch(sendMessage({
      roomId,
      text: messageText,
      image: imagePreview,
    }));

    setMessageText('');
    setImagePreview(null);

    const delay = 1000 + Math.random() * 2000;
    dispatch(setTyping(true));

    setTimeout(() => {
      dispatch(addAIMessage({
        roomId,
        text: getSimulatedAIResponse(messageText),
      }));
    }, delay);
  };

  const getSimulatedAIResponse = (userMessage) => {
    const responses = [
      "I understand your question about: " + userMessage,
      "That's an interesting point about: " + userMessage,
      "I've considered your input on: " + userMessage,
      "Based on your message: " + userMessage + ", I recommend...",
      "Thanks for sharing: " + userMessage + ". Here's my perspective...",
      "Let me think about that... Regarding " + userMessage + ", I'd suggest...",
      "Interesting! About " + userMessage + ", here's what I know..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!roomId) {
    return (
      <div className={`chat-interface ${isDark ? 'dark' : ''} chat-placeholder-wrapper`}>
        <div className="chat-placeholder">
          <div className="text-center p-8 max-w-md">
            <h3 className="mb-2" style={{ fontWeight: '600', fontSize: '1.25rem', color: isDark ? '#f9fafb' : '#111827' }}>
              No Chat Selected
            </h3>
            <p style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>
              Select a chat from the sidebar or create a new one
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat-interface ${isDark ? 'dark' : ''}`}>
      <div className="chat-messages">
        {roomMessages.length === 0 ? (
          <div className="chat-placeholder">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <>
            {page > 1 && (
              <div ref={loadMoreRef} className="load-more">
                {loadingMore ? (
                  <div className="loading-dots" aria-label="Loading older messages">
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                  </div>
                ) : (
                  "Scroll up to load more messages"
                )}
              </div>
            )}

            {roomMessages.map(message => (
              <ChatBubble key={message.id} message={message} />
            ))}

            {typing && (
              <div className="typing-indicator" aria-live="polite">
                <div className="typing-dots" aria-hidden="true">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
                <span>Gemini is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="chat-input-area">
        {imagePreview && (
          <div className="image-preview-container">
            <img src={imagePreview} alt="Preview" />
            <button
              onClick={() => setImagePreview(null)}
              className="remove-image-btn"
              aria-label="Remove image"
              type="button"
            >
              &times;
            </button>
          </div>
        )}

        <div className="input-controls">
          <label htmlFor="image-upload" className="image-upload-label" title="Upload Image">
            <FiImage size={20} aria-hidden="true" />
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              aria-label="Upload image"
            />
          </label>

          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="message-textarea"
            rows={1}
            aria-label="Message input"
          />

          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim() && !imagePreview}
            className={`send-button ${messageText.trim() || imagePreview ? 'enabled' : 'disabled'}`}
            aria-label="Send message"
            type="button"
          >
            <FiSend size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
