import "./App.css";
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './component/PrivateRoute'

import React from "react";
import { LandingLayout } from "./component/LandingLayout";
import { IntroPage } from "./page/intro-page";
import { MainPage } from "./page/main-page";
import { LoginPage } from "./page/login-page";
import { RegisterPage } from "./page/register-page";

import { ManageProjectPage } from "./page/manage-project-page"
import { RenderPage } from "./page/render-page";
import { MarkerControlPage } from "./page/marker-control-page"
import { AddModel } from "./page/add-model"


function App() {
  return (
    <LandingLayout>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route exact path='/' element={<PrivateRoute />}>
          <Route path="/project" element={<MainPage />} />
          <Route path="/control/marker" element={<MarkerControlPage />} />
          <Route path="/project/:projectId" element={<ManageProjectPage />} />
        </Route>
        <Route path="/render/:projectId" element={<RenderPage />} />
        <Route path="/add-model" element={<AddModel />} />

      </Routes>
    </LandingLayout>
  );
}

export default App;
