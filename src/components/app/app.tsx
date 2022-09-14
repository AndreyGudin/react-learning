import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

export type Employees = {
  name: string;
  salary: number;
  increase: boolean;
  rise: boolean;
  id?: number;
  [key: string]: boolean | number | string | undefined;
};

export type StateEmployees = {
  data: Employees[];
  onDelete?: (id: number) => void;
  addItem?: (name: string, salary: string) => void;
  onToggleProp?: (id: number, prop: string) => void;
  term?: string;
  filter?: string;
};

class App extends Component {
  state: Readonly<StateEmployees>;
  constructor(props: Employees) {
    super(props);
    this.state = {
      data: [
        { name: "John C.", salary: 300, increase: false, rise: true, id: 1 },
        { name: "Alex M.", salary: 3000, increase: true, rise: false, id: 2 },
        { name: "Carl W.", salary: 5000, increase: false, rise: false, id: 3 },
      ],
      term: "",
      filter: "all",
    };
  }

  deleteItem = (id: number) => {
    this.setState(({ data }: StateEmployees) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (name: string, salary: string) => {
    const generateId = (id: number[]): number => {
      const ids = [...id];
      let newId = Math.floor(Math.random() * 10000);
      let isRepeat = ids.includes(newId);
      while (isRepeat) {
        newId = Math.floor(Math.random() * 10000);
        isRepeat = ids.includes(newId);
      }
      return newId;
    };
    if ((name)) {
      this.setState(({ data }: StateEmployees) => {
        const result = [...data];
        const ids = data.map((e) => e.id);
        result.push({
          name,
          salary: +salary,
          increase: false,
          rise: false,
          id: generateId(ids as number[]),
        });
        return {
          data: result,
        };
      });
    }
    
  };

  onToggleProp = (id: number, prop: string) => {
    this.setState(({ data }: StateEmployees) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  searchEmployee = (items: Employees[], term: string) => {
    if (term.length === 0) return items;
    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term: string) => {
    this.setState({ term });
  };

  filterPost = (items: Employees[], filter: string) => {
    switch (filter) {
      case "rise":
        return items.filter((item) => item.rise);
      case "moreThen1000":
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  onFilterSelect = (filter: string) => {
    this.setState({ filter });
  };

  render() {
    const { data, term, filter } = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;
    const visibleData = this.filterPost(
      this.searchEmployee(data, term as string),
      filter as string
    );
    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter
            filter={this.state.filter as string}
            onFilterSelect={this.onFilterSelect}
          />
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
