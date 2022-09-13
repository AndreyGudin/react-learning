import { ChangeEvent, Component, ReactNode } from "react";
import "./employees-add-form.css";

type StateUser = {
  name:string;
  salary: string;
}

class EmployeesAddForm extends Component<{onAdd:(name:string, salary:string) => void}> {
  state: Readonly<StateUser>;
  constructor(props:{onAdd:(name:string, salary:string) => void}){
    super(props);
    this.state = {
      name: '',
      salary: ''
    }
  }

  onValueChange = (e: ChangeEvent) =>{
    this.setState({
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
    })
  }

  render(): ReactNode {
    const {name, salary} = this.state;
    const {onAdd} = this.props;
    return (
      <div className="app-add-form">
        <h3>Добавьте нового сотрудника</h3>
        <form onSubmit={(e)=>{e.preventDefault();onAdd(name,salary)}} className="add-form d-flex">
          <input
            type="text"
            onChange={this.onValueChange}
            name="name"
            value={name}
            className="form-control new-post-label"
            placeholder="Как его зовут?"
          />
          <input
            type="number"
            onChange={this.onValueChange}
            name="salary"
            value={salary}
            className="form-control new-post-label"
            placeholder="З/П в $?"
          />

          <button type="submit" className="btn btn-outline-light">
            Добавить
          </button>
        </form>
      </div>
    );
  }
}

export default EmployeesAddForm;
