import React, {useEffect} from 'react';
import Auth from '../Auth';

const AppNurse = () => {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return <>{!session ? <Auth /> : <div>AppNurse</div>}</>;

};

export default AppNurse;
