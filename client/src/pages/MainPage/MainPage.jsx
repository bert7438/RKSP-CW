import React, {useState, useContext, useCallback} from 'react'

import "./MainPage.scss"
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

const MainPage = () => {
    const [text, setText] = useState('')
    const {userId} = useContext(AuthContext)
    const [posts, setPosts] = useState([])

    const getPost = useCallback(async () => {
        try {
            await axios.get('/api/post', {
                headers: {
                    'Content-Type': 'application/json'
                }, params: {userId}
            }).then((response) => setPosts(response.data))
        } catch (e) {
            console.log(e)
        }
    }, [userId])

    const removePost = useCallback(async (id) => {
        try {
            await axios.delete(`/api/post/delete/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            }).then(() => getPost())
        } catch (e) {
            console.log(e)
        }
    }, [getPost])

    const completedPost = useCallback(async (id) => {
        try {
            await axios.put(`/api/post/complete/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                setPosts([...posts], response.data)
                getPost()
            })
        } catch (e) {
            console.log(e)
        }
    }, [getPost, posts])

    const importantPost = useCallback(async (id) => {
        try {
            await axios.put(`/api/post/important/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                setPosts([...posts], response.data)
                getPost()
            })
        } catch (e) {
            console.log(e)
        }
    }, [getPost, posts])


    const createPost = useCallback(async () => {
        if (!text) {
            await getPost();
            return null
        }
        try {
            await axios.post('/api/post/add', {text, userId}, {
                headers: {'Content-Type': 'application/json'}
            }).then((response) => {
                setPosts([...posts], response.data)
                setText('')
                getPost()
            })
        } catch (e) {
            console.log(e)
        }
    }, [text, userId, posts, getPost])

    getPost().then(() => {
    })

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
                <h3>Посты:</h3>
                <div className="posts">
                    {posts.map((post, index) => {
                        let cls = ['row flex posts-item']
                        if (post.completed) {
                            cls.push('completed')
                        }
                        if(post.important) {
                            cls.push('important')
                        }

                        return (<div className={cls.join(' ')} key={index}>
                            <div className="col posts-num">{index + 1}</div>
                            <div className="col posts-text">{post.text}</div>
                            <div className="col posts-buttons">
                                <i className="material-icons blue-text"
                                   onClick={() => completedPost(post._id)}>check</i>
                                <i className="material-icons orange-text"
                                   onClick={() => importantPost(post._id)}>warning</i>
                                <i className="material-icons red-text"
                                   onClick={() => removePost(post._id)}>delete</i>
                            </div>
                        </div>)
                    })}
                </div>
            </form>
        </div>
    </div>)
}

export default MainPage