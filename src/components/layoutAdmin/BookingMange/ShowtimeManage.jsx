import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { getLichChieuListAction } from '../../../redux/actions/BookingManageAction';
import { Table, Button, Tooltip } from 'antd'

class ShowtimeManage extends Component {

    componentDidMount() {
        this.props.getLichChieuList();
    }

    handleBookingPage(maLichChieu) {
        console.log("MaLichChieu", maLichChieu);
        if (!localStorage.getItem('userLogin')) {
            // showMessageAlert("Note", "Login to continue booking!", "warning")
        }
        else{
            this.props.history.push(`/admin/ticketroom/${maLichChieu}`);
        }
    }

    render() {

        const columns = [
            {
                title: 'Mã Lịch Chiếu',
                width: 180,
                dataIndex: 'MaLichChieu',
                key: 'MaLichChieu',
                fixed: 'left',
                align: 'center'
            },
            {
                title: 'Mã Rạp',
                width: 180,
                dataIndex: 'MaRap',
                key: 'MaRap',
                fixed: 'left',
                align: 'center'
            },
            {
                title: 'Tên Phim',
                dataIndex: 'TenPhim',
                key: 'TenPhim',
                // width: 200,
                align: 'center',
            },
            {
                title: 'Ngày Chiếu Giờ Chiếu',
                dataIndex: 'NgayChieuGioChieu',
                key: 'NgayChieuGioChieu',
                width: 300,
                align: 'center',
            },
            {
                title: 'Giá Vé',
                dataIndex: 'GiaVe',
                key: 'GiaVe',
                width: 150,
                align: 'center',
            },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                // width: 00,
                align: 'center',
                render: (LichChieu) => (
                    <div className="d-flex justify-content-between">
                        {/* Button update, xóa */}
                        <Tooltip placement="left" title={"Danh Sách Phòng Vé"}>
                            <Button className="button__title__icon mr-2" type="primary" icon="shop" size={"small"} onClick={() => this.handleBookingPage(LichChieu.MaLichChieu)} >Go</Button>
                        </Tooltip>
                    </div>
                ),
            },
        ];


        const lichChieuArray = this.props.lichChieuArray;

        return (
            <div>
                <Table rowKey={record => record.MaLichChieu} columns={columns} dataSource={lichChieuArray} scroll={{ x: 1500 }} bordered center />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lichChieuArray: state.BookingManageReducer.lichChieuArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLichChieuList: () => {
            dispatch(getLichChieuListAction())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowtimeManage));
