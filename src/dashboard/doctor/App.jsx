import React, { useEffect, useState, createContext } from 'react';
import Navbar from './components-supabase/Navbar';
import Sidebar from './components-supabase/Sidebar';
import Chatbox from './components-supabase/Chatbox';
import ContentContainer from './components-supabase/ContentContainer';
import Auth from './Auth';
import { supabase } from '@/shared/api/supabase/supabaseClient';

export const AppContext = createContext();


function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <AppContext.Provider value={{ session, setSession }}>
      {!session ? (
        <Auth />
      ) : (
        <div className="flex h-screen w-screen flex-auto bg-cyan-50">
          <Sidebar />
          <div
            className=" flex flex-grow flex-col"
          >
            <Navbar />
            <main className="flex h-[90%] w-[100%] flex-auto">
              <ContentContainer />
              <Chatbox />
            </main>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}

export default App;
