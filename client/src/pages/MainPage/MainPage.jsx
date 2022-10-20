import React, {useState, useContext, useCallback} from 'react'

import "./MainPage.scss"
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

const MainPage = () => {
    const [text, setText] = useState('')
    const {userId} = useContext(AuthContext)
    const [posts, setPosts] = useState([])

    const createPost = useCallback(async () => {
        if(!text) return null
        try {
            await axios.post('/api/post/add', {text, userId}, {
                headers: {'Content-Type': 'application/json'}
            }).then((response) => {
                setPosts([...posts], response.data)
                setText('')
            })
        } catch (e) {
            console.log(e)
        }
    }, [text, userId, posts])

    return (<div className="container">
        <div className="main-page">
            <h4>Добавить пост:</h4>
            <form className="form form-login" onSubmit={e => e.preventDefault()}>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            type="text"
                            id="text"
                            name="input"
                            className="validate"
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                        <label htmlFor="input">Задача</label>
                    </div>
                </div>
                <div className="row">
                    <button className="waves-effect waves-light btn blue" onClick={createPost}>Добавить</button>
                </div>
                <h3>Активные задачи:</h3>
                <div className="todos">
                    <div className="row flex todos-item">
                        <div className="col todos-num">1</div>
                        <div className="col todos-text">Text</div>
                        <div className="col todos-buttons">
                            <i className="material-icons blue-text">check</i>
                            <i className="material-icons orange-text">warning</i>
                            <i className="material-icons red-text">delete</i>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>)
}

export default MainPage