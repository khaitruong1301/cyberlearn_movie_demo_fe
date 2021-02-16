import React, { Component } from 'react'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { getMovieDetailAction, AddCommentAction } from '../redux/actions/MovieManageAction';
import { getHeThongRapListAction } from '../redux/actions/TheaterSystemManageAction';
import moment from 'moment'
// Ant Design
// import 'antd/dist/antd.css';
import { Tabs, Form, Button, Input, Rate, Tag, Spin } from 'antd';
import { showMessageAlert } from '../templates/SweetAlert';
import { compose } from 'redux';
import { getSettingAction } from '../redux/actions/SettingAction';
import { dateDiff } from '../common/common';
const { TextArea } = Input;
const { TabPane } = Tabs;
class MovieDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listBinhLuan: [],
            dates: [],
            ngayKhoiChieu: '',
            setting: []
        }
    }


    componentDidMount() {
        //Get maPhim form url params
        const { maPhim } = this.props.match.params;

        console.log(maPhim);
        //Gọi action ajax lấy dữ liệu phim về => thay đổi state trên reducer
        this.props.getMovieDetail(maPhim);
        this.props.getSetting(maPhim);
        this.props.getHeThongRapList();
        this.setState({
            dates: this.getDate(),
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("nextProps", nextProps);
        console.log("prevState", prevState);
        if (prevState != nextProps)
            return {
                ...prevState, setting: nextProps.setting
            }
    }

    // getDayOfWeek = () => {
    //     let startOfWeek = moment().startOf('isoWeek');
    //     let endOfWeek = moment().endOf('isoWeek');

    //     let days = [];
    //     let day = startOfWeek;

    //     while (day <= endOfWeek) {
    //         days.push(day.toDate());
    //         day = day.clone().add(1, 'd');
    //     }
    //     return days;
    // }

    getDate = () => {
        let dateDiffReturn = 0;
        let resultDates = [];
        setTimeout(() => {
            let thoiGianKhoiChieu = this.props.ngayKhoiChieu;
            let endDate = moment(new Date()).format("DD.MM.YYYY");
            dateDiffReturn = dateDiff(thoiGianKhoiChieu, endDate);
            console.log("dateDiff", dateDiffReturn, thoiGianKhoiChieu, endDate, this.props.ngayKhoiChieu);
            const current = moment();
            let n = 0;
            let thoiGian = this.props.setting.map((st, i) => {
                return st.Setting
            })
            let lastDate = thoiGian - dateDiffReturn;
            console.log(lastDate);
            while (n < lastDate) {
                // console.log(n)
                resultDates.push(current.format("YYYY-MM-DD"))
                current.add(1, "day")
                n++;
            }
            console.log(resultDates);
        }, 3000);
        return resultDates;
    }



    checkLichChieu = (cumRap, date) => {
        let mangLC = [];
        // if(phim.MaPhim === maPhim){
        cumRap.ChiTietLichChieu.map((tgc, index) => {
            let thoiGianChieu = moment(new Date(tgc.NgayChieuGioChieu)).format("DD.MM.YYYY");
            var now = moment(date).format("DD.MM.YYYY"); //todays date
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

    handleBookingPage(maLichChieu) {
        // console.log("MaLichChieu", maLichChieu);
        if (!localStorage.getItem('userLogin')) {
            showMessageAlert("Note", "Login to continue booking!", "warning")
        }
        else {
            this.props.history.push(`/bookingticket/${maLichChieu}`);
        }
        // this.props.history.push(`/bookingticket/${maLichChieu}`);
    }


    renderHeThongRap = (HTRArray) => {
        return <Tabs tabPosition="left" defaultActiveKey="1">
            {
                HTRArray.map((theater, index) => {
                    return (
                        <TabPane tab={<div className="logo__HTR"><img src={theater.Logo} className="theater__logo" /></div>} key={index}>
                            <div style={{ color: "white" }}>
                                {/* {theater.MaHeThongRap} */}
                                {this.renderLichChieu(theater)}
                            </div>
                        </TabPane>
                    )
                })
            }
        </Tabs>
    }

    renderChiTietLichChieu = (theater, date) => {
        return this.props.lichChieuPhim.map((lc, i) => {
            if (lc.MaHeThongRap === theater.MaHeThongRap) {
                if (this.checkLichChieu(lc, date)) {
                    return (
                        <div key={i} className="showtimes__item">
                            <div className="theater__cumrap d-flex align-items-center">
                                {/* className="theater__cumrap" */}
                                <div className="theater__image mr-4">
                                    <img src={process.env.PUBLIC_URL + '/img/bhd.jpg'} alt="Rạp" width="50px" height="50px" />
                                </div>
                                <div className="theater__infor" style={{ fontSize: "16px" }}>
                                    <p className="mb-0" style={{ color: "#ec7532" }}>{lc.TenCumRap}</p>
                                    <div className="">
                                        <p>
                                            {lc.ThongTin}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="showtime__list d-flex align-items-center">
                                <i className="fa fa-clock-o  mr-2" />
                                <span className="mr-2" style={{ width: '110px' }}> VIEWING TIMES</span>
                                <div >
                                    {
                                        lc.ChiTietLichChieu.map((chiTiet, index) => {
                                            let thoiGianChieu = moment(new Date(chiTiet.NgayChieuGioChieu)).format("DD.MM.YYYY");
                                            let thoiGianView = new Date(chiTiet.NgayChieuGioChieu);
                                            var now = moment(date).format("DD.MM.YYYY"); //todays date
                                            var startDate = moment(thoiGianChieu, "DD.MM.YYYY");
                                            var endDate = moment(now, "DD.MM.YYYY");
                                            var duration = endDate.diff(startDate, 'days');
                                            var parseTime = timeString => moment(timeString, 'HH:mm')
                                            let timeCurrent = moment(new Date()).format("HH:mm");
                                            let timeLC = moment(new Date(chiTiet.NgayChieuGioChieu)).format("HH:mm");
                                            // console.log('now', now, "thoiGianChieu", thoiGianChieu);
                                            
                                            if (duration === 0) {
                                                // console.log("timeLC", timeLC, 'timeCurrent', timeCurrent);   
                                                return <button key={index} className="btn mr-2" disabled={parseTime(timeLC).isBefore(parseTime(timeCurrent))} onClick={() => this.handleBookingPage(chiTiet.MaLichChieu)
                                                }>{thoiGianView.toLocaleTimeString()}</button>
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        })
    }


    renderLichChieu = (theater) => {
        let dates = [];
        if (this.state.setting.length > 0) {
            let dateDiffReturn = 0;
            let thoiGianKhoiChieu = this.props.ngayKhoiChieu;
            let endDate = moment(new Date()).format("DD.MM.YYYY");
            dateDiffReturn = dateDiff(thoiGianKhoiChieu, endDate);
            // console.log("dateDiff", dateDiffReturn, thoiGianKhoiChieu, endDate, this.props.ngayKhoiChieu);
            const current = moment();
            let n = 0;
            let thoiGianSetting = this.state.setting.map((st, i) => {
                return st.Setting
            })
            let lastDate = thoiGianSetting - dateDiffReturn;
            // console.log(lastDate);
            while (n <= lastDate) {
                dates.push(current.format("YYYY-MM-DD"))
                current.add(1, "day")
                n++;
            }
            // console.log("dates", dates);
        }
        // console.log('dates',  this.props.setting);
        return (
            
            // <section className="showtime">
            <div className="container showtime__detail">
                <Tabs defaultActiveKey="0">
                    {
                        dates.map((date, index) => {
                            return (
                                <TabPane className="" key={index} tab={
                                    <a >
                                        {moment(date).format("DD/MM")}<br />
                                        {moment(date).format('ddd')}
                                    </a>
                                }>
                                    {this.renderChiTietLichChieu(theater, date)}
                                </TabPane>
                            )
                        })
                    }
                </Tabs>
            </div>
        )
    }

    submitBinhLuan = (e) => {
        e.preventDefault();
        let userLogin = JSON.parse(localStorage.getItem('userLogin'));
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let comment = {
                MaThanhVien: userLogin.MaThanhVien,
                MaPhim: this.props.movieInfor.MaPhim,
                NoiDungBinhLuan: values.NoiDungBinhLuan,
                ChiSoDanhGia: values.ChiSoDanhGia
            }
            this.props.addComment(comment);
        });
    }


    render() {
        // console.log("HTR", this.props.HTRArray);        
        const { TabPane } = Tabs;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 6 },
        };
        const { getFieldDecorator } = this.props.form;
        const movieInfor = this.props.movieInfor;
        const binhLuanPhim = this.props.thongTinBinhLuanPhim;
        var arr = [];
        for (var key in this.props.movieInfor.ListTheLoai) {
            arr.push(this.props.movieInfor.ListTheLoai[key]);
        }
        return (
            <div>
                <div className="hero mv-single-hero">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {/* <h1> movie listing - list</h1>
				<ul class="breadcumb">
					<li class="active"><a href="#">Home</a></li>
					<li> <span class="ion-ios-arrow-right"></span> movie listing</li>
				</ul> */}
                            </div>
                        </div>
                    </div>

                </div>
                {this.props.setting.length === 0 ?
                    <div className="spinner__movie__detail">
                        <Spin size="large"></Spin>
                    </div> :
                    <div className="page-single movie-single movie_single">
                        <div className="container">
                            <div className="row ipad-width2">
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="movie-img sticky-sb">
                                        <img src={movieInfor.HinhAnh} alt="" />
                                        <div className="movie-btn">
                                            <div className="btn-transform transform-vertical red">
                                                <div className="">
                                                    {/* <button className="btn__booking my-4">Đặt vé</button> */}
                                                </div>
                                                <div><a href={movieInfor.Trailer} className="item item-2 redbtn fancybox-media hvr-grow"><i className="ion-play" /></a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 col-sm-12 col-xs-12">
                                    <div className="movie-single-ct main-content">
                                        <h1 className="bd-hd">{movieInfor.TenPhim}</h1>
                                        <div className="movie-rate">
                                            <div className="rate">
                                                <i className="ion-android-star" />
                                                <p><span>{movieInfor.DanhGia}</span> <span className="per__mark">/10</span><br />
                                                    <span className="rv">{binhLuanPhim.length} Reviews</span>
                                                </p>
                                            </div>
                                            <div className="rate-star">
                                                <p>Rate This Movie:</p>
                                                <i className="ion-ios-star" />
                                                <i className="ion-ios-star" />
                                                <i className="ion-ios-star" />
                                                <i className="ion-ios-star" />
                                                <i className="ion-ios-star" />
                                                <i className="ion-ios-star" />
                                                <i className="ion-ios-star" />
                                                <i className="ion-ios-star" />
                                                <i className="ion-ios-star-outline" />
                                            </div>
                                        </div>
                                        <div className="movie-tabs">
                                            <div className="tabs">
                                                {/* Nav tabs */}
                                                <nav>
                                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                        <a className="nav-item nav-link font-weight-bold active" data-toggle="tab" href="#overview">OVERVIEW</a>
                                                        <a className="nav-item nav-link font-weight-bold" data-toggle="tab" href="#reviews">REVIEWS</a>
                                                        <a className="nav-item nav-link font-weight-bold" data-toggle="tab" href="#showtimes">SHOWTIMES</a>
                                                    </div>
                                                </nav>

                                                {/* Tab panes */}
                                                <div className="tab-content">
                                                    <div id="overview" className="container tab-pane active"><br />
                                                        <div className="row">
                                                            <div className="col-md-8 col-sm-12 col-xs-12">
                                                                <div className="sb-it">
                                                                    <h6>Description:</h6>
                                                                    <p>{movieInfor.MoTa}</p>
                                                                </div>
                                                                <div className="sb-it">
                                                                    <h6>Ngày khởi chiếu:</h6>
                                                                    <p>{movieInfor.NgayKhoiChieu}</p>
                                                                </div>
                                                                <div className="sb-it">
                                                                    <h6>Run Time:</h6>
                                                                    <p>{movieInfor.ThoiLuong} &nbsp;&nbsp;minutes</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-xs-12 col-sm-12">
                                                                <div className="sb-it">
                                                                    <h6>Director: </h6>
                                                                    <p><a>{movieInfor.DaoDien}</a></p>
                                                                </div>
                                                                <div className="sb-it">
                                                                    <h6>Stars: </h6>
                                                                    <p><a>{movieInfor.DienVien}</a></p>
                                                                </div>
                                                                <div className="sb-it">
                                                                    <h6>Genres:</h6>
                                                                    {
                                                                        arr.map((theloai, tl) => {
                                                                            return (
                                                                                <Tag style={{ fontSize: "15px", marginBottom: "4px" }} key={tl} color="orange">{theloai.TenTheLoai}</Tag>
                                                                            )
                                                                        })
                                                                    }
                                                                    {/* <p><a href="#">Action, </a> <a href="#"> Sci-Fi,</a> <a href="#">Adventure</a></p> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="reviews" className="container tab-pane fade"><br />
                                                        <div className="row">
                                                            {/* <div className="rv-hd">
                                                            <a href="#" className="redbtn">Write Review</a>
                                                        </div> */}
                                                            <div style={{ width: "100%" }}>
                                                                <Form onSubmit={this.submitBinhLuan}>
                                                                    <Form.Item {...formItemLayout} label="Rating">
                                                                        {getFieldDecorator('ChiSoDanhGia', {
                                                                            rules: [
                                                                                {
                                                                                    required: false,
                                                                                },
                                                                            ],
                                                                            initialValue: 0
                                                                        })(<Rate allowHalf />)}
                                                                    </Form.Item>
                                                                    <Form.Item>
                                                                        {getFieldDecorator('NoiDungBinhLuan', {
                                                                            rules: [
                                                                                {
                                                                                    required: true,
                                                                                    message: 'Hãy nhập nội dung!'
                                                                                },
                                                                            ],
                                                                            initValue: 'Hãy nhập nội dung bình luận!'
                                                                        })(<TextArea autoSize={{ minRows: 3, maxRows: 5 }} />)}
                                                                    </Form.Item>
                                                                    <Form.Item>
                                                                        <Button className="btn-orange btn-add-comment" htmlType="submit">
                                                                            Add Comment
                                                                    </Button>
                                                                    </Form.Item>
                                                                </Form>
                                                            </div>

                                                            <div style={{ width: "100%" }}>
                                                                {
                                                                    binhLuanPhim.map((binhLuan, index) => {
                                                                        let ngayBinhLuan = new Date(binhLuan.NgayBinhLuan)
                                                                        return (
                                                                            <div key={index} className="mv-user-review-item">
                                                                                <div className="user-infor">
                                                                                    <img src={process.env.PUBLIC_URL + "/images/uploads/userava.png"} alt="" />
                                                                                    <div>
                                                                                        <div>
                                                                                            <div className="no-star d-flex align-items-baseline">
                                                                                                <h6>{binhLuan.TenThanhVien}</h6>
                                                                                                <Rate className="ml-4" allowHalf defaultValue={parseFloat(binhLuan.ChiSoDanhGia)} />
                                                                                            </div>
                                                                                        </div>
                                                                                        <p className="time">
                                                                                            {ngayBinhLuan.toLocaleDateString()}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                                <p>{binhLuan.NoiDungBinhLuan}</p>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="showtimes" className="fade"><br />
                                                        <div className="showtime__frame__detail">
                                                            {this.renderHeThongRap(this.props.HTRArray)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movieInfor: state.MovieManageReducer.movieInfor,
        ngayKhoiChieu: state.MovieManageReducer.ngayKhoiChieu,
        thongTinBinhLuanPhim: state.MovieManageReducer.thongTinBinhLuanPhim,
        lichChieuPhim: state.MovieManageReducer.lichChieuPhim,
        HTRArray: state.TheaterSystemManageReducer.HTRArray,
        setting: state.SettingReducer.setting
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMovieDetail: (maPhim) => {
            dispatch(getMovieDetailAction(maPhim))
        },
        getHeThongRapList: () => {
            dispatch(getHeThongRapListAction())
        },
        addComment: (comment) => {
            dispatch(AddCommentAction(comment))
        },
        getSetting: (setting) => {
            dispatch(getSettingAction(setting))
        }
    }
}

export default withRouter(compose(Form.create(), connect(mapStateToProps, mapDispatchToProps))(MovieDetail))