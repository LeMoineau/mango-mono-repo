import { RouteObject } from 'react-router-dom'
import RootLayout from './app/layout'
import NotFound from './app/not-found'
import ViewerPage from './app/viewer/ViewerPage'
import Home from './app/home/Home'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: '',
                element: <Home></Home>,
            },
        ],
    },
    {
        path: '/viewer',
        element: <ViewerPage></ViewerPage>,
    },
]
