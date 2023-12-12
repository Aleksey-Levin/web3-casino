import { RouterProvider } from 'react-router-dom'

import { router } from './pages/router.tsx'
import { Providers } from './providers.tsx'

export const App = function App() {
    return (
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    )
}
