import React from "react";
import { PrimeReactProvider } from "primereact/api";
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


//theme
import { Provider } from "react-redux";
import store from "./redux/store";
// import "primereact/resources/themes/lara-light-indigo/theme.css";


const queryClient = new QueryClient()

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

function MyHotDashProviders({children}) {
    const [showDevtools, setShowDevtools] = React.useState(false)

    const value = {
      inputStyle: 'filled',
      ripple: true,
  };

    React.useEffect(() => {
        // @ts-ignore
        window.toggleDevtools = () => setShowDevtools((old) => !old)
    }, [])


    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <PrimeReactProvider value={value}>
              {children}
              <ReactQueryDevtools initialIsOpen />
              {showDevtools && (
                <React.Suspense fallback={null}>
                  <ReactQueryDevtoolsProduction />
                </React.Suspense>
              )}
            </PrimeReactProvider>
        </QueryClientProvider>
      </Provider>
    );
}

export default MyHotDashProviders;
