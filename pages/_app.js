import '../styles/globals.css'
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps}) {
  const size = useWindowSize();
  pageProps.size = size;
  return (
    <Component {...pageProps} />
  );
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({width: undefined, height: undefined});
  useEffect(() => {
    function handleResize() {
      setWindowSize({width: window.innerWidth, height: window.innerHeight});
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize
}


export default MyApp
