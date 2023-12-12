import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import { AppLayout } from '../components/App'
import { ExplorePage } from './ExplorePage/ExplorePage'

const routes: RouteObject[] = [
  {
    path: '/home',
    element: <ExplorePage />,
  },
  {
    path: '*',
    element: <Navigate replace to={'/'} />,
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: routes,
  },
])