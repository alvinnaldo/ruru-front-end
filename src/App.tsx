import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { RootLayout } from './routes/RootLayout';
import { AuthLayout } from './routes/AuthLayout';
import { LandingPage } from './routes/LandingPage';
import { LoginForm } from './features/auth/components/LoginForm';
import { RegisterForm } from './features/auth/components/RegisterForm';
import { Dashboard } from './features/workspace/components/Dashboard';
import { Taskboard } from './features/workspace/components/Taskboard';
import { ChatPage } from './features/chat/components/ChatPage';
import { TeamPage } from './features/team/components/TeamPage';
import { TimelinePage } from './features/timeline/components/TimelinePage';
import { SettingsPage } from './features/settings/components/SettingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/register',
        element: <RegisterForm />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'taskboard',
        element: <Taskboard />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'team',
        element: <TeamPage />,
      },
      {
        path: 'timeline',
        element: <TimelinePage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
