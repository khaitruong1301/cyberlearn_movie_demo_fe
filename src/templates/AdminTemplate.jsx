import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Sidebar from '../components/layoutAdmin/Sidebar/Sidebar';
import HeaderAdmin from '../components/layoutAdmin/Header/HeaderAdmin';
import { Layout, Breadcrumb } from "antd";
import Breadcrumbs from "../components/layoutAdmin/NavPath/Breadcrumbs";
import { showMessageAlert } from './SweetAlert';

const { Content } = Layout;
// import Header from '../components/Header';

const AdminLayout = (props) => {
    return (
        <Fragment>
            <Layout style={{ minHeight: "100vh" }}>
                <Sidebar />
                <Layout>
                    <HeaderAdmin />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumbs />
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
            {/*Giống <ng-content></ng-content> angular*/}
        </Fragment>
    )
}

const AdminTemplate = ({ Component, ...rest }) => {
    // Parse Token
    // if (localStorage.getItem('userLogin'))
    return <Route {...rest} render={(props) => {

        if (localStorage.getItem('userLogin')) {
            let userLogin = JSON.parse(localStorage.getItem('userLogin'));
            if (userLogin.MaLoaiThanhVien === 1) {
                return (
                    // Trước khi trả về component thì sẽ bọc trong layout
                    <AdminLayout>
                        <Component {...props} />
                        {/* ... Sẽ được hiển thị tại children của AdminLayout */}
                    </AdminLayout>
                )
            }
            else{
                showMessageAlert('Warn', 'Not allow', 'warning')
                return <Redirect to='/' />
            }
        }

        //          
    }} />
}

export default AdminTemplate;