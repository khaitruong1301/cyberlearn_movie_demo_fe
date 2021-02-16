import React, { Component } from 'react'
//Connect Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
// import { MovieManageReducer } from '../../redux/reducers/MovieManageReducer';
import { getMovieListAction, getMovieDetailAction, searchLCAction } from '../redux/actions/MovieManageAction';
import Slider from '../components/layout/Slider';
import ComingMovies from '../components/layout/ComingMovies';
import ShowingMovies from '../components/layout/ShowingMovies';
import ShowtimesHome from '../components/layout/ShowtimesHome';
import moment from 'moment'
import { compose } from 'redux';


import { Spin, Select, Form, Button} from 'antd'
import { showMessageAlert } from '../templates/SweetAlert';
const { Option } = Select;

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [],
            maPhim: '',
            date: '',
            maCumRap: '',
            time: '',
            theater: [],
            isSearchButton: false
        }
    }


    componentDidMount() {
        this.setState({
            dates: this.getDate()
        })
    }

    getDate = () => {
        let resultDates = [];
        const current = moment()
        let n = 0
        while (n < 7) {
            // console.log(n)
            resultDates.push(current.format("YYYY-MM-DD"))
            current.add(1, "day")
            n++;

        }
        return resultDates;
    }

    compareDate = () => {

    }

    handleOnChangeMovie = (maPhim) => {
        this.props.getMovieDetail(maPhim);
        this.setState({
            maPhim: maPhim
        })
        console.log("maPhim", maPhim);
    }

    handleOnChangeTheater = (maCumRap) => {
        this.setState({
            maCumRap: maCumRap
        },
            console.log("this.state", this.state.maCumRap)
        )
    }

    handleOnChangeDate = (date) => {
        this.setState({
            showtimes: this.props.lichChieuPhim.LichChieu,
            date: date
        })
    }

    handleOnChangeTime = (time) => {
        this.setState({
            time: time
        })
    }

    renderTheater = () => {
        // console.log("this.props.lichChieuPhim", this.props.lichChieuPhim);
        return this.props.lichChieuPhim.map((lc, index) => {
            return (
                <Option key={index} value={lc.MaCumRap}>{lc.TenCumRap}</Option>
            )
        })
    }

    renderDates = () => {
        return this.state.dates.map((date, index) => {
            let dateString = date.toString();
            let dateName = moment(date).format('dddd');
            let dateCurrent = moment().format('dddd');
            if (dateName === dateCurrent) {
                dateName = 'Today'
            }
            return (
                <Option key={index} value={dateString}>{dateString} / {dateName}</Option>
            )
        })
    }

    renderShowtime = () => {
        if (this.props.lichChieuPhim.length > 0) {
            return this.props.lichChieuPhim.map((lc) => {
                return lc.ChiTietLichChieu.map((chiTiet, index) => {
                    let thoiGianView = new Date(chiTiet.NgayChieuGioChieu);
                    let time = thoiGianView.toLocaleTimeString();
                    let thoiGianChieu = moment(new Date(chiTiet.NgayChieuGioChieu)).format("DD.MM.YYYY");
                    var now = moment(this.state.date).format("DD.MM.YYYY"); //todays date
                    var startDate = moment(thoiGianChieu, "DD.MM.YYYY");
                    var endDate = moment(now, "DD.MM.YYYY");
                    var duration = endDate.diff(startDate, 'days');
                    // let count = 0;
                    if (duration === 0) {
                        // count = count + 1;
                        return (
                            <Option className="select__search" key={index} value={time}>{time}</Option>
                        )
                    }
                })
            })
        }
    }

    eventSearchBooking = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let dateTime = values.date + ' ' + values.time;
            console.log("value", values, moment(dateTime).format("YYYY-MM-DD HH:mm:ss"));
            this.props.searchLCAction(values.maPhim, values.maCumRap, moment(dateTime).format("YYYY-MM-DD HH:mm:ss"));
            
            this.setState({isSearchButton: true})

            setTimeout(() => {
                let maLichChieu = this.props.maLichChieuSearch;
                if ( maLichChieu != 0) {
                    this.props.history.push("/bookingticket/" + maLichChieu);
                    this.setState({
                        isSearchButton: false
                    });
                }
                else {
                    showMessageAlert('','Not found result', 'warning')
                    this.setState({
                        isSearchButton: false
                    });
                }
            }, 3000);
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="homepage">

                {/* SLIDER */}
                <Slider />
                {/* END SLIDER */}

                {/* SEARCH */}

                <div className="top-search">
                    <Form onSubmit={this.eventSearchBooking} className="login-form d-flex">
                        <Form.Item>
                            {getFieldDecorator('maPhim', {
                                rules: [{ required: true, message: 'Please choose movie!' }],
                            })(
                                <Select placeholder="-- Select a movie --" onChange={this.handleOnChangeMovie}>
                                    {this.props.movieArray.map((movie, index) => {
                                        return (
                                            <Option key={index} value={movie.MaPhim}>{movie.TenPhim}</Option>
                                        )
                                    })}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('maCumRap', {
                                rules: [{ required: true, message: 'Please choose theater!' }],
                            })(
                                <Select placeholder="-- Select a theater --" onChange={this.handleOnChangeTheater}>
                                    {this.renderTheater()}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('date', {
                                rules: [{ required: true, message: 'Please choose date!' }],
                            })(
                                <Select placeholder="-- Select a date --" onChange={this.handleOnChangeDate}>
                                    {this.renderDates()}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('time', {
                                rules: [{ required: true, message: 'Please input your time!' }],
                            })(
                                <Select placeholder="-- Select a showtime --">
                                    {
                                        this.renderShowtime()
                                    }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">
                                {this.state.isSearchButton ?<span style={{marginTop: "-16px"}}> <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></span>:<span className="animation__text center">BOOKING NOW</span>}
                            </Button>
                        </Form.Item>
                    </Form>
                    {/* <select name="select" id="phim" onChange={this.handleOnChangeMovie}>
                        <option >-- MOVIE --</option>
                        {this.props.movieArray.map((movie, index) => {
                            return (
                                <option className="select__search" key={index} value={movie.MaPhim}>{movie.TenPhim}</option>
                            )
                        })}
                    </select>
                  
                    <select name="select" id="rap" onChange={this.handleOnChangeTheater}>
                        <option>-- THEATER --</option>
                        {this.renderTheater()}
                    </select>
                    <select onChange={this.handleOnChangeDate}>
                        <option value="hide">-- DATE --</option>
                        {
                            
                        }
                    </select>
                    <select id="xuatchieu" onChange={this.handleOnChangeTime}>
                        <option>-- SHOWTIME --</option>
                        {this.renderShowtime()}
                    </select>

                    <button onClick={() => { this.eventSearchBooking() }}>
                        <span className="animation__text center">BOOKING NOW</span>
                    </button> */}
                </div>
                {/* END SEARCH */}

                {/* SHOWING MOVIE */}
                <ShowingMovies />
                {/* END SHOWING MOVIE */}

                {/* COMING SOON MOVIES */}
                <ComingMovies />
                {/* COMING SOON MOVIES */}

                {/* SHOWTIMES */}
                <ShowtimesHome />
                {/* END SHOWTIMES */}
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        movieArray: state.MovieManageReducer.movieArray,
        lichChieuPhim: state.MovieManageReducer.lichChieuPhim,
        maLichChieuSearch: state.MovieManageReducer.maLichChieuSearch
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMovieList: () => {
            dispatch(getMovieListAction())
        },
        getMovieDetail: (maPhim) => {
            dispatch(getMovieDetailAction(maPhim))
        },
        searchLCAction: (maPhim, maCumRap, ngayChieuGioChieu) => {
            dispatch(searchLCAction(maPhim, maCumRap, ngayChieuGioChieu))
        }
    }
}

export default (withRouter)(compose(
    Form.create(),
    connect(mapStateToProps, mapDispatchToProps)
)(HomePage));