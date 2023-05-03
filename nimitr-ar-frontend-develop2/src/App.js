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
import { ModelMain } from "./page/model-main";
import { ManageModelPage } from "./model/model-manage-page";
import { ModelControlPage } from "./page/model-control-page";
import { ModelControlPage2 } from "./model/model-control-page-2";


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
          <Route path="/model123/" element={<ModelControlPage />} />
        </Route>
        <Route path="/render/:projectId" element={<RenderPage />} />
        <Route path="/model-list/" element={<ManageModelPage />} />
        <Route path="/model/" element={<ModelMain />} />
        <Route path="/model2/" element={<ModelControlPage2 />} />
        

      </Routes>
    </LandingLayout>
  );
}

export default App;
