# Gemini Frontend Clone - Kuvaka Tech Assignment

Link to Demo video
[https://www.loom.com/share/ce12450ede7b4f0a83eeb6046b0aa84b?sid=792a135d-1f58-49b5-a1d5-ef82703e267b](https://www.loom.com/share/ce12450ede7b4f0a83eeb6046b0aa84b?sid=792a135d-1f58-49b5-a1d5-ef82703e267b) 

A responsive Gemini-style conversational AI chat application with OTP authentication, chatroom management, and simulated AI responses.

## Live Demo

[gemini-frontend-clone-five.vercel.app](gemini-frontend-clone-five.vercel.app) 

## Features

✅ **OTP Authentication**  
- Country code selection from REST Countries API  
- Form validation with React Hook Form + Zod  
- Simulated OTP send/verify flow  

✅ **Chatroom Management**  
- Create/delete chatrooms  
- Search/filter chatrooms  
- Toast notifications for all actions  

✅ **AI Chat Interface**  
- Simulated AI responses with typing indicators  
- Message timestamps and copy-to-clipboard  
- Image upload support (base64 preview)  
- Infinite scroll pagination (20 messages per page)  

✅ **Global UX Features**  
- Dark/light mode toggle  
- Mobile-responsive design  
- Loading skeletons  
- Keyboard accessibility  
- Redux state persistence (localStorage)  

## Tech Stack

- **Framework**: React 18  
- **State Management**: Redux Toolkit + redux-persist  
- **Form Handling**: React Hook Form + Zod  
- **Styling**: Tailwind CSS  
- **UI Components**: Headless UI + React Icons  
- **Notifications**: react-hot-toast  
- **Deployment**: Vercel  

## Project Structure

```bash
src/
├── components/          # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── chat/            # Chat interface components
│   ├── dashboard/       # Dashboard components
│   └── ui/              # Global UI components
├── redux/            # Redux feature slices
├── hooks/               # Custom React hooks
├── pages/               # Page-level components
├── store/               # Redux store configuration
├── utils/               # Utility functions
└── App.js               # Main application component
