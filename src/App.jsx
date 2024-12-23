import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './Router';
import { GlobalStyle } from './styles/GlobalStyle';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
