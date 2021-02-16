import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout, Menu, Icon } from "antd";
import { getHeThongRapListAction } from '../../../redux/actions/TheaterSystemManageAction';

const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends Component {
    state = {
        collapsed: false
    };

    componentDidMount() {
        this.props.getHeThongRapList();
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        return (
            <div >
                <Sider style={{ minHeight: "100%", width: 900 }}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo">
                        <img src={process.env.PUBLIC_URL + '/img/logo1.png'} alt="logo" width={265} />
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['6']} defaultOpenKeys={['sub1']} mode="inline">
                        <SubMenu
                            key="sub0"
                            title={
                                <span className="span__title__icon">
                                    <Icon type="pie-chart" />
                                    <span>Dashboard</span>
                                </span>
                            }
                        >
                            {
                                this.props.HTRArray.map((htr, index) => {
                                    return (
                                        <Menu.Item key={index}>
                                            <NavLink to={`/admin/statisticdashboard/${htr.MaHeThongRap}`}><img src={htr.Logo} width={20} height={20} />&nbsp;&nbsp;{htr.TenHeThongRap}</NavLink>
                                        </Menu.Item>
                                    )
                                })
                            }
                            {/* <Menu.Item key="0">
                                <NavLink to='/admin/statisticdashboard/BHDStar'>BHD Star</NavLink>
                            </Menu.Item>
                            <Menu.Item key="1">
                                <NavLink to='/admin/statisticdashboard/CGV'>CGV</NavLink>
                            </Menu.Item> */}




                        </SubMenu>
                        <SubMenu
                            key="sub1"
                            title={
                                <span className="span__title__icon">
                                    <Icon type="youtube" />
                                    <span>Phim</span>
                                </span>
                            }
                        >
                            <Menu.Item key="6">
                                <NavLink to={'/admin/movieadmin'}>Phim</NavLink>
                            </Menu.Item>
                            {/* <Menu.Item key="7">Thể Loại</Menu.Item> */}
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span className="span__title__icon">
                                    <Icon type="home" />
                                    <span>Hệ Thống Rạp</span>
                                </span>
                            }
                        >
                            <Menu.Item key="8">
                                <NavLink to={'/admin/theateradmin'}><span>Thông tin hệ thống rạp</span></NavLink>
                            </Menu.Item>
                            <Menu.Item key="5">Lịch chiếu theo hệ thống</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={
                                <span className="span__title__icon">
                                    <Icon type="audit" />
                                    <span>Đặt Vé</span>
                                </span>
                            }
                        >
                            <Menu.Item key="sub3_1">
                                <NavLink to={'/admin/bookingmanage/showtimemanage'}><span>Lịch Chiếu</span></NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub4"
                            title={
                                <span className="span__title__icon">
                                    <Icon type="user" />
                                    <span>Thành Viên</span>
                                </span>
                            }
                        >
                            <Menu.Item key="sub4_1">
                                <NavLink to={'/admin/membermanage'}><span>Danh sách thành viên</span></NavLink>
                            </Menu.Item>
                        </SubMenu>
                        {/* <SubMenu
                            key="sub3"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span>User</span>
                                </span>
                            }
                        >
                            <Menu.Item key="4">Tom</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub4"
                            title={
                                <span>
                                    <Icon type="team" />
                                    <span>Team</span>
                                </span>
                            }
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>File</span>
                        </Menu.Item> */}
                    </Menu>
                </Sider>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        HTRArray: state.TheaterSystemManageReducer.HTRArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHeThongRapList: () => {
            dispatch(getHeThongRapListAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
