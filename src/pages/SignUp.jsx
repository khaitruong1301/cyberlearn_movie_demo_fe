import React, { Component } from 'react'
import { Form, Input, Radio, Icon, Modal } from 'antd'
import { connect } from 'react-redux'
import { registerAction } from '../redux/actions/MemberManageAction'
import { compose } from 'redux';

class SignUp extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false
    }
  }

  handleShow() {
    console.log(this.state)
    this.setState({ show: true })
  }

  handleSubmitRegister = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['TaiKhoan', 'HoTen', 'MatKhau', 'Email', 'SoDienThoai', 'MaLoaiThanhVien'], (err, values) => {
      if (err) {
        return;
      }
      this.props.registerAction(values);
      console.log("ObjectLogin", values);
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const { modalSignUpOpen, handleModalSignUpOpen } = this.props


    return (
      <Modal
        title="Sign Up"
        visible={modalSignUpOpen}
        onOk={this.handleOk}
        onCancel={handleModalSignUpOpen}
        footer={false}
      >
        <Form onSubmit={this.handleSubmitRegister}>
          <Form.Item label="Username">
            {getFieldDecorator('TaiKhoan', {
              rules: [
                {
                  required: true,
                  message: 'Hãy nhập tài khoản !',
                },
              ]
            })(<Input placeholder="Account" />)}
          </Form.Item>
          <Form.Item label="Fullname">
            {getFieldDecorator('HoTen', {
              rules: [
                {
                  required: true,
                  message: 'Hãy nhập họ tên !',
                },
              ]
            })(<Input placeholder="Hãy nhập họ tên" />)}
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
          <Form.Item label="Email">
            {getFieldDecorator('Email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Hãy nhập Email !',
                },
              ]
            })(<Input placeholder="Hãy nhập Email" />)}
          </Form.Item>
          <Form.Item  style={{marginBottom: 0}} label="Phone">
            {getFieldDecorator('SoDienThoai', {
              rules: [
                {
                  required: true,
                  message: 'Hãy nhập số điện thoại !',
                },
              ]
            })(<Input placeholder="Phone" />)}
          </Form.Item>
          <Form.Item  style={{opacity: 0, marginBottom: 0}} {...formItemLayout} label="Member Type">
            {getFieldDecorator('MaLoaiThanhVien', {
              initialValue: 2,
            })(
              <Radio.Group disabled>
                <Radio value="2">Member</Radio>
                <Radio value="1">Admin</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <button htmltype="submit" className="btn btn-orange text-white rounded">Register</button>
          </Form.Item>
        </Form>
      </Modal>

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
    registerAction: (userRegister) => {
      dispatch(registerAction(userRegister))
    }
  }
}

export default compose(
  Form.create(),
  connect(mapStateToProps, mapDispatchToProps)
)(SignUp)