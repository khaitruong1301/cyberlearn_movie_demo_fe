import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { getTheaterSystemListAction, getTheaterListAction, getLichChieuHTRListAction } from '../../redux/actions/TheaterSystemManageAction';

import { Tabs, Tag } from 'antd';
import moment from 'moment';
import { showMessageAlert } from '../../templates/SweetAlert';

class ShowtimesHome extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getTheaterSystemList();
        // this.props.getLichChieuHTRList('cgv');
    }

    handleBookingPage(maLichChieu) {
        console.log("MaLichChieu", maLichChieu);
        if (!localStorage.getItem('userLogin')) {
            showMessageAlert("Note", "Login to continue booking!", "warning")
        }
        else {
            this.props.history.push(`/bookingticket/${maLichChieu}`);
        }
    }

    checkLichChieu = (phim) => {
        let mangLC = [];
        // if(phim.MaPhim === maPhim){
        phim.ListNgayChieuGioChieu.map((tgc, index) => {
            let thoiGianChieu = moment(new Date(tgc.ThoiGianChieu)).format("DD.MM.YYYY");
            var now = moment(new Date()).format("DD.MM.YYYY"); //todays date
            // console.log('now', now, "thoiGianChieu", thoiGianChieu);
            var startDate = moment(thoiGianChieu, "DD.MM.YYYY");
            var endDate = moment(now, "DD.MM.YYYY");
            var duration = endDate.diff(startDate, 'days');
            if (duration === 0) {
                mangLC.push(duration);
            }
        })
        // }
        if (mangLC.length > 0) {
            return true;
        }
        return false;
    }

    renderTheaterSystemList = () => {
        const { TabPane } = Tabs;
        let theaterSystemArray = this.props.theaterSystemArray;
        return theaterSystemArray.map((theater, index) => {
            return (
                <TabPane tab={<img src={theater.Logo} className="theater__logo" />} key={index}>
                    {/* {theater.maHeThongRap} */}
                    <Tabs tabPosition="left" defaultActiveKey="0" >
                        {theater.DanhSachCumRap.map((r, a) => {
                            return (
                                <TabPane tab={
                                    <div className="theater__cumrap d-flex align-items-center">
                                        {/* className="theater__cumrap" */}
                                        <div className="theater__image mr-4">
                                            <img src={process.env.PUBLIC_URL + "/img/bhd.jpg"} alt="Rạp" width="50px" height="50px" />
                                        </div>
                                        <div className="theater__infor">
                                            <p className="mb-0">{r.TenCumRap}</p>
                                            <div className="theater__address">
                                                <span>
                                                    {r.ThongTin}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                } key={a}>
                                    {/* Danh sách phim */}
                                    <div className="showtime__content">
                                        {theater.mangLichChieu.map((lichChieu, index) => {
                                            // console.log("lichChieu", lichChieu);
                                            return lichChieu.ListCumRap.map((lc, i) => {
                                                if (lc.MaCumRap === r.MaCumRap) {
                                                    console.log("lc.MaCumRap", lc.MaCumRap);
                                                    return lc.ListPhim.map((phim, i) => {
                                                        // if (duration == 0) 
                                                        if (this.checkLichChieu(phim)) {
                                                            return (
                                                                <div key={i} className="row  py-4 pl-4 showtime__movie">
                                                                    <div className="col-2">
                                                                        <img data-fancybox="images" src={phim.HinhAnh} className="img-fluid" />
                                                                    </div>
                                                                    <div className="col-10">
                                                                        <div className="showtime__detail">
                                                                            <div className='mb-3 d-flex'>
                                                                                {phim.ListTheLoai.map((theLoai, i) => {
                                                                                    return (<Tag key={i} style={{ fontSize: '14px', textTransform: 'uppercase' }} color="orange">{theLoai.TenTheLoai}</Tag>)
                                                                                })}
                                                                            </div>
                                                                            <h1>{phim.TenPhim}</h1>
                                                                            <p>{phim.MoTa}</p>
                                                                            <a href="#" className="d-block mb-4">
                                                                                FULL SYNOPSIS
                                                                         <i className="fa fa-angle-right" />
                                                                            </a>
                                                                            <div className="showtime__list d-flex align-items-center">
                                                                                <i className="fa fa-clock-o  mr-2" />
                                                                                <span className="mr-2" style={{ width: '120px' }}> VIEWING TIMES</span>
                                                                                {
                                                                                    phim.ListNgayChieuGioChieu.map((tgc, tgcIndex) => {
                                                                                        // console.log('tgc', tgc);
                                                                                        let thoiGianChieu = moment(new Date(tgc.ThoiGianChieu)).format("DD.MM.YYYY");
                                                                                        let thoiGianView = new Date(tgc.ThoiGianChieu);
                                                                                        var now = moment(new Date()).format("DD.MM.YYYY"); //todays date
                                                                                        // console.log('now', now, "thoiGianChieu", thoiGianChieu);
                                                                                        var startDate = moment(thoiGianChieu, "DD.MM.YYYY");
                                                                                        var endDate = moment(now, "DD.MM.YYYY");
                                                                                        var duration = endDate.diff(startDate, 'days');
                                                                                        // Lấy thời gian hiện tại
                                                                                        var parseTime = timeString => moment(timeString, 'HH:mm')
                                                                                        let timeCurrent = moment(new Date()).format("HH:mm");
                                                                                        let timeLC = moment(new Date(tgc.ThoiGianChieu)).format("HH:mm");
                                                                                        // var days = (duration);
                                                                                        // console.log("days", parseTime(timeLC).isAfter(parseTime(timeCurrent)))
                                                                                        // days.toFixed(0)
                                                                                        if (duration === 0) {
                                                                                            console.log(phim.MaPhim, parseTime(timeLC).isBefore(parseTime(timeCurrent)));                                                                                            
                                                                                            return (
                                                                                                <div key={tgcIndex}>
                                                                                                    <button key={tgcIndex} className="btn m-1" disabled={parseTime(timeLC).isBefore(parseTime(timeCurrent))} onClick={() => this.handleBookingPage(tgc.MaLichChieu)
                                                                                                    }>{thoiGianView.toLocaleTimeString()}</button>
                                                                                                </div>
                                                                                            )
                                                                                        }

                                                                                    })
                                                                                }

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })

                                                }
                                            })

                                        })}
                                    </div>
                                </TabPane>
                            )
                        })}
                    </Tabs>
                </TabPane>
            )
        })
    }

    renderTime = () => {

    }

    renderLichChieuHTR = (maHeThongRap) => {
        this.props.getLichChieuHTRList(maHeThongRap);
    }

    render() {
        const theaterSystemArray = this.props.theaterSystemArray;
        // console.log("theaterSystemArray", theaterSystemArray);
        // Tabs
        const { TabPane } = Tabs;
        function callback(key) {
            console.log(key);
        }

        return (
            <div>
                {/* SHOWTIMES */}
                <section className="showtime">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="section-title">showtimes MOVIES</h1>
                            </div>
                        </div>
                        <div className="showtime__frame container">
                            <Tabs tabPosition="left" defaultActiveKey="0">
                                {this.renderTheaterSystemList()}
                            </Tabs>
                        </div>
                    </div>
                </section>
                {/* END SHOWTIMES */}

            </div>
        )
    }
}

// ReactDOM.render(<ShowtimesHome />, mountNode);


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
            // console.log(maHeThongRap);
            dispatch(getTheaterListAction(maHeThongRap))
        },
        getLichChieuHTRList: (maHeThongRap) => {
            dispatch(getLichChieuHTRListAction(maHeThongRap))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowtimesHome));