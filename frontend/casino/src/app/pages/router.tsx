import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'

import { AppLayout } from '../components/App'
import { MainPage } from "./MainPage/MainPage.tsx";
import { NotMainPage } from "./NotMainPage/NotMainPage.tsx";
import { DiceGamePage } from './DiceGamePage/DiceGamePage.tsx';
import { RockPaperScissorsGamePage } from './RockPaperScissorsGamePage/RockPaperScissorsGamePage.tsx';
import { SlotGamePage } from './SlotGamePage/SlotGamePage.tsx';

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
    path: '/dice',
    element: <DiceGamePage />,
  },
  {
    path: '/rock-paper-scissors',
    element: <RockPaperScissorsGamePage />,
  },
  {
    path: '/slot',
    element: <SlotGamePage />,
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
