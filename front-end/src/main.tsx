import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router.tsx'
import "./app.css"
createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}></RouterProvider>
)
