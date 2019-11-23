import React, { useEffect, useState } from "react"
import Drawer from "react-drag-drawer"
import facebookLogo from "../images/icon-facebook-logo.png"
import { apiGatewayInstance } from "../connect/createApi"

const HeaderMenu = () => {
    useEffect(() => {
        window.onscroll = function () { scrollFunction() };
        function scrollFunction() {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                document.getElementById("header-menu").style.height = "70px";
            } else {
                document.getElementById("header-menu").style.height = "0px";
            }
        }
    }, [])
    const [statusModalLogin, setStatusModalLogin] = useState(false)
    const [statusModalRegister, setStatusModalRegister] = useState(false)
    const [resFirstName, setResFirstName] = useState('');
    const [resSurName, setResSurName] = useState('');
    const [resPhoneNumber, setResPhoneNumber] = useState('');
    const [resEmail, setResEmail] = useState('');
    const [resPassword, setResPassword] = useState('');
    const [logEmail, setLogEmail] = useState('');
    const [logPassword, setLogPassword] = useState('');

    const topFunction = () => {
        const headerHeight = 50; /* PUT HEADER HEIGHT HERE */
        const buffer = 25; /* MAY NOT BE NEEDED */
        const scrollToEl = document.querySelector("#home");
        const topOfElement = window.pageYOffset + scrollToEl.getBoundingClientRect().top - headerHeight - buffer;
        window.scroll({ top: topOfElement, behavior: "smooth" });
    }
    const trueMoneyFunction = () => {
        const headerHeight = 50; /* PUT HEADER HEIGHT HERE */
        const buffer = 25; /* MAY NOT BE NEEDED */
        const scrollToEl = document.querySelector("#trueMoney");
        const topOfElement = window.pageYOffset + scrollToEl.getBoundingClientRect().top - headerHeight - buffer;
        window.scroll({ top: topOfElement, behavior: "smooth" });
    }
    const gemeCardFunction = () => {
        const headerHeight = 50; /* PUT HEADER HEIGHT HERE */
        const buffer = 25; /* MAY NOT BE NEEDED */
        const scrollToEl = document.querySelector("#gameCard");
        const topOfElement = window.pageYOffset + scrollToEl.getBoundingClientRect().top - headerHeight - buffer;
        window.scroll({ top: topOfElement, behavior: "smooth" });
    }

    const handleLoginMember = (event) => {
        event.preventDefault();
        const formDataLogin = new FormData();
        formDataLogin.append('emailUser', logEmail);
        formDataLogin.append('passwordUser', logPassword);
        apiGatewayInstance.post('/api/checkLogin', formDataLogin)
            .then(() => {
                console.log('login success')
            })
    }

    const handleRegisterMember = (event) => {
        event.preventDefault();
        const formDataRegsiter = new FormData();
        formDataRegsiter.append('nameUser', resFirstName);
        formDataRegsiter.append('surnameUser', resSurName);
        formDataRegsiter.append('phoneNumber', resPhoneNumber);
        formDataRegsiter.append('emailUser', resEmail);
        formDataRegsiter.append('passwordUser', resPassword);
        apiGatewayInstance.post('/api/userRegister', formDataRegsiter)
            .then(() => {
                setStatusModalRegister(false)
                setResFirstName('')
                setResSurName('')
                setResPhoneNumber('')
                setResEmail('')
                setResPassword('')
            });
    }

    return (
        <header id="header-menu">
            <div style={{ padding: `1.45rem 1.0875rem` }}>
                <div className="col">
                    <div className="row justify-content-between">
                        <div>
                            <a className="pointer" onClick={topFunction}>TT Game Store</a>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className="mr-2 nav-header-menu">
                                <a className="pointer" onClick={trueMoneyFunction}>True Money</a>
                            </div>
                            {/* <div className="mr-2 text-bold nav-header-menu">
                                <a className="pointer" onClick={gemeCardFunction}>Game Card</a>
                            </div> */}
                            <div className="mr-2 nav-header-menu">
                                <a className="pointer" onClick={() => setStatusModalLogin(true)}>LOGIN</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                open={statusModalLogin}
                onRequestClose={() => setStatusModalLogin(false)}
            >
                <div className="modal-money-card-style">
                    <div className="title-login">LOGIN</div>
                    <div className="d-none d-lg-flex">
                        <div className="row">
                            <div className="col">
                                <form onSubmit={handleLoginMember}>
                                    <div>Member</div>
                                    <div className="mt-2">
                                        <input
                                            class="form-control"
                                            type="text"
                                            placeholder="Email"
                                            value={logEmail}
                                            onChange={event => setLogEmail(event.target.value)}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            class="form-control"
                                            type="password"
                                            placeholder="Password"
                                            value={logPassword}
                                            onChange={event => setLogPassword(event.target.value)}
                                        />
                                    </div>
                                    <div className="col">
                                        <div className="row justify-content-end mt-2">
                                            <div style={{ fontSize: 14 }}>New member? <span className="pointer" style={{ color: '#FF0505' }} onClick={() => setStatusModalRegister(true)}>Register</span> here.</div>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <button type="submit" class="btn btn-login">Login</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col">
                                <div>Login with</div>
                                <div className="mt-2">
                                    <button type="submit" class="btn btn-facebook">
                                        <div>Facebook</div>
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <button type="submit" class="btn btn-google">Google</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex d-lg-none">
                        <form onSubmit={handleLoginMember} className="w-100">
                            <div>
                                <div>Member</div>
                                <div className="mt-2">
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder="Email"
                                        value={logEmail}
                                        onChange={event => setLogEmail(event.target.value)}
                                    />
                                </div>
                                <div className="mt-2">
                                    <input
                                        class="form-control"
                                        type="password"
                                        placeholder="Password"
                                        value={logPassword}
                                        onChange={event => setLogPassword(event.target.value)}
                                    />
                                </div>
                                <div className="col">
                                    <div className="row justify-content-end mt-2">
                                        <div style={{ fontSize: 14 }}>New member? <span className="pointer" style={{ color: '#FF0505' }} onClick={() => setStatusModalRegister(true)}>Register</span> here.</div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <button type="submit" class="btn btn-login">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Drawer>
            <Drawer
                open={statusModalRegister}
                onRequestClose={() => setStatusModalRegister(false)}
            >
                <div className="modal-money-card-style">
                    <div className="title-register">Create Account</div>
                    <div className="d-none d-lg-flex">
                        <div className="row">
                            <div className="col">
                                <form onSubmit={handleRegisterMember}>
                                    <div className="mt-2">
                                        <input
                                            class="form-control"
                                            type="text"
                                            placeholder="Firstname"
                                            value={resFirstName}
                                            onChange={event => setResFirstName(event.target.value)}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            class="form-control"
                                            type="text"
                                            placeholder="Surname"
                                            value={resSurName}
                                            onChange={event => setResSurName(event.target.value)}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            class="form-control"
                                            type="text"
                                            placeholder="Phone Number"
                                            value={resPhoneNumber}
                                            onChange={event => setResPhoneNumber(event.target.value)}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            class="form-control"
                                            type="text"
                                            placeholder="Email"
                                            value={resEmail}
                                            onChange={event => setResEmail(event.target.value)}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            class="form-control"
                                            type="text"
                                            placeholder="Password"
                                            value={resPassword}
                                            onChange={event => setResPassword(event.target.value)}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <button type="submit" class="btn btn-login">Sign Up</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col">
                                <div>Sign Up with</div>
                                <div className="mt-2">
                                    <button type="submit" class="btn btn-facebook">Facebook</button>
                                </div>
                                <div className="mt-2">
                                    <button type="submit" class="btn btn-google">Google</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex d-lg-none">
                        <form onSubmit={handleRegisterMember} className="w-100">
                            <div className="mt-2">
                                <input
                                    class="form-control"
                                    type="text"
                                    placeholder="Firstname"
                                    value={resFirstName}
                                    onChange={event => setResFirstName(event.target.value)}
                                />
                            </div>
                            <div className="mt-2">
                                <input
                                    class="form-control"
                                    type="text"
                                    placeholder="Surname"
                                    value={resSurName}
                                    onChange={event => setResSurName(event.target.value)}
                                />
                            </div>
                            <div className="mt-2">
                                <input
                                    class="form-control"
                                    type="text"
                                    placeholder="Phone Number"
                                    value={resPhoneNumber}
                                    onChange={event => setResPhoneNumber(event.target.value)}
                                />
                            </div>
                            <div className="mt-2">
                                <input
                                    class="form-control"
                                    type="text"
                                    placeholder="Email"
                                    value={resEmail}
                                    onChange={event => setResEmail(event.target.value)}
                                />
                            </div>
                            <div className="mt-2">
                                <input
                                    class="form-control"
                                    type="text"
                                    placeholder="Password"
                                    value={resPassword}
                                    onChange={event => setResPassword(event.target.value)}
                                />
                            </div>
                            <div className="mt-2">
                                <button type="submit" class="btn btn-login">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Drawer>
        </header>
    )
};

export default HeaderMenu;