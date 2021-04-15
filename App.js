import React, {useEffect, useRef} from 'react';
import Navigation from './navigations/Navigation';
import {LogBox} from 'react-native'
import { startNofications } from './util/action';

LogBox.ignoreLogs(['Setting a timer']);

LogBox.ignoreAllLogs()

export default function App() {
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    startNofications(notificationListener, responseListener)
  }, [])

  return (
     <Navigation></Navigation>
    )
}

