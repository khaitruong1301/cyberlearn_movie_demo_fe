import React, { Component } from 'react'
import { Form, Input, Radio, Icon, Modal } from 'antd'
import { compose } from 'redux';
import { connect } from 'react-redux'
import { loginAction } from '../redux/actions/MemberManageAction'

class Login extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log("nextProps", nextProps);
    //     console.log("prevState", prevState);
    //     return {
    //         ...prevState, modalOpen: nextProps.modalOpen, 
    //     }
    //     return null;
    // }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            modalOpen: false,
        });
    };

    handleSubmitLogin = (e) => {
        e.preventDefault();
        this.props.form.validateFields(['TaiKhoan', 'MatKhau'], (err, values) => {
            if (err) {
                return;
            }
            this.setState({
                userLogin: {
                    TaiKhoan: values.TaiKhoan,
                    MatKhau: values.MatKhau
                }
            })
            this.props.loginAction(values);
            console.log("ObjectLogin", values);
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const { modalLoginOpen, handleModalLoginOpen } = this.props

        return (
            <Modal
                title="Login"
                visible={modalLoginOpen}
                onOk={this.handleOk}
                onCancel={handleModalLoginOpen}
                footer={false}
            >
                <Form onSubmit={this.handleSubmitLogin}>
                    <Form.Item label="Username">
                        {getFieldDecorator('TaiKhoan', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Hãy nhập tài khoản !',
                                },
                            ]
                        })(<Input placeholder="Username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                    </Form.Item>
                    <Form.Item label="Password">
                        {getFieldDecorator('MatKhau', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Hãy nhập mật khẩu !',
                                },
                            ]
                        })(<Input.Password placeholder="Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password" />)}
                    </Form.Item>
                    <Form.Item style={{ textAlign: "center" }}>
                        <button htmltype="submit" className="btn btn-orange text-white rounded" >Login</button>
                    </Form.Item>
                </Form>
            </Modal>
            // <div style={{ marginTop: "120px" }} className="modal fade" id="modalDangNhap" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            //     <div className="modal-dialog" role="document">
            //         <div className="modal-content">
            //             <div className="modal-header">
            //                 <h5 className="modal-title" id="exampleModalLabel">Login</h5>
            //                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            //                     <span aria-hidden="true">×</span>
            //                 </button>
            //             </div>
            //             <div className="modal-body">
            // <Form onSubmit={this.handleSubmitLogin}>
            //     <Form.Item label="Username">
            //         {getFieldDecorator('TaiKhoan', {
            //             rules: [
            //                 {
            //                     required: true,
            //                     message: 'Hãy nhập tài khoản !',
            //                 },
            //             ]
            //         })(<Input placeholder="Username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            //     </Form.Item>
            //     <Form.Item label="Password">
            //         {getFieldDecorator('MatKhau', {
            //             rules: [
            //                 {
            //                     required: true,
            //                     message: 'Hãy nhập mật khẩu !',
            //                 },
            //             ]
            //         })(<Input.Password placeholder="Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            //             type="password" />)}
            //     </Form.Item>
            //     <Form.Item style={{ textAlign: "center" }}>
            //         <button htmltype="submit" className="btn btn-orange text-white rounded" >Login</button>
            //     </Form.Item>
            // </Form>
            //             </div>
            //             {/* <div className="modal-footer justify-content-center">
            //                     </div> */}
            //         </div>
            //     </div>
            // </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // movieArray: state.MovieManageReducer.movieArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (userLogin) => {
            dispatch(loginAction(userLogin))
        }
    }
}

export default compose(
    Form.create(),
    connect(mapStateToProps, mapDispatchToProps)
)(Login)