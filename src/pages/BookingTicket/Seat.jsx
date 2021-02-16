import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { bookingSeatAction } from '../../redux/actions/BookingManageAction';
import { isEqual } from 'lodash';
import { element } from 'prop-types';
import { showMessageAlert } from '../../templates/SweetAlert';
import { connection } from '../../index'
import { settings } from '../../config/settings';

class Seat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dangDat: false,
            content: '',
            danhSachGheDaDat: [],
        }
    }


    // static getDerivedStateFromProps(nextProps, prevState) {
    //     // console.log("nextProps", nextProps);
    //     // console.log("prevState", prevState);

    //     if(nextProps.danhSachGheDaDat !== prevState.danhSachGheDaDat){
    //         // connection.invoke("SendListGhe", "abc", nextProps.danhSachGheDaDat, nextProps.maLichChieu);            
    //         // return { ...prevState, danhSachGheDangDat: nextProps.danhSachGheDaDat,}
    //     }
    //     return null;
    // }

    renderGhe = () => {
        const { ghe } = this.props;
        let classTrangThaiGhe = 'ghe ';
        let disabled = ghe.DaDat ? true : false;
        // let tenGhe = ghe.DaDat ? 'X' : ghe.STT;
        let tenGhe = ghe.STT;
        // console.log("danhSachGheInvoke", this.props.objectDsGheDangChon);
        let tempArray =  this.props.objectDsGheDangChon;
        tempArray.map((item) => {
            let tempDsGhe = JSON.parse(item.danhSachGhe);        
            tempDsGhe.map((gheRealTime) => {
                if (gheRealTime.MaGhe === ghe.MaGhe) {
                    console.log("tempDsGhe", gheRealTime);
                    let taiKhoan = JSON.parse(localStorage.getItem(settings.userLogin)).TaiKhoan;
                    if (item.taiKhoan !== taiKhoan){
                        disabled = true;
                        classTrangThaiGhe += 'diffUserChoosing ';
                    }
                }
            })
        })
        if (ghe.DaDat) {
            classTrangThaiGhe += ghe.DaDat ? 'gheDaDat ' : ' ';
        } else {
            if (this.state.dangDat) {
                classTrangThaiGhe += 'gheDangDat ';
            } else {
                classTrangThaiGhe += ghe.LoaiGhe === 'Thường' ? 'ghe ' : ghe.LoaiGhe === 'Vip' ? 'gheVip ' : 'gheDoi';
            }
        }
        return (
            <Fragment>
                <button id="idghe" onClick={this.chonGhe} className={`${classTrangThaiGhe}`} disabled={disabled}>
                    {this.state.dangDat ? tenGhe : ''}
                </button>
            </Fragment>)
    }

    chonGhe = () => {
        // connection.invoke("SendListGhe", "abc", JSON.stringify(this.props.ghe), this.props.maLichChieu).catch(err => console.error(err.toString()));;   

        //Sau khi setState thay đổi trang thái ghế sẽ đưa dữ liệu lên reducer xử lý
        if (this.props.danhSachGheDaDat.length < 10) {
            this.setState({
                dangDat: !this.state.dangDat
            }, () => {
                const gheDuocChon = {
                    MaGhe: this.props.ghe.MaGhe,
                    GiaVe: this.props.ghe.GiaVe,
                    STT: this.props.ghe.STT,
                    TenGhe: this.props.ghe.TenGhe,
                    DangDat: this.state.dangDat
                }
                this.props.datGhe(gheDuocChon, this.props.maLichChieu); //Gọi hàm đưa lên reducer
            })
        }
        else {
            if (this.state.dangDat) {
                this.setState({
                    dangDat: false
                }, () => {
                    const gheDuocChon = {
                        MaGhe: this.props.ghe.MaGhe,
                        GiaVe: this.props.ghe.GiaVe,
                        STT: this.props.ghe.STT,
                        TenGhe: this.props.ghe.TenGhe,
                        DangDat: this.state.dangDat
                    }
                    this.props.datGhe(gheDuocChon, this.props.maLichChieu); //Gọi hàm đưa lên reducer
                })
            }
            else {
                showMessageAlert('Warning', 'Maximum is 10 tickets!!', 'warning')
            }
        }
    }

    componentDidUpdate(nextProps, nextState) {

    }

    alertMessage = () => {
        console.log("Maximum is 10 tickets!!!");
    }


    kiemTraGheChon = () => {

    }

    render() {
        // console.log(this.state.content);

        return (
            <Fragment>
                {this.renderGhe()}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        danhSachGheDaDat: state.BookingManageReducer.danhSachGheDaDat,
        objectDsGheDangChon: state.BookingManageReducer.objectDsGheDangChon
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        datGhe: (gheDuocChon, maLichChieu) => {
            dispatch(bookingSeatAction(gheDuocChon, maLichChieu))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Seat)