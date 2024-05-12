import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from './components/Header.jsx';
import UploadField from './components/UploadField.jsx'
import Note from './components/Note.jsx';
import Footer from './components/Footer.jsx';
import File from "./components/File.jsx";
import Registration from "./components/Registration.jsx";

import './style.css'

function App() {

  return (
    <BrowserRouter>
      <div class="wrapper">
        <Header />
        <Routes>
          <Route path="/" Component={UploadField} />
          <Route path="/file" Component={File} />
          <Route path="/registration" Component={Registration} />
        </Routes>
        <section class="note-section">
          <div class="container">
            <Note content={(<p>Результаты проверки <b>[InfoMarker]*</b> носят строго рекомендательный
              характер и не могут использоваться в качестве юридического документа</p>)}/>
          </div>
        </section>
      </div>
      <Footer />
    </BrowserRouter>
  ); 
} 

export default App;
