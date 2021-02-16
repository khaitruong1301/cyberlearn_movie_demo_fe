import React, { Component } from 'react'
import { Layout, Avatar, Dropdown, Menu, Button, Icon } from 'antd'
import { withRouter } from 'react-router-dom'

const { Header } = Layout;

class HeaderAdmin extends Component {
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
    }
    getUser() {
        if (localStorage.getItem('userLogin')) {
            // console.log("abc"    );

            this.setState({
                taiKhoanDangNhap: JSON.parse(localStorage.getItem('userLogin'))
            })
        }
    }
    render() {
        const adminAction = ({ key }) => {
            if (key == 1) {
                // event.preventDefault()
                // Remove the token from localStorage
                localStorage.removeItem("userLogin")
                localStorage.removeItem("token")
                this.props.history.push('/');
            }
        }
        const menu = (
            <Menu onClick={adminAction}>
                <Menu.Item key="1">
                    <span className="span__title__icon">
                        <Icon type="logout" />
                        <span>Log Out</span>
                    </span>
                </Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Header style={{ background: "#fff", padding: 0, margin: 0 }}>
                    <div className="container header__detail">
                        <Avatar shape="square" size="large" style={{ color: '#ec4532', backgroundColor: '#fde3cf', marginRight: '20px' }} ><Icon type="user" style={{ fontSize: '18px' }} /></Avatar>
                        <Dropdown overlay={menu}>
                            <Button type="dashed">
                                <span className="span__title__icon" style={{ color: 'black' }}>
                                    <span >{this.state.taiKhoanDangNhap.HoTen} </span>
                                    <Icon type="down" />
                                </span>
                            </Button>
                        </Dropdown>

                    </div>
                </Header>
            </div>
        )
    }
}

export default (withRouter) (HeaderAdmin)