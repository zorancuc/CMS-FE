import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';

class Register extends Component {

	constructor() {
		super();
		this.state = {
			wallet_id: '',
			email: '',
			password: '',
			first_name: '',
			last_name: '',
			errors: {}
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleAdminCheck = this.handleAdminCheck.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.loginBtnClick = this.loginBtnClick.bind(this);
	}

	loginBtnClick() {
		this.props.history.push('/login');
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleAdminCheck() {
		this.setState({ isAdmin: !this.state.isAdmin });
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = {
			// wallet_id: this.state.wallet_id,
			email: this.state.email,
			password: this.state.password,
			first_name: this.state.first_name,
			last_name: this.state.last_name,
		}
		this.props.registerUser(user, this.props.history);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.auth.isAuthenticated) {
			this.props.history.push('/')
		}
		if(nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	render() {
		const { errors } = this.state;
		return(
			<section className="loginSection">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<form className="formStyle text-center" onSubmit={ this.handleSubmit }>
							<div className="row">
								{/* <div className="col-12">
									<div className="form-group">
										<label>OAS ID</label>
										<input
											type="text"
											placeholder="Wallet ID"
											className={classnames('form-control form-control-lg', {
												'is-invalid': errors.wallet_id
											})}
											name="wallet_id"
											onChange={ this.handleInputChange }
											value={ this.state.wallet_id }
										/>
										{errors.wallet_id && (<div className="invalid-feedback">{errors.wallet_id}</div>)}
									</div>
								</div> */}
								<div className="col-12">
									<div className="form-group">
										<label>Email</label>
										<input
											type="email"
											placeholder="Email"
											className={classnames('form-control form-control-lg', {
												'is-invalid': errors.email
											})}
											name="email"
											onChange={ this.handleInputChange }
											value={ this.state.email }
										/>
										{errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
									</div>
								</div>
								<div className="col-12">
									<div className="form-group">
										<label>Password</label>
										<input
											type="password"
											placeholder="Password"
											className={classnames('form-control form-control-lg', {
												'is-invalid': errors.password
											})}
											name="password"
											onChange={ this.handleInputChange }
											value={ this.state.password }
										/>
										{errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
									</div>
								</div>
								<div className="col-12">
									<div className="form-group">
										<label>First Name</label>
										<input
											type="text"
											placeholder="First Name"
											className={classnames('form-control form-control-lg', {
												'is-invalid': errors.first_name
											})}
											name="first_name"
											onChange={ this.handleInputChange }
											value={ this.state.first_name }
										/>
										{errors.first_name && (<div className="invalid-feedback">{errors.first_name}</div>)}
									</div>
								</div>
								<div className="col-12">
									<div className="form-group">
										<label>Last Name</label>
										<input
											type="text"
											placeholder="Last Name"
											className={classnames('form-control form-control-lg', {
												'is-invalid': errors.last_name
											})}
											name="last_name"
											onChange={ this.handleInputChange }
											value={ this.state.last_name }
										/>
										{errors.last_name && (<div className="invalid-feedback">{errors.last_name}</div>)}
									</div>
								</div>
								<div className="col-12">
									<div className="form-group">
										<button type="submit" className="btn mt-4 btn-primary">Register User</button>
									</div>
								</div>
								<div className="col-12">
									<div className="linksGroup">
										<a href="#" onClick={this.loginBtnClick}>login</a>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className="language">
				<a href="#"><img src="images/ic_lang.png"/> Language</a>
			</div>
		</section>
		)
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))
