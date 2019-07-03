import { JarvisProvider } from './jarvisContext';

const AppContextsProvider: React.FC = ({ children }) => (
  <JarvisProvider>
    {children}
  </JarvisProvider>
)

export default AppContextsProvider;