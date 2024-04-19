import Header from './components/Header.jsx';
import UploadField from './components/UploadField.jsx'
import Note from './components/Note.jsx';
import Footer from './components/Footer.jsx';

import './style.css'

function App() {
  return (
    <>
      <div class="wrapper">
        <Header />
        <section class="upload-section">
          <div class="container">
            <UploadField />
          </div>
        </section>
        <section class="note-section">
          <div class="container">
            <Note content={(<>Результаты проверки <b>[InfoMarker]*</b> носят строго рекомендательный
              характер и не могут использоваться в качестве юридического документа</>)}/>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default App;
