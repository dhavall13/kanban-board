import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend as Backend } from 'react-dnd-html5-backend'
import { AppStateProvider } from './state/AppStateContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DndProvider backend={Backend}>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </DndProvider>
  </React.StrictMode>
)
