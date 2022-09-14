import { ChangeEvent, Component, ReactNode } from 'react';

import './search-panel.css';

type SearchPanelProps = {
    onUpdateSearch:(term:string) => void;
}

type SearchPanelState = {
    term:string;
}

class SearchPanel extends Component<SearchPanelProps> {
    state:SearchPanelState;
    constructor(props:SearchPanelProps){
        super(props);
        this.state = {
            term: ''
        };
    }
    
    onUpdateSearch = (e:ChangeEvent) =>{
        const term = (e.target as HTMLInputElement).value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }

    render(): ReactNode {
        return (
            <input type="text"
                    className="form-control search-input"
                    placeholder="Найти сотрудника"
                    value={this.state.term}
                    onChange={this.onUpdateSearch}/>
        )
    }

}

export default SearchPanel;