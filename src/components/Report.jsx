
import React, { createElement } from 'react';

function Report(props) {

    const reportList = props.content.map(element => (
        <div class="report-table__row" style={{ background: element.color }}>
            <div>{element.name}</div>
            <div><b>{element.count}</b></div>
        </div>
    ));


    return (
    <div class="report">
        <h3>Обнаруженные упоминания</h3>
        <div class="report-table">
            <div class="report-table__row report-table__header">
                <div>иноагенты и организации</div>
                <div>количество</div>
            </div>
            {reportList}
        </div>
    </div>);
}

export default Report;