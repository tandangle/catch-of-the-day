import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    }


    componentDidMount() {
        const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, { 
            context: this,
            state: 'fishes'
        });
    }
    
    componentDidUpdate() { 
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }

    componentWillUnmount() {
        base.removeBinding(this.ref)
    }

    addFish = fish => {
        // Take a copy of existing state
        const fishes = {...this.state.fishes};
        // Add our own fish to the fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // Set the new fishes object to state
        this.setState({
            fishes
        });
    };

    updateFish = (key, updatedFish) => {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState( { fishes })
    }

    deleteFish = (key) => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes });
    }
 
    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes})
    };

    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({
            order
        });
    };

    removeFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({
            order
        });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => 
                        <Fish 
                            key={key}
                            index={key} 
                            details={this.state.fishes[key]}
                            addToOrder={this.addToOrder}>
                        </Fish>)} 
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order} 
                    removeFromOrder={this. removeFromOrder}
                />
                <Inventory 
                    addFish={this.addFish} 
                    updateFish={this.updateFish} 
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

export default App;