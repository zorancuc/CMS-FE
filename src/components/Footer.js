import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logoutUser } from '../actions/authentication';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

class Footer extends Component {

	constructor() {
		super();
		this.state = {
            circlePopUp: false,
			errors: {}
        }
        this.settingBtnClick = this.settingBtnClick.bind(this);
		this.circlePopupBtnClick = this.circlePopupBtnClick.bind(this);
		this.pageToWallet = this.pageToWallet.bind(this);
		this.pageToExchange = this.pageToExchange.bind(this);
	}

    circlePopupBtnClick() {
		this.setState({
			circlePopUp: !this.state.circlePopUp
		});
	}

	settingBtnClick(e) {
		e.preventDefault();
		this.props.logoutUser(this.props.history);
    }
    
    pageToWallet(e) {
        e.preventDefault();
        this.setState({
			circlePopUp: !this.state.circlePopUp
		});
        this.props.history.push('/');
		// this.props.logoutUser(this.props.history);
    }
    
    pageToExchange(e) {
        e.preventDefault();
        this.setState({
			circlePopUp: !this.state.circlePopUp
		});
		this.props.history.push('/exchange');
	}

	render() {
        const {circlePopUp} = this.state;
		return(
            <div className="container-fluid footerFix">
					<div className="row">
						<div className="col-4">
							<div className="dropup">
								<button type="button" className="btn" data-toggle="dropdown" onClick={this.circlePopupBtnClick}><img src="images/logoIc.png"/></button>
								<div className={classnames({'dropdown-menu':true, show:circlePopUp})}>
									<a className="dropdown-item" href="#" onClick={this.pageToWallet}>내 자산</a>
									<a className="dropdown-item" href="#" onClick={this.pageToExchange}>CIRCLE 서비스</a>
								</div>
							</div>
						</div>
						<div className="col-4 text-center">
							<button type="button" className="payBtn">PAY</button>
						</div>
						<div className="col-4">
							<button type="button" className="" onClick={this.settingBtnClick}><img src="images/ic_setting.png"/></button>
						</div>
					</div>
				</div>
		)
	}
}

Footer.propTypes = {
    logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	
})

export default connect(mapStateToProps, {logoutUser})(withRouter(Footer))