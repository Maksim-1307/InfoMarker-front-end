import Report from "./Report";
import Note from "./Note";
import FileContent from "./FileContent";

import { useLocation } from "react-router-dom";

function File() {

    const noteContent = (<>
        <p>В тексте обнаружено <b>17</b> упоминаний <b>4</b> иноагентов или нежелательных организаций. </p>
        <p>Места в тексте с выявленными совпадениямиотмечены цветом. Мы не храним ваши загруженные документы и сформированные отчеты, но вы можете скачать отчет о сверке этого текста в формате pdf. </p>
        <a class="btn-1" href="#">Скачать отчет</a>
    </>);

    const location = useLocation();

    return (
        <section class="file-body">
            <div class="container file-body__container">
                <div class="file-body__left">
                    <FileContent content={location["state"]["content"]}/>
                </div>
                <div class="file-body__right">
                    <Note content={noteContent}/>
                    <Report content={location["state"]["found"]}/>
                </div>
            </div>
        </section>
    );
}

export default File;
