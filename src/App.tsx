import { AppContainer } from 'containers/AppContainer'
import { AuthorizedContainer } from 'containers/AuthorizedContainer'
import Dashboard from 'pages/Dashboard'
import SignIn from 'pages/SignIn'
import React from 'react'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const App: React.FC = _ => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <AppContainer>
              <SignIn />
            </AppContainer>
          }
        />
        <Route
          path="/"
          element={
            <AppContainer>
              <AuthorizedContainer>
                <Dashboard />
              </AuthorizedContainer>
            </AppContainer>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
