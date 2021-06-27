import * as React from 'react';
import { useEffect, useState } from "react";
import coverageData from '../../data/coverage.json';


type dataProps ={
    data: string[];
}

export const App: React.FC<dataProps> = () => {

{/* MAIN VARIABLES FROM OUR JSON DATA */}
    const rawData = [{...coverageData}];
    const data = rawData[0];

    // returns years
    const years = data.years;
    // returns coverage
    const coverage = data.coverage;
    // returns model keys from data.coverage
    const coverageKey = Object.keys(data.coverage);
    const models = data['vehicle-models'];
    
    {/* LOGIC FOR DISPLAYING DATA ON THE FE */}

    // because the script is loaded 
    useEffect(()=>{
        const cell = document.getElementsByClassName("coverage");
            for(var i = 0; i < cell.length; i++) {
                const cellYear = cell[i].getAttribute("data-coverage");
                const cellModel = cell[i].parentElement.getAttribute("data-model");
                const modelCoverage = coverage[cellModel];
                const confirmCoverage = modelCoverage.includes(parseInt(cellYear));
                if(confirmCoverage === true){
                    cell[i].classList.add("in");
                }
            }
    },[])

    // function that displays that updates JSON data and cell UI on click
    const updateCoverage = (e) =>{
        
        const cellYear = e.target.getAttribute("data-coverage");
        const cellModel = e.target.parentElement.getAttribute("data-model");
        const modelCoverage = coverage[cellModel];
        const confirmCoverage = modelCoverage.includes(parseInt(cellYear));

        if(confirmCoverage === true){
            modelCoverage.slice(modelCoverage.length, cellYear);
            e.target.classList.remove("in"); 
        }
        else{
            modelCoverage.push(parseInt(cellYear)); 
            e.target.classList.add("in");
        }
        console.log(modelCoverage.sort((a, b) => b - a));               
    }
    
    // returns each cell by iterating over the years so correct # of cells is returned per row
    const getRowsData = () => {
        return years.map((row, i)=>{
        return <td onClick={updateCoverage} data-coverage={`${years[i]}`} className={"coverage"} key={i}></td>
        })
    }

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th className="logo"></th>
                        {data.years.map((year, i)=>(
                            <td data-year={`${years[i]}`} className="year" key={i}>{years[i]}</td>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {/* generate left row of vehicle models  */}
                    {models.map((item, i)=>(
                        <tr data-model={coverageKey[i]} className="bodyRow" key={i}>
                            <td className="model">{models[i]}</td>
                            {/* then over years to generate coverage rows */}
                             {getRowsData()}
                        </tr>
                        )
                    )}
                </tbody>
            </table>
        </>
    ) 
}