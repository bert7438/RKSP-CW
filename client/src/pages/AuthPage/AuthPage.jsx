import React, {useState, useContext} from 'react';
import {BrowserRouter, Switch, Route, Link, useHistory} from "react-router-dom";
import axios from "axios";

import './AuthPage.scss'
import {AuthContext} from "../../context/AuthContext";

const AuthPage = () => {
    const history = useHistory()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const {login} = useContext(AuthContext)
    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
        console.log(form)
    }
    const registerHandler = async () => {
        try {
            await axios.post('/api/auth/registration', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            history.push('/')
        } catch (e) {
            console.log(e)
        }
    }

    const loginHandler = async () => {
        try {
            await axios.post('/api/auth/login', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                login(response.data.token, response.data.userId)
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <div className='container'>
                        <div className='auth-page'>
                            <Route path="/login">
                                <h3>Авторизация</h3>
                                <form className='form form-login' onSubmit={e => e.preventDefault()}>
                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <input type='email' name='email' className='validate'
                                                   onChange={changeHandler}></input>
                                            <label htmlFor='email'>Email</label>
                                        </div>
                                        <div className='input-field col s12'>
                                            <input type='password' name='password' className='validate'
                                                   onChange={changeHandler}></input>
                                            <label htmlFor='password'>Пароль</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <button className='wawes-effect wawes-light btn btn blue'
                                                onClick={loginHandler}>Войти
                                        </button>
                                        <Link to='/registration' className='btn-outline btn-reg'>Нет аккаунта?</Link>
                                    </div>
                                </form>
                            </Route>


                            <Route path="/registration">
                                <h3>Регистрация</h3>
                                <form className='form form-login' onSubmit={e => e.preventDefault()}>
                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <input type='email' name='email' className='validate'
                                                   onChange={changeHandler}></input>
                                            <label htmlFor='email'>Email</label>
                                        </div>
                                        <div className='input-field col s12'>
                                            <input type='password' name='password' className='validate'
                                                   onChange={changeHandler}></input>
                                            <label htmlFor='password'>Пароль</label>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <button className='wawes-effect wawes-light btn blue'
                                                onClick={registerHandler}>Регистрация
                                        </button>
                                        <Link to='/login' className='btn-outline btn-reg'>Уже есть аккаунт?</Link>
                                    </div>
                                </form>
                            </Route>
                        </div>
                    </div>
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    );
}


export default AuthPage;
