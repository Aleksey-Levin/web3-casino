import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Loading from "./app/components/Loading/Loading.tsx";

const App = React.lazy(() => import('./App').then(module => ({ default: module.App })))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <React.Suspense fallback={<Loading />}>
          <App />
      </React.Suspense>
  </React.StrictMode>,
)
