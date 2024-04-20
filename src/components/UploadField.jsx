import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import UploadButton from './UploadButton';
import fileSubmit from '../helpers/FileUploader.js'

import plusIcon from '../img/icons/plus-icon.svg'
import preloaderIcon from '../img/icons/preloader.svg'

function UploadField(){

    let [isWaiting, setWaiting] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const defaultText = "Перетащите в эту область файл для пооверки (doc, docx или pdf до 10 Мб) или нажмите на кнопку";
    const loadingText = "Документ обрабатывается. Это может занять некоторое время, не закрывайте вкладку браузера";

    const data = {
        action: "#",
        method: "post",
        enctype: "multipart/form-data",
        inputId: "upload-file",
        inputName: "file",
        labelClass: "btn-1",
        labelText: "Загрузить файл",
        onChange: (event) => {handleFileChoosen(event)}
    };

    function handleFileChoosen(event) {
        setFile(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    function handleFileDropped(){ 
        return;
    }

    useEffect(() => {
        if (file) {
            fileSubmit(file, 'https://info-marker.ru/api/files/upload.php', processResponse);
            setWaiting(true);
        } else {
            setWaiting(false);
        }
    }, [file]);

    function processResponse (response) {
        navigate('/file', {state: response.data});
    }

    return (
        <section>
          <div class="container">
            <div class="upload-field nice-border">
                <img class="upload-field__icon" src={isWaiting ? preloaderIcon : plusIcon}/>
                <p class="upload-field__text">{isWaiting ? loadingText : defaultText}</p>
                {isWaiting ? null : <UploadButton data={data} /> }
            </div>
            </div>
        </section>
        
    );
}

export default UploadField;