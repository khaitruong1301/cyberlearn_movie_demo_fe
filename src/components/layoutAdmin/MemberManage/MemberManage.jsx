import React, { Component } from 'react'
import { Checkbox, Table, Icon, Button } from 'antd'
import { connect } from 'react-redux'
import { getMemberListAction } from '../../../redux/actions/MemberManageAction';

class MemberManage extends Component {
    componentDidMount() {
        this.props.getMemberList();
    }

    handleAddMember() {
        console.log("Them Thanh Vien");
        
    }

    render() {
        const columns = [
            {
                title: 'Mã Thành Viên',
                width: 180,
                dataIndex: 'MaThanhVien',
                key: 'MaThanhVien',
                fixed: 'left',
                sorter: (a, b) => a.MaPhim - b.MaPhim,
                defaultSortOrder: ['descend'],
                align: 'center'
            },
            {
                title: 'Tài Khoản',
                width: 180,
                dataIndex: 'TaiKhoan',
                key: 'TaiKhoan',
                fixed: 'left',
                sorter: (a, b) => a.TaiKhoan - b.TaiKhoan,
                defaultSortOrder: ['descend'],
                align: 'center'
            },
            {
                title: 'Hình Ảnh',
                key: 'hinhAnh',
                width: 150,
                align: 'center',
                render: () => (
                    <Icon type="user" style={{fontSize: 25}} />
                )
            },
            {
                title: 'Họ và Tên',
                dataIndex: 'HoTen',
                key: 'HoTen',
                width: 300,
                align: 'center'
                // render: (hinhAnh) => <img src={hinhAnh} className="img-fluid w-80" />
            },
            {
                title: 'Mật Khẩu',
                dataIndex: 'MatKhau',
                key: 'MatKhau',
                width: 150,
                align: 'center'
            },
            {
                title: 'Email',
                dataIndex: 'Email',
                key: 'Email',
                width: 300,
                align: 'center'
            },
            {
                title: 'Số Điện Thoại',
                dataIndex: 'SoDienThoai',
                key: 'SoDienThoai',
                width: 200,
                align: 'center'
            },
            {
                title: 'Loại Thành Viên',
                dataIndex: 'MaLoaiThanhVien',
                key: 'LoaiThanhVien',
                width: 150,
                align: 'center',
                render: (MaLoaiThanhVien) => (
                   <span> {MaLoaiThanhVien % 2 ? 'Quản Trị' : 'Thành Viên'}</span>
                ),
            },
            {
                title: 'Bí Danh',
                dataIndex: 'BiDanh',
                key: 'BiDanh',
                width: 150,
                align: 'center'
            },
            {
                title: 'Đã Xóa',
                dataIndex: 'DaXoa',
                key: 'DaXoa',
                width: 150,
                align: 'center',
                render: (DaXoa) => (
                    <div >
                        <Checkbox defaultChecked={DaXoa} disabled />
                    </div>
                ),
            },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 190,
                align: 'center',
                render: () => (
                    <div className="d-flex justify-content-between">
                        {/* Button update, xóa */}
                        <Button className="button__title__icon mr-2" type="primary" icon="edit" size={"small"} onClick={() => console.log("Edit")
                        } > Edit </Button>
                        <Button className="button__title__icon mr-2" type="danger" icon="delete" size={"small"} onClick={() => { console.log("Xóa");
                         }}> Xóa </Button>
                    </div>
                ),
            },
        ];

        const memberArray = this.props.memberArray;

        return (
            <div>
                <div className="btn__Add mb-4 d-flex justify-content-between">
                    <Button className="button__title__icon" icon="plus" type="primary" onClick={() => this.handleAddMember()}>Thêm Thành Viên</Button>
                    <Icon style={{ fontSize: 25 }} type="reload" onClick={(e) => this.handleReloadMemberList(e)} />
                </div>
                <Table rowKey={record => record.MaThanhVien} columns={columns} dataSource={memberArray} scroll={{ x: 1500 }} bordered center />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        memberArray: state.MemberManageReducer.memberArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMemberList: () => {
            dispatch(getMemberListAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberManage);