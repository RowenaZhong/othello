// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import DashBoard from './dashboard'
import { StatusProvider } from "./StatusProvider";
const App: React.FC = () => {
    return (
        <StatusProvider>
            <DashBoard />
        </StatusProvider>
    )
}

export default App
