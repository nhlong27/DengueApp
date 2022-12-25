import React, { useEffect } from 'react';
import Auth from '../Auth';

const AppPatient = () => {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return <>{!session ? <Auth /> : <div>AppPatient</div>}</>;
};

export default AppPatient;
