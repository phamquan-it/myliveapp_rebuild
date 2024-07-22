// store/Provider.tsx
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { setupListeners } from '@reduxjs/toolkit/query';
import { store } from './store/store';
setupListeners(store.dispatch);
interface Props {
  children: ReactNode;
}

const ReduxProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;