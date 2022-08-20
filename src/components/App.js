import React from 'react'
import { createRoot } from 'react-dom/client'
import AdviceGenerator from './AdviceGenerator'

import "./App.sass"

const App = () =>(
    <main>
        <AdviceGenerator />
    </main>
)

const root = createRoot(document.getElementById('app'))
root.render(<App />)