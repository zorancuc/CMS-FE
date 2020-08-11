import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { doExchange } from '../actions/exchange';
import Dropdown from './DropDown';
import Footer from './Footer';
import classnames from 'classnames';

class Exchange extends Component {
    constructor() {
		super();
		this.state = {
            amount1: '',
            amount2: '',
            pastaValue: 0,
            ercValue: 0,
            exchangeValue: 0,
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.pastaValueUpdate = this.pastaValueUpdate.bind(this);
        this.ercValueUpdate = this.ercValueUpdate.bind(this);
        this.exchangeValueUpdate = this.exchangeValueUpdate.bind(this);
        this.doExchange = this.doExchange.bind(this);
        
	}
	componentDidMount() {
        // this.props.getCurrentUser();

	}

    doExchange() {
        const data = {
            pastaToken: "HELLO",
            erc20token: "0x84056a282b52f9c18cd704926895d3bdf8863536",
            amount: parseInt(this.state.amount1, 10)
        }
        console.log(data);
        this.props.doExchange(data);
    }
    pastaValueUpdate(value) {
        console.log(value);
        this.setState({
            pastaValue: value
        });
    }

    ercValueUpdate(value) {
        console.log(value);
        this.setState({
            ercValue: value
        });
    }

    exchangeValueUpdate(value) {
        console.log(value);
        this.setState({
            exchangeValue: value
        });
    }

    handleInputChange(e) {
        console.log(e.target.name);
        console.log(e.target.value);
		this.setState({
			[e.target.name]: e.target.value
		})
    }
    
	render() {
        const { errors } = this.state;
		return (
			<section className="mywalletSection pb_90">
                <div className="container">
                    <div className="row">
                        <div className="col-12 headerTitle mb-4">
                            <h1><img src="images/logoIc.png"/> CIRCLE 서비스</h1>
                        </div>
                        <div className="col-6">
                            <Dropdown updateValue={this.pastaValueUpdate} values={["TCO", "LFIX", "OAS"]} />
                        </div>
                        <div className="col-6">
                            <Dropdown updateValue={this.ercValueUpdate} values={["ERC20", "PASTA", "EOS"]} />
                        </div>
                        <div className="col-12">
                            <div className="quantityInputGroup">
                                <div className="row">
                                    <div className="col-6">
                                        <input 
                                            type="number"
                                            // className={classnames('form-control form-control-lg', {
											// 	'is-invalid': errors.amount1
											// })} 
                                            placeholder="수량" 
                                            value={this.state.amount1} 
                                            name="amount1" 
                                            onChange={ this.handleInputChange }/>
                                        <label>보유수량</label>
                                    </div>
                                    <div className="col-6 rightCol">
                                        <input type="text" placeholder="" value="OAS" readOnly/>
                                        <label>OAS</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="midLogo">
                                <button 
                                    type="button" 
                                    // className="btn" 
                                    onClick={this.doExchange}
                                >
                                    <img src="images/logoIc.png"/>
                                </button>
                                
                            </div>
                        </div>
                        <div className="col-8 offset-2">
                            <Dropdown updateValue={this.exchangeValueUpdate} values={["PASTA", "ERC20", "EOS"]} />
                        </div>
                        <div className="col-12">
                            <div className="quantityInputGroup">
                                <div className="row">
                                    <div className="col-6">
                                    <input 
                                            type="number"
                                            placeholder="수량" 
                                            value={this.state.amount2} 
                                            name="amount2" 
                                            onChange={ this.handleInputChange }/>
                                        <label>현시세</label>
                                    </div>
                                    <div className="col-6 rightCol">
                                        <input type="text" placeholder="" value="OAS" onChange={ this.handleInputChange }/>
                                        <label>1 OAS = USD</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <Footer />
            </section>

		);
	}
}

Exchange.propTypes = {
	doExchange: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	user: state.auth.user,
	errors: state.errors
})

export default connect(mapStateToProps, { doExchange })(Exchange)