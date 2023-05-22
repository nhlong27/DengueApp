import React, { useEffect } from 'react';
import Auth from '../Auth';
import { userSession } from '../Auth';
import {useAtom} from 'jotai'

const AppPatient = () => {
  const [session] = useAtom(userSession)
  return (
    <>
      kdjfkdjf
    </>
  );
};

export default AppPatient;
