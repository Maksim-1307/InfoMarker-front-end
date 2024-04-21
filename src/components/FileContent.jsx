import Parser from 'html-react-parser';

function FileContent(props){
    try {
        return (<div class="file-body__content">{(Parser(props["content"]))}</div>);
    } catch {
        return (<div class="file-body__content">ошибка загрузки контента</div>);
    }
}

export default FileContent;