import { RouterProvider } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { TelemetryProvider } from './context/TelemetryContext';
import { router } from './routes';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TelemetryProvider>
          <RouterProvider router={router} />
        </TelemetryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
