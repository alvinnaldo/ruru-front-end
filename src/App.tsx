import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { RootLayout } from './routes/RootLayout';
import { AuthLayout } from './routes/AuthLayout';
import { LandingPage } from './routes/LandingPage';
import { LoginForm } from './features/auth/components/LoginForm';
import { RegisterForm } from './features/auth/components/RegisterForm';

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
        path: '/dashboard',
        element: (
          <div className="h-full flex flex-col">
            <h1 className="text-2xl font-bold mb-4 tracking-tight">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] p-4 rounded-lg border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] shadow-sm">
                <h3 className="font-semibold text-sm text-[var(--color-text-light)]/70 dark:text-[var(--color-text-dark)]/70 mb-1">Active Tasks</h3>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] p-4 rounded-lg border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] shadow-sm">
                <h3 className="font-semibold text-sm text-[var(--color-text-light)]/70 dark:text-[var(--color-text-dark)]/70 mb-1">Completed This Week</h3>
                <p className="text-3xl font-bold text-[var(--color-primary)]">28</p>
              </div>
              <div className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] p-4 rounded-lg border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] shadow-sm">
                <h3 className="font-semibold text-sm text-[var(--color-text-light)]/70 dark:text-[var(--color-text-dark)]/70 mb-1">Needs Attention</h3>
                <p className="text-3xl font-bold text-[var(--color-accent)]">3</p>
              </div>
            </div>
            
            <div className="mt-8 flex-1 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] rounded-lg bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                <h2 className="font-semibold">Recent Activity</h2>
              </div>
              <div className="flex-1 p-4 flex items-center justify-center text-sm text-[var(--color-text-light)]/50 dark:text-[var(--color-text-dark)]/50">
                No recent activity to show.
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  // Auth routes would go here (bypassing RootLayout)
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
