import { RouterProvider } from 'react-router-dom'

import { router } from './app/pages/router.tsx'
import { Providers } from './providers.tsx'

export const App = function App() {
    return (
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    )
}
