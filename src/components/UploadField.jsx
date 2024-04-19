import { useState } from 'react';
import plusIcon from '../img/icons/plus-icon.svg'
import preloaderIcon from '../img/icons/preloader.svg'

function UploadField(){

    let [isWaiting, setWaiting] = useState(false);
    let iconTag = (<img class="upload-field__icon" src={plusIcon} />);
    if (isWaiting) iconTag = (<img class="upload-field__icon" src={preloaderIcon} />);
    return (
        <div class="upload-field nice-border">
            {iconTag}
            <p class="upload-field__text">Перетащите в эту область файл для пооверки (doc, docx или pdf до 10
                Мб) или нажмите на кнопку</p>
            <form action="#" method="post" enctype="multipart/form-data"> 
            <input type="file" id="upload-file" name="file"/>
            <label class="btn-1" for="upload-file" onClick={() => setWaiting(true)}> Загрузить файл</label>
            </form>
        </div>
    );
}

export default UploadField;