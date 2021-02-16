import React, { Component } from 'react'
import { Redirect, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { Form, Avatar, Dropdown, Menu, Button, Icon } from 'antd'
import { compose } from 'redux';
import { loginAction, registerAction } from '../../redux/actions/MemberManageAction'
import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';
import { settings } from '../../config/settings';
import { connection } from '../../index'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taiKhoanDangNhap: {},
            modalSignUpOpen: false,
            modalLoginOpen: false
        }
    }

    componentDidMount() {
        this.getUser();
        window.addEventListener("scroll", this.resizeHeaderOnScroll);
        // window.removeEventListener('beforeunload', this.componentCleanup);
    }

    componentCleanup = () => { // this will hold the cleanup code
        // whatever you want to do when the component is unmounted or page refreshes
        this._isMounted = false;
        console.log('unmounting');
        // clearInterval(this.myInterval)
        if (localStorage.getItem(settings.userLogin)) {
            let taiKhoan = JSON.parse(localStorage.getItem(settings.userLogin)).TaiKhoan;
            if (localStorage.getItem('MaLichChieu')){
                connection.invoke("SendRequestData", taiKhoan, localStorage.getItem('MaLichChieu'));
            }
        }
    }


    // componentWillUnmount() {
    //     this.componentCleanup();
    //     window.removeEventListener('beforeunload', this.componentCleanup);
    // }


    getUser() {
        if (localStorage.getItem('userLogin')) {
            // console.log("abc");
            this.setState({
                taiKhoanDangNhap: JSON.parse(localStorage.getItem(settings.userLogin))
            })
        }
    }

    resizeHeaderOnScroll() {
        // console.log("smaller");

        const distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 60,
            headerEl = document.getElementById("js-header");
        if (headerEl) {
            if (distanceY > shrinkOn) {
                headerEl.classList.add("smaller");
            } else {
                headerEl.classList.remove("smaller");
            }
        }

    }

    handleModalLoginOpen = () => {
        this.setState((prevState) => {
            return {
                modalLoginOpen: !prevState.modalLoginOpen
            }
        })
        console.log(this.state.modalOpen);
    }

    handleModalSignUpOpen = () => {
        this.setState((prevState) => {
            return {
                modalSignUpOpen: !prevState.modalSignUpOpen
            }
        })
        console.log(this.state.modalOpen);
    }

    render() {
        const userAction = ({ key }) => {
            if (key == 2) {
                // event.preventDefault()
                // Remove the token from localStorage
                localStorage.removeItem("userLogin")
                localStorage.removeItem("token")
                this.props.history.push('/');
                window.location.reload();
            }
            if (key == 1) {
                this.props.history.push('/profileuser/' + this.state.taiKhoanDangNhap.TaiKhoan)
            }
            if (key == 3) {
                this.props.history.push('/admin/movieadmin');
            }
        }
        const menu = (
            <Menu onClick={userAction}>
                <Menu.Item key="1">
                    <span className="span__title__icon">
                        <Icon type="user" />
                        <span>View Profile</span>
                    </span>
                </Menu.Item>
                {
                    this.state.taiKhoanDangNhap.MaLoaiThanhVien === 1 ?
                        <Menu.Item key="3">
                            <span className="span__title__icon">
                                <Icon type="user" />
                                <span>Dashboard</span>
                            </span>
                        </Menu.Item> : ''
                }
                <Menu.Item key="2">
                    <span className="span__title__icon">
                        <Icon type="logout" />
                        <span>Log Out</span>
                    </span>
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                <div>
                    {/*HEADER*/}
                    <header className="header__client" id="js-header">
                        <div className="container header__detail">
                            <Avatar style={{ color: '#ec4532', backgroundColor: '#fde3cf', marginRight: '20px' }} ><Icon type="user" style={{ fontSize: '18px' }} /></Avatar>
                            {
                                this.state.taiKhoanDangNhap.HoTen ? <Dropdown overlay={menu}>
                                    <Button type="dashed">
                                        <span className="span__title__icon">
                                            <span>{this.state.taiKhoanDangNhap.HoTen} </span>
                                            <Icon type="down" />
                                        </span>
                                    </Button>
                                </Dropdown> : <Button type="dashed">Login</Button>
                            }
                        </div>
                        <nav className="container header__navbar navbar navbar-expand-lg py-0">
                            <a className="navbar-brand py-0" href="#">
                                <img src={process.env.PUBLIC_URL + '/img/logo1.png'} alt="logo" width={265} />
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <ul className="navbar-nav ml-auto border-bottom">
                                    <li className="nav-item active">
                                        <NavLink to='/'><span className="nav-link px-4" href="#">HOME</span></NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link px-4">SHOWING MOVIES</span>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link px-4" href="#">COMING MOVIE</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link px-4" href="#" onClick={this.handleModalLoginOpen}>SIGN IN</a>
                                    </li>
                                    <li className="nav-item">
                                        {/* <NavLink to={'/login'} className="nav-link px-4 text-uppercase">XEM THÊM</NavLink> */}
                                        <a className="nav-link px-4 text-uppercase" href="#" onClick={this.handleModalSignUpOpen}>Sign up</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                    </header>
                    {/*END HEADER*/}
                    <Login modalLoginOpen={this.state.modalLoginOpen}
                        handleModalLoginOpen={this.handleModalLoginOpen} />
                    <SignUp modalSignUpOpen={this.state.modalSignUpOpen}
                        handleModalSignUpOpen={this.handleModalSignUpOpen} />
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userLogin: state.MemberManageReducer.userLogin
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         loginAction: (userLogin) => {
//             dispatch(loginAction(userLogin))
//         },
//         registerAction: (userRegister) => {
//             dispatch(registerAction(userRegister))
//         }
//     }
// }

export default (withRouter)(compose(
    Form.create(),
    connect(mapStateToProps, null)
)(Header))