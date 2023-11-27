import { useState, useEffect } from 'react';

const useIsLargeScreen = () =>
{
  const isBrowser = typeof window !== 'undefined';
  const [isLargeScreen, setIsLargeScreen] = useState(
    isBrowser ? window.innerWidth >= 991 : false
  );

  useEffect(() =>
  {
    const handleResize = () =>
    {
      setIsLargeScreen(window.innerWidth >= 991);
    };
    if (isBrowser)
    {


      // Attach the event listener
      window.addEventListener('resize', handleResize);

      // Initial check
      handleResize();
    }
    // Detach the event listener on component unmount
    return () =>
    {
      window.removeEventListener('resize', handleResize);
    };
  }, [isBrowser]);

  return isLargeScreen;
};

export default useIsLargeScreen;
