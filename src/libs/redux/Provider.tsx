// store/Provider.tsx
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { setupListeners } from '@reduxjs/toolkit/query';
import { logApi } from '@/services/logApi';
setupListeners(store.dispatch);
interface Props {
  children: ReactNode;
}

const ReduxProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;