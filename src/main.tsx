import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import CoverPage from './components/pages/coverPage/CoverPage.js'
import AddContent from './components/pages/addContent/AddContent.js'
import Dashboard from './components/pages/dashboard/Dashboard.js'
import store from "./Store/store"
import { Provider} from 'react-redux'
import ErrorPage from './components/pages/ErrorPage.js'



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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
