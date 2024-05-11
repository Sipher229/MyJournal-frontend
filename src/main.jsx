import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import CoverPage from './components/pages/coverPage/CoverPage.jsx'
import AddContent from './components/pages/addContent/AddContent.jsx'
import Dashboard from './components/pages/dashboard/Dashboard.jsx'
import { store } from './Store/store.js'
import { Provider} from 'react-redux'
import ErrorPage from './components/pages/ErrorPage.jsx'



const router = createBrowserRouter(
[
  {
    path: "/",
    element: <CoverPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/app",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/app/addcontent",
        element: <AddContent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/app/dashboard",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/app/addcontent/:id",
        element: <AddContent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/app/dashboard.search_results/:query",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      }
    ]
  }
],
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
