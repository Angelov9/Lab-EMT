import React from "react";
import {Link, useHistory} from 'react-router-dom';

const Register = (props) => {

    const history = useHistory();

    const [formData, updateFormData] = React.useState({
        username: "",
        password: "",
        repeatPassword: "",
        name: "",
        surname: ""
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        const username = formData.username;
        const password = formData.password;
        const repeatPassword = formData.password;
        const name = formData.name;
        const surname = formData.surname;

        props.onRegister(username, password, repeatPassword, name, surname);
        history.push("/books");
    }

    return (

        <div className={"row mt-5"}>
            <div className={"col-md-5"}>
                <form onSubmit={onFormSubmit}>
                    <h2 className={"form-signin-heading"}>Register!</h2>
                    <p>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input type="text"
                               id="username"
                               name="username"
                               className="form-control"
                               placeholder="Username"
                               required
                               autoFocus=""
                               onChange={handleChange}/>
                    </p>
                    <p>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input type="password"
                               id="password"
                               name="password"
                               className="form-control"
                               placeholder="Password"
                               required
                               onChange={handleChange}/>
                    </p>
                    <p>
                        <label htmlFor="repeatedPassword" className="sr-only">Repeat Password</label>
                        <input type="password"
                               id="repeatedPassword"
                               name="repeatedPassword"
                               className="form-control"
                               placeholder="Repeat Password"
                               required
                               onChange={handleChange}/>
                    </p>
                    <p>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input type="text"
                               id="name"
                               name="name"
                               className="form-control"
                               placeholder="Name"
                               required
                               autoFocus=""
                               onChange={handleChange}/>
                    </p>
                    <p>
                        <label htmlFor="surname" className="sr-only">Surname</label>
                        <input type="text"
                               id="surname"
                               name="surname"
                               className="form-control"
                               placeholder="Surname"
                               required
                               autoFocus=""
                               onChange={handleChange}/>
                    </p>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
                </form>
                <Link className="btn btn-block btn-light" to={"/login"}>Already have an account? Login here!</Link>
            </div>
        </div>
    )
}

export default Register;