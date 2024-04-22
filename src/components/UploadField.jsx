import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import UploadButton from './UploadButton';
import fileSubmit from '../helpers/FileUploader.js'
import { useRef } from 'react';

import plusIcon from '../img/icons/plus-icon.svg'
import preloaderIcon from '../img/icons/preloader.svg'

function UploadField(){

    let [isWaiting, setWaiting] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const myRef = useRef(null);

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

    const handleDrop = function (e) {
        e.preventDefault();
        console.log('file');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOverLeave = function (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // $(".upload-field").on("dragover", );

    // $(".upload-field").on("dragleave", function (event) {
    //     event.preventDefault();
    //     event.stopPropagation();
    // });

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
                <div class="upload-field nice-border" ref={myRef} onDrop={handleDrop} onDragOver={handleDragOverLeave} onDragLeave={handleDragOverLeave}>
                <img class="upload-field__icon" src={isWaiting ? preloaderIcon : plusIcon}/>
                <p class="upload-field__text">{isWaiting ? loadingText : defaultText}</p>
                {isWaiting ? null : <UploadButton data={data} /> }
            </div>
            </div>
        </section>
        
    );
}

export default UploadField;