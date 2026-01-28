'use client';
import { useState } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

// 1. 创建Wagmi配置（支持主网/测试网）
const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export default function RootLayout({ children }) {
  // 2. 创建React Query客户端
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        {/* 3. 注入Wagmi和React Query Provider */}
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
            {/* 4. 全局提示框组件 */}
            <ToastContainer position="top-right" autoClose={3000} />
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
