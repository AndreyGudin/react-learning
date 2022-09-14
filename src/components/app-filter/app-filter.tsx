import "./app-filter.css";

type AppFilterProps = {
    filter:string;
    onFilterSelect:(filter:string) => void;
}

const AppFilter = (props:AppFilterProps) => {
    const buttonsData = [
        {name:'all', label:'Все сотрудники'},
        {name:'rise', label:'На повышение'},
        {name:'moreThen1000', label:'З/П больше 1000$'},
    ]

    const buttons = buttonsData.map(({name,label}) =>{
        const active = props.filter === name;
        const className = active ? 'btn-light' : 'btn-outline-light';
        return(
            <button type="button"
                    className={`btn ${className}`}
                    onClick={()=> props.onFilterSelect(name)}
                    key={name}>
                    {label}
            </button>
        )
    })
    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;