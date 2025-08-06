import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  chatRooms: [],
  activeRoom: null,
  messages: {},
  typing: false
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createRoom: (state, action) => {
      const newRoom = {
        id: nanoid(),
        title: action.payload.title || `Chat ${state.chatRooms.length + 1}`,
        createdAt: new Date().toISOString()
      };
      state.chatRooms.unshift(newRoom);
      state.messages[newRoom.id] = [];
      state.activeRoom = newRoom.id;
    },
    deleteRoom: (state, action) => {
      const roomId = action.payload;
      state.chatRooms = state.chatRooms.filter(room => room.id !== roomId);
      
      if (state.activeRoom === roomId) {
        state.activeRoom = state.chatRooms[0]?.id || null;
      }
    },
    setActiveRoom: (state, action) => {
      state.activeRoom = action.payload;
    },
    sendMessage: (state, action) => {
      const { roomId, text, image } = action.payload;
      if (!state.messages[roomId]) state.messages[roomId] = [];
      
      state.messages[roomId].push({
        id: nanoid(),
        text,
        image,
        sender: 'user',
        timestamp: new Date().toISOString()
      });
      
      state.typing = true;
    },
    addAIMessage: (state, action) => {
      const { roomId, text } = action.payload;
      state.messages[roomId].push({
        id: nanoid(),
        text,
        sender: 'ai',
        timestamp: new Date().toISOString()
      });
      state.typing = false;
    },
    setTyping: (state, action) => {
      state.typing = action.payload;
    }
  }
});

export const { 
  createRoom, 
  deleteRoom, 
  setActiveRoom, 
  sendMessage, 
  addAIMessage,
  setTyping
} = chatSlice.actions;

export default chatSlice.reducer;




// simulateAIResponse: (state, action) => {
//   const { roomId } = action.payload;
//   state.typing = true;
  
//   setTimeout(() => {
//     state.messages[roomId].push({
//       id: nanoid(),
//       text: "This is a simulated AI response",
//       sender: 'ai',
//       timestamp: new Date().toISOString()
//     });
//     state.typing = false;
//   }, 2000);
// },
// loadMoreMessages: (state, action) => {
//   // Pagination implementation
// }
