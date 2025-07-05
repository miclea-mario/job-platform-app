import { store } from '@auth';
import { whoami } from '@functions';
import { useEffect, useState } from 'react';

const useProfile = () => {
  const [status, setStatus] = useState('loading');
  const [me, setMe] = useState(null);

  useEffect(() => {
    // Set initial status based on token existence
    const token = store.getState();

    if (token) {
      try {
        const userData = whoami();
        setMe(userData);
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    } else {
      setStatus('error');
      setMe(null);
    }

    // Subscribe to store changes for authentication state updates
    const unsubscribe = store.subscribe(() => {
      const currentToken = store.getState();

      if (currentToken) {
        try {
          const userData = whoami();
          setMe(userData);
          setStatus('success');
        } catch (err) {
          setStatus('error');
        }
      } else {
        setStatus('error');
        setMe(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { status, me };
};

export default useProfile;
