import React from 'react'
import { createRoot } from 'react-dom/client'
import AdviceGenerator from './AdviceGenerator'

import "./App.sass"

const App = () =>(
    <main>
        <AdviceGenerator />
    </main>
)

class Storage
{
    store = sessionStorage
    items = []

    constructor (name) {
        this.name = name
    }
    
    save () {
        this.store.setItem(this.name, JSON.stringify(this.items))    
    }
    getAll () {
        const items = this.store.getItem(this.name)
        this.items = items ? JSON.parse(items) : []
        return this.items
    }

    getItem (key) {
        return this.items[key]
    }
    addItem (value) {
        this.items = [...this.items, value]
        this.save()
    }
}
class Chat
{
    storage = new Storage

    addComment () {
        this.storage.addItem()
    }
}

const root = createRoot(document.getElementById('app'))
root.render(<App />)