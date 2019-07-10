import { JarvisProvider } from './jarvis';

const GlobalStateProvider: React.FC = ({ children }) => (
  <JarvisProvider>{children}</JarvisProvider>
);

export default GlobalStateProvider;
