import React from 'react';
//import './TrashBinDetails.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {withRouter} from "react-router-dom";
import EventMenu from './EventMenu'
import getSingleTrashBinData from '../api/getSingleTrashBinData';

class TrashBinDetails extends React.Component {

    state = {
        trashbin: {},
        loading: true
}

    componentDidMount(){
        let pathname = this.props.location.pathname;
        let parts = pathname.split('/')
        let id = parts[2]
        getSingleTrashBinData(id).then(bin => this.setState({trashbin: bin, loading: false}))
    }

    render() {
        if (this.state.loading){
            return(<p>Loading...</p>)
        }else{
        let pathname = this.props.location.pathname;
        let parts = pathname.split('/')
        let id = parts[2]
        let bin = this.state.trashbin
        return (
            <div>
                <Router>
                <div>

                <Link 
                    onClick={() => this.props.setBinSelected(null)} 
                    to ="/">
                    <button className="btn btn-light">
                    Back
                    </button>
                </Link>
                <Route exact path="/"></Route>
                </div>
                </Router>
                <h3>Trash bin details</h3>
                <p>ID: {id}</p>
                <p>Address: {bin.address}</p>
                <p>Type: {bin.bintype}</p>
                <EventMenu />
            </div>
        )
    }
}
}

export default withRouter(TrashBinDetails);
