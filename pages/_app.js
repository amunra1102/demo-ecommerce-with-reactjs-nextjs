import '../styles/globals.css';

import Layout from '../components/layout';
import { DataProvider } from '../store/global-state';

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  );
}

export default MyApp;
