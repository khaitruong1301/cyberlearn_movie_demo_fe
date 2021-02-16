import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTheaterSystemListAction, getTheaterListAction } from '../../../redux/actions/TheaterSystemManageAction';
import { Button, Table, Icon, Modal, Form, Input, Menu, Dropdown } from 'antd'
import { isEqual } from 'lodash'
import { compose } from 'redux';

class TheaterAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            maCumRap: ''
        }
    }

    componentDidMount() {
        this.props.getTheaterSystemList();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("nextProps", nextProps);
        console.log("prevState", prevState);
        if (!isEqual(nextProps.theaterArray, prevState)) {
            return {
                ...prevState, theaterArray: nextProps.theaterArray
            }
        }
        return null;
    }

    showModal = () => {
        this.setState({ visible: true });
    };
    // handleGetTheaterSource = (MaHeThongRap) => {
    //     this.props.getTheaterList(MaHeThongRap);
    //     return this.props.theaterArray;
    // }

    handleTheaterSystem = () => {
        this.showModal();
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleEditHTR = (record) => {
        console.log(record);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 16 },
        };

        const menu = (
            <Menu>
                <Menu.Item key="1">
                    <span className="span__title__icon">
                        <Icon type="calendar" />
                        <span >Thêm Cụm Rạp</span>
                    </span>
                </Menu.Item>
            </Menu>
        );

        const columns = [
            {
                title: 'Mã Hệ Thống Rạp',
                width: 150,
                dataIndex: 'MaHeThongRap',
                key: 'MaHeThongRap',
                sorter: (a, b) => a.MaHeThongRap.length - b.MaHeThongRap.length,
                sortDirections: ['descend', 'ascend'],
                align: 'center'
            },
            {
                title: 'Logo',
                dataIndex: 'Logo',
                key: 'Logo',
                width: 150,
                align: 'center',
                render: (Logo) => <img src={Logo} className="img-fluid" width={50} height={50} />
            },
            {
                title: 'Tên Hệ Thống Rạp',
                dataIndex: 'TenHeThongRap',
                key: 'TenHeThongRap',
                width: 150,
                align: 'center'
            },
            {
                title: 'Bí Danh',
                dataIndex: 'BiDanh',
                key: 'BiDanh',
                width: 150,
                align: 'center'
            },
            {
                title: 'Action',
                key: 'operation',
                width: 100,
                align: 'center',
                render: (record) => (
                    <div className="d-flex justify-content-center">
                        <Button className="button__title__icon" type="primary" icon="edit" size={"small"} className="mr-2" onClick={() => this.handleEditHTR(record)}> Edit </Button>
                        <Button className="button__title__icon mr-2" type="danger" icon="delete" size={"small"}> Xóa </Button>
                        {/* </Popconfirm> */}
                        <Dropdown overlay={menu}>
                            <a ><Icon type="down" /></a>
                            {/* <Button className="button__title__icon" icon="down" size={"small"}></Button> */}
                        </Dropdown>
                    </div>
                ),
            },
        ];

        // Action dropdown
        const userAction = ({ key, record }) => {
            // if (key == 1) {
            //     this.props.history.push('/profileuser/' + this.state.taiKhoanDangNhap.TaiKhoan)
            // }
            if (key == 2) {
                this.props.history.push('/admin/rapmanage/' + this.state.maCumRap);
            }
        }

        // Dropdown menu rạp
        const menuCumRap = (
            < Menu onClick={userAction}>
                <Menu.Item key="1">
                    <span className="span__title__icon">
                        <Icon type="calendar" />
                        <span >Thêm rạp</span>
                    </span>
                </Menu.Item>
                <Menu.Item key="2">
                    <span className="span__title__icon">
                        <Icon type="calendar" />
                        <span >Xem danh sách rạp</span>
                    </span>
                </Menu.Item>
            </Menu >
        )

        const expandedRowRender = (record) => {
            const columnsExpended = [
                { title: 'Mã Cụm Rạp', dataIndex: 'MaCumRap', key: 'MaCumRap' },
                { title: 'Tên Cụm Rạp', dataIndex: 'TenCumRap', key: 'TenCumRap' },
                { title: 'Địa Chỉ', dataIndex: 'ThongTin', key: 'ThongTin' },
                {
                    title: 'Action',
                    key: 'operation',
                    width: 100,
                    align: 'center',
                    // render: (record) => (
                    //     <div className="d-flex justify-content-center">
                    //           <Dropdown overlay={menuCumRap} trigger={['click']} onClick={() => {
                    //             this.setState({
                    //                 maCumRap: record.MaCumRap
                    //             });
                    //         }}>
                    //                 <a ><Icon type="down" /></a>
                    //         </Dropdown>
                    //     </div>
                    // ),
                },
            ];
            return <Table
                rowKey={record => record.MaHeThongRap}
                onRow={(record, rowIndex) => {
                    return {                      
                        onDoubleClick: event => { this.props.history.push('/admin/rapmanage/' + record.MaCumRap)}, // double click row                      
                    };
                }}
                className="expend__cumRap" rowKey={(record) => record.MaCumRap} columns={columnsExpended} dataSource={record.DanhSachCumRap} pagination={false} />;
        };

        const theaterSystemArray = this.props.theaterSystemArray;
        console.log("theaterSystemArray", theaterSystemArray);

        return (
            <div>
                <div className="btn__Add mb-4 d-flex justify-content-between">
                    <Button className="button__title__icon" icon="plus" type="primary" onClick={() => this.handleTheaterSystem()}>Thêm Hệ Thống Rạp</Button>
                    <Icon style={{ fontSize: 25 }} type="reload" />
                </div>
                <Table
                    bordered
                    rowKey={record => record.MaHeThongRap}
                    className="components-table-demo-nested"
                    columns={columns}
                    expandedRowRender={expandedRowRender}
                    // expandedRowRender={(record) =>
                    //     <Table rowKey={(record) => record.MaCumRap}  columns={columnsExpended} dataSource={record.mangCumRap} pagination={false} />
                    // }
                    loading={theaterSystemArray.length === 0}
                    dataSource={theaterSystemArray}
                />

                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="Mã Hệ Thống Rạp">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Tên Hệ Thống Rạp">
                            {getFieldDecorator('TenHeThongRap', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy nhập tên hệ thống rạp !',
                                    },
                                ],
                            })(<Input placeholder="Nhập tên hệ thống rạp" />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Logo">
                            {getFieldDecorator('Logo', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy nhập URL Logo !',
                                    },
                                ],
                            })(<Input placeholder="Nhập URL logo" />)}
                        </Form.Item>
                        <Form.Item label="Bí Danh">
                            <Input disabled />
                        </Form.Item>
                        <div className="text-center">
                            <Button className="mr-4" type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Hủy
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        theaterSystemArray: state.TheaterSystemManageReducer.theaterSystemArray,
        theaterArray: state.TheaterSystemManageReducer.theaterArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTheaterSystemList: () => {
            dispatch(getTheaterSystemListAction())
        },
        getTheaterList: (maHeThongRap) => {
            dispatch(getTheaterListAction(maHeThongRap))
        }
    }
}

export default compose(
    Form.create(),
    connect(mapStateToProps, mapDispatchToProps)
)(TheaterAdmin)