import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { createRoom, deleteRoom } from '../../redux/chatSlice';
import toast from 'react-hot-toast';
import './ChatRoomsList.css';

const ChatRoomsList = ({ isDark }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { chatRooms } = useSelector(state => state.chat);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRooms = chatRooms.filter(room =>
    room.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateRoom = () => {
    const newRoomTitle = prompt('Enter chat room title:') || '';
    if (newRoomTitle.trim()) {
      const action = dispatch(createRoom({ title: newRoomTitle }));
      navigate(`/dashboard/chat/${action.payload.id}`);
      toast.success('Chat room created!');
    }
  };

  const handleSelectRoom = (roomId) => {
    navigate(`/dashboard/chat/${roomId}`);
  };

  const handleDeleteRoom = (roomId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this chat?')) {
      dispatch(deleteRoom(roomId));
      toast.success('Chat room deleted');
    }
  };

  return (
    <div className={`chatrooms-container${isDark ? ' dark' : ''}`}>
      <div className="chatrooms-header">
        <div className="chatrooms-topbar">
          <h2 className="chatrooms-title">Chats</h2>
          <button
            onClick={handleCreateRoom}
            className="create-button"
            aria-label="Create new chat"
            title="Create new chat"
          >
            <FiPlus size={20} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Search chats..."
          className="chatrooms-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search chats"
        />
      </div>

      <div className="chatrooms-list">
        {filteredRooms.length === 0 ? (
          <div className="chatrooms-empty">
            {searchQuery ? 'No matching chats found' : 'No chats available'}
          </div>
        ) : (
          filteredRooms.map(room => {
            const isActive = location.pathname.includes(room.id);
            return (
              <div
                key={room.id}
                className={`chatroom-item${isActive ? ' active' : ''}`}
                onClick={() => handleSelectRoom(room.id)}
                role="button"
                tabIndex={0}
                onKeyPress={e => {
                  if (e.key === 'Enter') handleSelectRoom(room.id);
                }}
              >
                <div className="chatroom-info">
                  <h3 className="chatroom-title">{room.title}</h3>
                  <p className="chatroom-created">
                    Created: {new Date(room.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => handleDeleteRoom(room.id, e)}
                  className="delete-button"
                  aria-label={`Delete chat ${room.title}`}
                  title="Delete chat"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatRoomsList;
