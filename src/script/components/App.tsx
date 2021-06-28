import * as React from 'react';
import { useEffect, useState } from "react";
import coverageData from "../../data/coverage.json";


type dataProps = {
    data: string[];
}

export const App: React.FC<dataProps> = () => {

{/* MAIN VARIABLES FROM OUR JSON DATA */}
    const rawData = [{...coverageData}];
    const data = rawData[0];
    const years = data.years;
    const coverage = data.coverage;
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

    // function that toggles cell on click, updates coverage data and updates UI
    const updateCoverage = (e) =>{
        
        const cellYear = e.target.getAttribute("data-coverage");
        const cellModel = e.target.parentElement.getAttribute("data-model");
        const modelCoverage = coverage[cellModel];
        const confirmCoverage = modelCoverage.includes(parseInt(cellYear));

        if(confirmCoverage === true){
            modelCoverage.slice(modelCoverage.length, cellYear);
            e.target.classList.remove("in"); 
            const index = modelCoverage.indexOf(parseInt(cellYear));
            if (index > -1) {
                modelCoverage.splice(index, 1);
            }
            // log new coverage array sorted in an ascending order
            console.log(cellModel);
            console.log(modelCoverage.sort((a, b) => b - a));   
        }
        else{
            modelCoverage.push(parseInt(cellYear)); 
            e.target.classList.add("in");
        }
            // log new coverage array sorted in an ascending order
            console.log(cellModel);
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
                            <td data-year={`${years[i]}`} className="year" key={i}><span>{years[i]}</span></td>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {/* generate left row of vehicle models  */}
                    {models.map((item, i)=>(
                        <tr data-model={models[i]} className="bodyRow" key={i}>
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