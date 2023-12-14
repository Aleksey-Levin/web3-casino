import { RouterProvider } from 'react-router-dom'

import { Providers } from './providers.tsx'
import {router} from "./app/pages/router.tsx";

export const App = function App() {
    return (
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    )
}
