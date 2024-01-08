import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Loading from "./app/components/Loading/Loading.tsx";

const App = React.lazy(() =>
    new Promise<typeof import("./App")>(( resolve ) => {
        setTimeout(async () => {
            resolve(import('./App'))
        }, 3000)
    }).then(module => ({ default: module.App })))

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <React.Suspense fallback={<Loading />}>
            <App />
        </React.Suspense>
    </React.StrictMode>,
)
