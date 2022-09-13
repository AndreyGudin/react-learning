import { Employees } from "../app/app";
import { ChangeEvent, Component, MouseEventHandler, ReactEventHandler, ReactNode } from "react";
import "./employees-list-item.css";

type StateEmployees = {
  increase?:boolean;
  like?: boolean;
}


class EmployeesListItem extends Component<Employees&{onDelete: (e:React.MouseEvent<HTMLButtonElement>) => void;}> {
  state: StateEmployees;
  constructor(props:Employees&{onDelete: (e:React.MouseEvent<HTMLButtonElement>) => void;}) {
    super(props);
    this.state = {
      increase: false,
      like: false
    }
  }

  onIncrease = () => {
    this.setState((state:StateEmployees) =>({
      increase: !state.increase
    }))
  }

  onLike = () => {
    this.setState((state:StateEmployees) =>({
      like: !state.like
    }))
  }

  render(): ReactNode {
    const { name, salary, onDelete} = this.props;
    const {increase,like} = this.state;
    let classNames = "list-group-item d-flex justify-content-between";
    if (increase) {
      classNames += " increase";
    }
    if (like) {
      classNames += " like";
    }
    console.log("1")
    return (
      <li className={classNames}>
        <span onClick={this.onLike} className="list-group-item-label">{name}</span>
        <input
          type="text"
          className="list-group-item-input"
          defaultValue={salary + "$"}
        />
        <div className="d-flex justify-content-center align-items-center">
          <button 
            type="button" 
            className="btn-cookie btn-sm "
            onClick={this.onIncrease}>
            <i className="fas fa-cookie"></i>
          </button>

          <button type="button" 
                  className="btn-trash btn-sm"
                  onClick={onDelete}>
            <i className="fas fa-trash"></i>
          </button>
          <i className="fas fa-star"></i>
        </div>
      </li>
    );
  }
}

export default EmployeesListItem;
