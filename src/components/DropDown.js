import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

class DropDown extends Component {

	constructor() {
		super();
		this.state = {
            popupClicked: false,
            popupValue: 0,
			errors: {}
        }
        this.popupClick = this.popupClick.bind(this);
        this.popupValueClick = this.popupValueClick.bind(this);
	}

    popupClick() {
        this.setState({
            popupClicked: !this.state.popupClicked
        })
    }

    popupValueClick(e) {
        let value = e.target.attributes.getNamedItem('value').value;
        this.setState({
            popupClicked: !this.state.popupClicked,
            popupValue: value
        })
        this.props.updateValue(value);
    }

	render() {
        const {popupClicked, popupValue} = this.state;
        const self = this;
        const mapValues = (values) => {
            return values.map((value, i) => {
                return (
                    <div key={i} value={i} onClick={this.popupValueClick} className={classnames({"same-as-selected": popupValue == i})}>{value}</div>
                );
            });

            
        }
		return(
            <div className="custom-select">
                <div className={classnames({"select-selected":true, "select-arrow-active":popupClicked})} onClick={this.popupClick}>{this.props.values[this.state.popupValue]}</div>
                <div className={classnames({"select-items":true, "select-hide":!popupClicked})}>
                    {mapValues(this.props.values)}
                    {/* <div value="0" onClick={this.pastaValueClick} className={classnames({"same-as-selected": pastaValue == 0})}>TCO</div>
                    <div value="1" onClick={this.pastaValueClick} className={classnames({"same-as-selected": pastaValue == 1})}>LFIX</div>
                    <div value="2" onClick={this.pastaValueClick} className={classnames({"same-as-selected": pastaValue == 2})}>OAS</div> */}
                </div>
            </div>
		)
	}
}

DropDown.propTypes = {
    updateValue: PropTypes.func.isRequired,
    values: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
	
})

export default connect(mapStateToProps, {})(DropDown)