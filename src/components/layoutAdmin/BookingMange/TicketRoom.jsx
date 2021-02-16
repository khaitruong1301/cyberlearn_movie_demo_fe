import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Checkbox, Table, Button } from 'antd';
import { getChiTietPhongVeAction } from '../../../redux/actions/BookingManageAction'
import SeatInAdmin from './SeatInAdmin';

const columns = [
    {
        title: 'Mã Ghế',
        dataIndex: 'MaGhe',
        key: 'MaGhe',
        align: 'center',
    },
    {
        title: 'STT',
        dataIndex: 'STT',
        key: 'STT',
        align: 'center',
    },
    {
        title: 'Tên Ghế',
        dataIndex: 'TenGhe',
        key: 'TenGhe',
        align: 'center',
    },
    {
        title: 'Loại Ghế',
        dataIndex: 'LoaiGhe',
        key: 'LoaiGhe',
        align: 'center',
    },
    {
        title: 'Giá',
        dataIndex: 'GiaVe',
        key: 'GiaVe',
        align: 'center',
    },
    {
        title: 'DaDat',
        dataIndex: 'DaDat',
        key: 'DaDat',
        width: 150,
        align: 'center',
        render: (DaDat) => (
            <div >
                <Checkbox defaultChecked={DaDat} />
            </div>
        )
    },
    {
        title: 'Tài Khoản Đặt',
        dataIndex: 'TaiKhoanNguoiDat',
        key: 'TaiKhoanNguoiDat',
        align: 'center',
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 190,
        align: 'center',
        render: (movie) => (
            <div className="d-flex justify-content-between">
                <Button className="button__title__icon mr-2" type="primary" icon="edit" size={"small"} > Edit </Button>
                <Button className="button__title__icon mr-2" type="danger" icon="delete" size={"small"}> Xóa </Button>
            </div>
        )
    }
];

class TicketRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maLichChieu: this.props.match.params.MaLichChieu,
        }
    }

    componentDidMount() {
        this.props.getChiTietPhongVe(this.state.maLichChieu);
    }

    renderDanhSachGhe = () => {
        return this.props.danhSachGhe.map((ds, index) => {
            return (
                <div className="d-flex" key={index}>
                    <span className="tenHang__admin">{ds.TenHang}</span>
                    {
                        ds.DanhSachGheTheoHang.map((ghe, i) => {
                            return <SeatInAdmin className="ghe__admin" ghe={ghe} index={i + 1} tenHang={ghe.TenHang} key={i} />
                        })
                    }
                    {/* {ghe[i].tenHang !== ghe[i--].tenHang ? <br /> : ''} */}
                </div>
            )
        })
    }

    renderGheDuocChon = () => {

    }

    render() {
        const { thongTinPhim } = this.props;
        let ghe = [];
        ghe.push(this.props.gheAdmin);
        console.log("this.props.gheAdmin", this.props.gheAdmin);

        return (
            <div>
                <div className="d-flex justify-content-between">
                    <div style={{ width: '50%' }}>
                        <Card className="card__DSGhe" size="small" title="Danh sách ghế">
                            {this.renderDanhSachGhe()}
                        </Card>
                    </div>
                    <div className="ml-5">
                        <Card className="mb-4" size="small" title="Thông tin lịch chiếu" style={{ width: 500 }}>
                            <div className="lc__info border__bt">
                                <p>Ngày chiếu giờ chiếu </p>
                                <p>{thongTinPhim.NgayChieu} - <span style={{ color: "#ec7532", fontSize: "18px" }}>{thongTinPhim.GioChieu}</span></p>
                            </div>
                            <div className="lc__info border__bt mt-3">
                                <p>Cụm rạp </p>
                                <p>{thongTinPhim.TenCumRap}</p>
                            </div>
                            <div className="lc__info mt-3">
                                <p>Rạp </p>
                                <p>{thongTinPhim.TenRap}</p>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="mt-5">
                    <Table title={() => 'Thông tin ghế' } bordered rowKey={record => record.MaGhe} columns={columns} dataSource={ghe} pagination={false} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        danhSachGhe: state.BookingManageReducer.danhSachGhe,
        danhSachGheDaDat: state.BookingManageReducer.danhSachGheDaDat,
        thongTinPhim: state.BookingManageReducer.thongTinPhim,
        gheAdmin: state.BookingManageReducer.gheAdmin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getChiTietPhongVe: (maLichChieu) => {
            dispatch(getChiTietPhongVeAction(maLichChieu));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketRoom)