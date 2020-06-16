import React, { Fragment } from 'react';
import PropTypes from "prop-types";
import { getFunNames, getFunName } from '../helpers';

class StorePicker extends React.Component {

    static propTypes = {
        history: PropTypes.object
    }

    myInput = React.createRef();

    goToStore = (event) => {
        event.preventDefault();
        this.props.history.push(`/store/${this.myInput.current.value}`)
    };

    render() {
        return (
            <form action="" className="store-selector" onSubmit={this.goToStore}>
            { /* my comment */}
            <h2>Please Enter A Store</h2>
        <input type="text" 
            ref={this.myInput}
            required 
            placeholder='Store name' 
            defaultValue={getFunName()}
        />
            <button type="submit" >Visit Store</button>
        </form>
        )
    }
}

export default StorePicker;