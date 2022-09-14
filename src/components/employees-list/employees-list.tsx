import {StateEmployees } from "../app/app";
import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data,onDelete,onToggleProp}:StateEmployees) => {

    const elements = data.map(item => {
        const {id, ...itemProps} = item;
        return (
            <EmployeesListItem 
            key={id} 
            {...itemProps}
            onDelete={() => onDelete?.(id as number)}
            onToggleProp={(e)=>onToggleProp?.(id as number,(e.currentTarget.getAttribute("data-toggle") as string))}/>
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;