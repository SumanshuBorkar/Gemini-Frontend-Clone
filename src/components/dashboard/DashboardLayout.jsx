import { Routes, Route } from 'react-router-dom';
import ChatRoomsList from './ChatRoomsList';
import ChatInterface from '../chat/ChatInterface';
import './DashboardLayout.css'
import { useSelector } from 'react-redux';

export default function DashboardLayout() {
  const darkMode = useSelector((state) => state.ui.darkMode);
  const isSidebar = useSelector((state) => state.ui.isSidebar);

  return (
    <div className={`${darkMode ? 'dashboard-layout dark' : 'dashboard-layout'}`}>
      {isSidebar && (
        <div className="sidebar">
          <ChatRoomsList isDark={darkMode} />
        </div>
      )}

      <div className={`main-content${!isSidebar ? ' full-width' : ''}`}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="placeholder">
                <p>
                  Select a chat or create a new one
                </p>
              </div>
            }
          />
          <Route path="chat/:roomId" element={<ChatInterface />} />
        </Routes>
      </div>
    </div>
  );
}
