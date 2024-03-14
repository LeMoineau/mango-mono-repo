import React from 'react'
import ReactDOM from 'react-dom/client'
import './common/config/globals.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './common/config/i18n'
import { routes } from './router'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
)
