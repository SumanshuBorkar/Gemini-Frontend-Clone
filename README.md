# Gemini Frontend Clone - Kuvaka Tech Assignment

![App Screenshot](/screenshots/app-preview.png) 

A responsive Gemini-style conversational AI chat application with OTP authentication, chatroom management, and simulated AI responses.

## Live Demo

[View deployed application on Vercel](https://gemini-frontend-clone-five.vercel.app/login) 

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
├── features/            # Redux feature slices
├── hooks/               # Custom React hooks
├── pages/               # Page-level components
├── store/               # Redux store configuration
├── utils/               # Utility functions
└── App.js               # Main application component
