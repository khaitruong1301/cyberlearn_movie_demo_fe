import React, { Component, Fragment } from 'react'
import { Redirect, withRouter, Prompt } from 'react-router-dom'
import { connect } from 'react-redux'
import { getChiTietPhongVeAction, bookingTicketAction, putListGheDangDatAction, putDataInvokeAction } from '../../redux/actions/BookingManageAction';
import Seat from './Seat';
import { Modal, Spin, Radio, } from 'antd';
import { settings } from '../../config/settings';
import { showMessageAlert, showMessageAlertEvent } from '../../templates/SweetAlert';
import { sendMail, sendMailConfirmBooking } from '../../common/common'
import axios from 'axios';
import QRCode from 'qrcode';
import base64url from 'base64-url'
import { connection } from '../../index'

import { PayPalButton } from "react-paypal-button-v2";
import { TheaterSystemManageReducer } from '../../redux/reducers/TheaterSystemManageReducer';
import { getSettingAction } from '../../redux/actions/SettingAction';

const { confirm } = Modal;
const perUSD = 0.000043

class BookingTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            visiblePaypal: false,
            danhSachVe: [],
            objectDatVe: [],
            tongTien: 0,
            status: false,
            maLichChieu: this.props.match.params.MaLichChieu,
            minutes: 5,
            seconds: 0,
            isActive: false,
            secondsElapsed: 90,//time in seconds is 5 
            // Send Email
            feedback: '', name: 'Name', email: 'dreamstore2201@gmail.com',
            content: '',
            danhSachGheInvoke: [],
            isOnlinePayment: false,
            paymentStatus: 0,
            isBookingButton: false,
            giamGia: 0,
            flag: false
        }
    }

    _isMounted = false;

    getHours() {
        return ("0" + Math.floor(this.state.secondsElapsed / 3600)).slice(-2);
    }

    getMinutes() {
        return ("0" + Math.floor((this.state.secondsElapsed % 3600) / 60)).slice(
            -2
        );
    }

    getSeconds() {
        return ("0" + (this.state.secondsElapsed % 60)).slice(-2);
    }

    startTime = () => {
        this.setState({ isActive: true });

        this.countdown = setInterval(() => {
            if (this.state.secondsElapsed === 0) {
                clearInterval(this.countdown);
            }
            else {
                this.setState(({ secondsElapsed }) => ({
                    secondsElapsed: secondsElapsed - 1
                }));
            }

        }, 1000);

    };

    resetTime = () => {
        clearInterval(this.countdown);
        this.setState({
            secondsElapsed: 1800000 / 1000,
            isActive: false
        });
    };

    pauseTime = () => {
        clearInterval(this.countdown);
        this.setState({ isActive: false });
    };

    componentDidMount() {
        console.log('mounting');
        // window.onbeforeunload = function (e) {
        //     var message = "Your confirmation message goes here.",
        //         e = e || window.event;
        //     // For IE and Firefox
        //     if (e) {
        //         e.returnValue = message;
        //     }
        //     // For Safari
        //     return message;
        // };
        this._isMounted = true;
        if (this._isMounted) {
            this.props.getChiTietPhongVe(this.state.maLichChieu);
            localStorage.setItem('MaLichChieu', this.state.maLichChieu);
            this.receiveListGheRealTime();

            this.startTime();

            if (localStorage.getItem(settings.userLogin) != null) {
                this.getGiamGia();
            }
        }
        window.addEventListener('beforeunload', this.componentCleanup);
    }
    // static async getDerivedStateFromProps(nextProps, prevState) {
    //     //  this.receiveListGheRealTime(); let tempArray = [];
    //     let tempArray = [];

    //     await connection.on("ReceiveListGheDangDat", (dsGheDangDatReturn) => {

    //         console.log(dsGheDangDatReturn, typeof (dsGheDangDatReturn));
    //         tempArray = dsGheDangDatReturn.filter(item => item.maLichChieu === parseInt(prevState.maLichChieu));
    //         console.log("tempArray", tempArray);
    //         // this.setState({
    //         //     danhSachGheInvoke: tempArray
    //         // })
    //         nextProps.putDataInvoke(tempArray)
    //     })
    //     console.log(1);
    //     return { ...prevState, danhSachGheInvoke: tempArray };
    // }

    componentCleanup = () => { // this will hold the cleanup code
        // whatever you want to do when the component is unmounted or page refreshes
        this._isMounted = false;
        console.log('unmounting');
        // clearInterval(this.myInterval)
        if (localStorage.getItem(settings.userLogin)) {
            let taiKhoan = JSON.parse(localStorage.getItem(settings.userLogin)).TaiKhoan;
            connection.invoke("SendRequestData", taiKhoan, this.state.maLichChieu);
        }
    }


    componentWillUnmount() {
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup);
    }


    // Lấy % giảm giá
    getGiamGia() {
        let taiKhoan = JSON.parse(localStorage.getItem(settings.userLogin));
        if (taiKhoan.MaLoaiThanhVien === 3) {
            this.props.getSetting('GG1');
            this.setState({
                flag: true
            })
        }
    }


    receiveListGheRealTime() {
        let tempArray = [];
        connection.on("ReceiveListGheDangDat", (dsGheDangDatReturn) => {
            console.log(dsGheDangDatReturn, typeof (dsGheDangDatReturn));
            tempArray = dsGheDangDatReturn.filter(item => item.maLichChieu === parseInt(this.state.maLichChieu));
            console.log("tempArray", tempArray);
            // this.setState({
            //     danhSachGheInvoke: tempArray
            // })
            this.props.putDataInvoke(tempArray)
        })
    }


    renderDanhSachGhe = () => {
        return this.props.danhSachGhe.map((ds, index) => {
            return (
                <div className="d-flex" key={index}>
                    <span className="tenHang">{ds.TenHang}</span>
                    {
                        ds.DanhSachGheTheoHang.map((ghe, i) => {
                            return <Seat danhSachGheInvoke={this.state.danhSachGheInvoke} maLichChieu={this.state.maLichChieu} ghe={ghe} index={i + 1} tenHang={ghe.TenHang} key={i} />
                        })
                    }
                    {/* {ghe[i].tenHang !== ghe[i--].tenHang ? <br /> : ''} */}
                </div>
            )
        })
    }

    renderGheDuocChon = () => {
        return this.props.danhSachGheDaDat.map((gheDangDat, index) => {
            return <Fragment key={index}>
                <span><span style={{ color: "#ec7532" }}>{gheDangDat.TenGhe}</span> - {gheDangDat.GiaVe.toLocaleString()} <span>,</span> </span>
            </Fragment>
        })
    }

    handleBooking = () => {
        let tongTien = 0;
        //Tạo object như backend yêu cầu điền đầy đủ thông tin vào các thuộc tính => gọi api thông qua action
        this.props.danhSachGheDaDat.map((ghe, index) => {
            return tongTien += ghe.GiaVe;
        })
        let objectDatVe = {
            MaLichChieu: this.props.match.params.MaLichChieu,
            TongTien: tongTien - tongTien*this.getValueUuDai()/100,
            GiamGia: tongTien*this.getValueUuDai()/100,
            DanhSachVe: this.props.danhSachGheDaDat,
            TaiKhoan: JSON.parse(localStorage.getItem(settings.userLogin)).TaiKhoan
        }

        let objectDSGheDangDat = {
            maLichChieu: this.props.match.params.MaLichChieu,
            danhSachGhe: JSON.stringify(this.props.danhSachGheDaDat),
            taiKhoan: JSON.parse(localStorage.getItem(settings.userLogin)).TaiKhoan
        }

        // this.props.putListGheDangDat(objectDSGheDangDat);

        this.setState({
            objectDatVe: objectDatVe
        })
        if (objectDatVe.DanhSachVe.length > 0) {
            this.pauseTime();
            let tongTien = 0;
            {
                this.props.danhSachGheDaDat.map((ghe, index) => {
                    return tongTien += ghe.GiaVe;
                })
            }
            this.setState({
                visiblePaypal: true,
                danhSachVe: objectDatVe.DanhSachVe,
                tongTien: tongTien
            })
        }
        else {
            showMessageAlert('Note', 'Please choose seat!!!', 'warning')
        }

        console.log("objectDatVe", objectDatVe);

        // Gọi hàm từ dispatch reducer đẩy giá trị này lên server
        // this.props.datVeApi(objectDatVe);
    }

    handleOk = e => {
        console.log(e);
        let taiKhoan = JSON.parse(localStorage.getItem(settings.userLogin)).TaiKhoan;
        this.setState({
            visible: false,
        });
        connection.invoke("SendRequestData", taiKhoan, this.state.maLichChieu);
        window.location.reload();
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.props.history.push('/home/homepage');
    };

    handleCancelPaypal = e => {
        this.startTime();
        const { minutes, seconds } = this.state;
        this.setState({
            visiblePaypal: false
        })
    }


    onChangePayment = e => {
        console.log('radio checked', e.target.value);
        let objectDatVe = this.state.objectDatVe;
        let objectDatVeNew = {
            ...objectDatVe,
            TrangThaiThanhToan: e.target.value
        }
        if (e.target.value === 1) {
            this.setState({
                isOnlinePayment: true,
                paymentStatus: e.target.value,
                objectDatVe: objectDatVeNew
            })
            console.log(objectDatVeNew);
        }
        else if (e.target.value === 0) {
            this.setState({
                isOnlinePayment: false,
                paymentStatus: e.target.value
            })
            console.log(objectDatVeNew);
        }
    };

    createOrder(data, actions) {
        let vndMoney = parseInt(this.state.tongTien);
        let dataList = [];
        this.props.danhSachGheDaDat.map((ghe, index) => {
            let giaVe = ghe.GiaVe;
            let item = {
                name: 'Ghế ' + ghe.TenGhe,
                unit_amount: {
                    value: giaVe,
                    currency_code: 'USD'
                },
                quantity: '1',
                sku: ghe.GiaVe.toLocaleString() + ' VND'
            }
            dataList.push(item)
        })
        console.log("data", data);
        return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [{
                amount: {
                    value: vndMoney,
                    currency_code: 'USD',
                    breakdown: {
                        item_total: {
                            value: vndMoney,
                            currency_code: 'USD'
                        }
                    }
                },
                // invoice_id: 'muesli_invoice_id',
                items: dataList
            }]
        });
    }

    onApprove(data, actions) {
        // Capture the funds from the transaction
        var objectDatVe = this.state.objectDatVe;
        var danhSachGheDaDat = this.props.danhSachGheDaDat;
        const { thongTinPhim } = this.props;
        this.setState({
            visiblePaypal: false
        })
        return actions.order.capture().then(function (details) {
            // Show a success message to your buyer
            // showMessageAlert("Notification", "Transaction completed by " + details.payer.name.given_name, "success");
            console.log('Notification', "Transaction completed by " + details.payer_given_name, 'success')
            // OPTIONAL: Call your server to save the transaction
            return axios({
                url: settings.domainLocal + `/QuanLyDatVe/DatVe`,
                method: 'POST',
                data: objectDatVe,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem(settings.token)
                }
            }).then((result) => {
                // console.log("Ma Thanh Toan", result.data);
                if (result.data.Content === "Tài khoản người dùng không tồn tại!" || result.data.Content === "Tài khoản người dùng không tồn tại!") {
                    showMessageAlert('Warning', result.data.Content, 'warning')
                }
                else if(isNaN(result.data)) {
                    console.log("Ma Thanh Toan", result.data);
                    // setTimeout(() => {
                    //     showMessageAlertEvent('Notification', 'Hãy kiểm tra email của bạn!', 'success')                        
                    // }, 3000);
                    console.log('danhSachGheDaDat', danhSachGheDaDat, 'result.data', result.data, 'this.getValueUuDai()', this.getValueUuDai());
                    sendMailConfirmBooking(danhSachGheDaDat, thongTinPhim, result.data, this.getValueUuDai())
                }

            }).catch(errors => {
                // console.log(errors.response.data);
            })
        });
    }

    generateQR = async text => {
        try {
            console.log(await QRCode.toDataURL(text))
        } catch (err) {
            console.error(err)
        }
        await QRCode.toDataURL(text).then((url) => {
            return url;
        });
    }

    sendFeedback(serviceID, templateID, templateParams, userID) {
        window.emailjs.send(
            serviceID, templateID,
            templateParams,
            userID
        ).then(res => {
            console.log('Email successfully sent!')
        })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }
    // end handle email


    async handlePaymentInCash() {
        let objectDatVe = this.state.objectDatVe;
        var danhSachGheDaDat = this.props.danhSachGheDaDat;
        const { thongTinPhim } = this.props;
        let objectDatVeNew = {
            ...objectDatVe,
            TrangThaiThanhToan: 0
        }
        this.setState({
            isBookingButton: true,
        })
        console.log(objectDatVeNew);
        await this.props.bookingTicket(objectDatVeNew);
        setTimeout(() => {
            console.log(this.props.datVeResult);
            // Kiểm tra kết quả đặt vé trước
            sendMailConfirmBooking(danhSachGheDaDat, thongTinPhim, this.props.datVeResult, this.getValueUuDai())
        }, 2000);
    }

    isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
    
        return true;
    }

    getValueUuDai = () => {
        if (this.state.flag){  
            let giamGia = 0;        
            giamGia = this.props.setting.map(st => {
                return st.Setting;
            })
            return giamGia;
        }
        else return 0;
    }
    //PROMPT
    // END PROMT
    render() {
        const { minutes, seconds } = this.state;
        const { thongTinPhim } = this.props;
        let giamGia = 0;               
        if (!localStorage.getItem('userLogin')) {
            return <Redirect to='/' />
        }
        // const doTuoiObj = JSON.parse(thongTinPhim.DoTuoi.toString());
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div className="booking__layout">
                <div className="container">
                    <div>
                        {this.props.danhSachGhe.length === 0 ?
                            <div className="spinner">
                                <Spin size="large"></Spin>
                            </div> :
                            <div className="booking__content">
                                <div className="seat__content">
                                    <div className="seat__inner">
                                        <div className="seat__text d-flex justify-content-between">
                                            <div className="booking__infor d-flex align-items-center">
                                                {/* <div className="booking__logoHTR">
                                            <p>IMG</p>
                                        </div> */}
                                                <div className="booking__text text-white">
                                                    <span className="text-animation">{thongTinPhim.TenCumRap} </span><br />
                                                    {thongTinPhim.NgayChieu} - {thongTinPhim.GioChieu} - {thongTinPhim.TenRap}
                                                </div>
                                            </div>
                                            <div className="booking__watch text-white">
                                                {this.state.secondsElapsed === 0
                                                    ?
                                                    <Modal
                                                        title="Time to hold a seat!"
                                                        visible={this.state.visible}
                                                        onOk={this.handleOk}
                                                        onCancel={this.handleCancel}
                                                        okText="Book again"
                                                    >
                                                        <p>
                                                            Please fulfill your order within 5 minutes. </p>
                                                    </Modal>
                                                    : <p>Thời gian giữ ghế <br /> <span className="countdown__timer">{this.getMinutes()}:{this.getSeconds()}</span></p>
                                                }
                                            </div>
                                        </div>
                                        <div className="mt-3 screen">
                                            <img src={process.env.PUBLIC_URL + '/images/screen.png'} alt="" />
                                        </div>
                                    </div>
                                    <div className="m-4">

                                        {this.renderDanhSachGhe()}

                                    </div>
                                </div>
                                <div className="infor__booking_content">
                                    <h4 className="text-white border__bottom pb-4">{thongTinPhim.TenPhim}</h4>
                                    {/* <p>{(thongTinPhim.DoTuoi)}</p> */}
                                    <div className="d-flex justify-content-between border__bottom">
                                        <p>Ngày chiếu giờ chiếu </p>
                                        <p>{thongTinPhim.NgayChieu} - <span style={{ color: "#ec7532", fontSize: "18px" }}>{thongTinPhim.GioChieu}</span></p>
                                    </div>
                                    <div className="d-flex justify-content-between border__bottom mt-3">
                                        <p>Cụm rạp </p>
                                        <p>{thongTinPhim.TenCumRap}</p>
                                    </div>
                                    <div className="d-flex justify-content-between border__bottom mt-3">
                                        <p>Rạp </p>
                                        <p>{thongTinPhim.TenRap}</p>
                                    </div>
                                    <div className="d-flex justify-content-between border__bottom mt-3 pb-3">
                                        <div style={{ width: "30%", textAlign: "left" }}>Ghế chọn </div>
                                        <div className="content__gheDat" style={{ textAlign: "left" }}>
                                            {this.renderGheDuocChon()}
                                        </div>
                                        {/* <br/> */}
                                    </div>
                                    <div className="d-flex justify-content-between border__bottom mt-3">
                                        <p>Ưu đãi </p>
                                        <p>{this.getValueUuDai()} %</p>
                                    </div>
                                    <div className="d-flex justify-content-between border__bottom mt-3">
                                        <p>Tổng tiền </p>
                                        {this.props.danhSachGheDaDat.reduce((tongTien, ghe, index) => {
                                            return tongTien += ghe.GiaVe;
                                        }, 0).toLocaleString()}
                                    </div>
                                    <div className="mt-4">
                                        <button onClick={() => this.handleBooking()} className="btn__booking" >Booking Ticket</button>
                                    </div>
                                    <Modal
                                        title="Payment before booking !"
                                        visible={this.state.visiblePaypal}
                                        onCancel={this.handleCancelPaypal}
                                        footer={false}
                                    >
                                        {/* Thanh toán trực tuyến và thanh toán online */}
                                        <div>
                                            {this.state.isBookingButton ? <div style={{ marginTop: "0", textAlign: 'center' }}><div className="lds-ellipsis-color"><div></div><div></div><div></div><div></div></div></div> :
                                                <div>
                                                    <Radio.Group onChange={this.onChangePayment} value={this.state.paymentStatus} className="mb-4">
                                                        <Radio style={radioStyle} value={0}>
                                                            Payment in cash
                                                        </Radio>
                                                        <Radio style={radioStyle} value={1}>
                                                            Payment online
                                                        </Radio>
                                                    </Radio.Group>
                                                    {
                                                        this.state.paymentStatus === 1 ? <PayPalButton
                                                            // clientId="Aasw_xwhD8mUqXIm0BIACYfAhlC4iogrojeWkKXPE8OSk32UFryNDcUqhE3E6IHlXcSOz3yuwicoYFUw"
                                                            createOrder={(data, actions) => this.createOrder(data, actions)}
                                                            onApprove={(data, actions) => this.onApprove(data, actions)}
                                                            onError={(error) => {
                                                                console.log('error', error);
                                                            }}
                                                        /> : null
                                                    }
                                                    {/* Button dành cho thanh toán tiền mặt */}
                                                    {this.state.paymentStatus === 0 ? <button className="btn__booking" onClick={() => this.handlePaymentInCash()}><span>Continue</span></button> : null}
                                                </div>}
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="typeseat">
                        <span className="mr-2">
                            <button className="gheNote"></button>
                            <span>Ghế thường</span>
                        </span>
                        <span className="mr-2">
                            <button className="gheNote gheVip"></button>
                            <span>Ghế VIP</span>
                        </span>
                        <span className="mr-2">
                            <button className="gheNote gheDangDat"></button>
                            <span>Ghế đang chọn</span>
                        </span >
                        <span className="mr-2">
                            <button className="gheNote gheDaDat"></button>
                            <span>Ghế đã đặt</span>
                        </span>
                        <span className="mr-2">
                            <button className="gheNote diffUserChoosing"></button>
                            <span>Ghế đang có người chọn</span>
                        </span>
                    </div>
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
        datVeResult: state.BookingManageReducer.datVeResult,
        setting: state.SettingReducer.setting
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getChiTietPhongVe: (maLichChieu) => {
            dispatch(getChiTietPhongVeAction(maLichChieu));
        },
        bookingTicket: (objectDatVe) => {
            console.log("action", objectDatVe);
            dispatch(bookingTicketAction(objectDatVe));
        },
        putListGheDangDat: (objectDSGheDangDat) => {
            console.log("objectDSGheDangDat", objectDSGheDangDat);
            dispatch(putListGheDangDatAction(objectDSGheDangDat));
        },
        putDataInvoke: (objectDsGheDangChon) => {
            dispatch(putDataInvokeAction(objectDsGheDangChon))
        },
        getSetting: (setting) => {
            dispatch(getSettingAction(setting))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingTicket))