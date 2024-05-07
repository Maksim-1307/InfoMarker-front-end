
import React, { createElement, useState } from 'react';
import "./Report.scss"
import { fileContext } from "./FileContext";
import { useContext } from 'react';

function Report(props) {

    const {setName} = useContext(fileContext);

    try{
        
        const reportList = [];
        for (let name in props.content){
            const color = props.content[name].color;
            const count = props.content[name].count;
            reportList.push((
                <div class="report-table__row" style={{ background: "#" + color}} onClick={()=>{setName(name)}}>
                    <div>{name}</div>
                    <div><b>{count}</b></div>
                </div>
            ));
        }
        // props.content.map(element => (
        //     <div class="report-table__row" style={{ background: element.color }}>
        //         <div>{element.name}</div>
        //         <div><b>{element.count}</b></div>
        //     </div>
        // ));


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

    } catch (e){
        console.error(e);
        return (
            <div class="report">
                <h3>Обнаруженные упоминания</h3>
                <div class="report-table">
                    <div class="report-table__row report-table__header">
                        ошибка загрузки контента
                    </div>
                </div>
            </div>);

    }
}

export default Report;