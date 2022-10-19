import React from 'react'

const MainPage = () => {
    return (<div className="container">
            <div className="main-page">
                <h4>Добавить пост:</h4>
                <form className="form form-login">
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="text"
                                id="text"
                                name="input"
                                className="validate"/>
                            <label htmlFor="input">Задача</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>)
}

export default MainPage