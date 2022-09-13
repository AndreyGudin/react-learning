import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

 export type Employees = {
  name:string;
  salary:number;
  increase: boolean;
  id?: number;
}

export type StateEmployees ={
  data: Employees[];
  onDelete?: (id:number) => void;
  addItem?:(name:string, salary:string) => void;
}

class App extends Component{
  state: Readonly<StateEmployees>;
  constructor(props:Employees){
    super(props);
    this.state = {
      data:[
        {name: 'John C.', salary: 300, increase: false, id: 1},
        {name: 'Alex M.', salary: 3000, increase: true, id: 2},
        {name: 'Carl W.', salary: 5000, increase: false, id: 3}
      ]
    }
  }

  deleteItem = (id:number) =>{
    this.setState(({data}:StateEmployees) =>{
      return {
        data: data.filter( item => item.id !== id)
      }
    })
  }

  addItem =(name:string, salary:string) =>{
    const generateId = (id:number[]):number=>{
      const ids = [...id];
      let newId = Math.floor(Math.random()*10000);
      let isRepeat = ids.includes(newId);
      while (isRepeat){
        newId = Math.floor(Math.random()*10000);
        isRepeat = ids.includes(newId);
      }
      return newId;
    }

    this.setState(({data}:StateEmployees) =>{
      const result = [...data];
      const ids = data.map((e)=> e.id);
      result.push({
        name,
        salary: +salary,
        increase: false,
        id: generateId(ids as number[])
      });
      return {
        data: result
      }
    })
  }

  render(){
    return (
      <div className="app">
          <AppInfo />
  
          <div className="search-panel">
              <SearchPanel/>
              <AppFilter/>
          </div>
          
          <EmployeesList 
            data={this.state.data}
            onDelete={this.deleteItem}/>
          <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    );
  }

}

export default App;
