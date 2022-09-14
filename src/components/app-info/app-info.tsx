import "./app-info.css";

type Info  = {
    employees:number;
    increased: number;
}

const AppInfo = (props:Info) => {
    const {employees,increased} = props;
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {employees}</h2>
            <h2>Премию получат: {increased}</h2>
        </div>
    )
}

export default AppInfo;