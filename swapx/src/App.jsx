import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Tokens from './components/Tokens';
import Swap from './components/Swap';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className='App'>
          <Header />
          <div className='mainWindow'>
            <Routes>
              <Route path='/' element={<Swap />} />
              <Route path='/tokens' element={<Tokens />} />
            </Routes>
          </div>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
