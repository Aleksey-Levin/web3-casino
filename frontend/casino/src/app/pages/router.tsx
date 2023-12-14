import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'

import { AppLayout } from '../components/App'
import {MainPage} from "./MainPage/MainPage.tsx";
import {NotMainPage} from "./NotMainPage/NotMainPage.tsx";
const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/example',
    element: <NotMainPage />,
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
