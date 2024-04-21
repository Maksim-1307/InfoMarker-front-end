import Report from "./Report";
import Note from "./Note";
import FileContent from "./FileContent";

import { useLocation } from "react-router-dom";

function File() {

    try{
        const location = useLocation();

        function countStats() {
            let total = location["state"]["found"].length;
            let count = 0;
            location["state"]["found"].forEach(element => {
                count += element.count;
            });
            return {
                total: total,
                count: count
            }
        }

        const stats = countStats();

        const noteContent = (<>
            <p>В тексте обнаружено <b>{stats.total}</b> упоминаний <b>{stats.count}</b> иноагентов или нежелательных организаций. </p>
            <p>Места в тексте с выявленными совпадениямиотмечены цветом. Мы не храним ваши загруженные документы и сформированные отчеты, но вы можете скачать отчет о сверке этого текста в формате pdf. </p>
            <a class="btn-1" href={location["state"]["download_link"]} download>Скачать отчет</a>
        </>);

        return (
            <section class="file-body">
                <div class="container file-body__container">
                    <div class="file-body__left">
                        <FileContent content={location["state"]["content"]} />
                    </div>
                    <div class="file-body__right">
                        <Note content={noteContent} />
                        <Report content={location["state"]["found"]} />
                    </div>
                </div>
            </section>
        );
    } catch {
        return (
        <section>
            <div class="container">
                <div>Ошибка загрузки контента</div><br/>
                <a class="btn-1" href="..">вернуться на главную</a>
            </div>
        </section>);
    }
}

export default File;
