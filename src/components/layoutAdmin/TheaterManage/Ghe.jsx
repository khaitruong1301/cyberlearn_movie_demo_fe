import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { bookingSeatAction, chonGheAdminAction, updateSeatAction } from '../../../redux/actions/BookingManageAction';
import { isEqual } from 'lodash';
import { Menu, Dropdown, Tooltip } from 'antd';
import { element } from 'prop-types';
import { showMessageAlert } from '../../../templates/SweetAlert';
import { capNhatLoaiGheAction } from '../../../redux/actions/BookingManageAction';


class Ghe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dangDat: false
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("nextProps", nextProps);
        console.log("prevState", prevState);
        // return {
        //     // ...prevState, danhSachGhe: nextProps.danhSachGhe
        // }
    }


    handleOnChange = () => {
        this.setState({
            dangChon: false
        })
    }

    renderGhe = () => {
        const onClick = ({ key }) => {
            if (key == 1) {
                let mangGheUpdate = this.props.dsGheChonUpdate;
                if (mangGheUpdate.length === 0) {
                    showMessageAlert('Warning', 'Vui lòng chọn ghế', 'warning')
                }
                let tenLoaiGhe = 'Vip';
                let mangGheUpdateTemp = [];
                mangGheUpdate.map((ghe, index) => {
                    mangGheUpdateTemp.push({
                        MaGhe: ghe.MaGhe
                    })
                })
                if (mangGheUpdateTemp.length > 0) {
                    let objectUpdate = {
                        MaRap: parseInt(this.props.maRap),
                        TenLoaiGhe: tenLoaiGhe,
                        DanhSachGheUpdate: mangGheUpdateTemp
                    }
                    console.log(objectUpdate);
                    this.props.capNhatLoaiGhe(objectUpdate);
                }
            }

            if (key == 2) {
                let mangGheUpdate = this.props.dsGheChonUpdate;
                if (mangGheUpdate.length === 0) {
                    showMessageAlert('Warning', 'Vui lòng chọn ghế', 'warning')
                }
                let tenLoaiGhe = 'Thường';
                let mangGheUpdateTemp = [];
                mangGheUpdate.map((ghe, index) => {
                    mangGheUpdateTemp.push({
                        MaGhe: ghe.MaGhe
                    })
                })
                if (mangGheUpdateTemp.length > 0) {
                    let objectUpdate = {
                        MaRap: parseInt(this.props.maRap),
                        TenLoaiGhe: tenLoaiGhe,
                        DanhSachGheUpdate: mangGheUpdateTemp
                    }
                    console.log(objectUpdate);
                    this.props.capNhatLoaiGhe(objectUpdate);
                }
            }
        };

        const menu = (
            <Menu onClick={onClick}>
                <Menu.Item key="1">Vip</Menu.Item>
                <Menu.Item key="2">Thường</Menu.Item>
            </Menu>
        );

        const { ghe, index } = this.props;
        let classTrangThaiGhe = 'ghe ';
        let tenGhe = ghe.STT;
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
                <Dropdown overlay={menu} trigger={['contextMenu']}>
                    <Tooltip title="Click chuột phải để edit ghế">
                        <button id="idghe" onClick={this.chonGhe} className={`${classTrangThaiGhe}`}>
                            {this.state.dangDat ? tenGhe : ''}
                        </button>
                    </Tooltip>
                </Dropdown>
            </Fragment>
        )
    }

    chonGhe = () => {
        //Sau khi setState thay đổi trang thái ghế sẽ đưa dữ liệu lên reducer xử lý
        // if (!this.state.dangChon) {
        this.setState({
            dangDat: !this.state.dangDat
        }, () => {
            const gheDuocChon = {
                MaGhe: this.props.ghe.MaGhe,
                STT: this.props.ghe.STT,
                TenGhe: this.props.ghe.TenGhe,
                DangDat: this.state.dangDat
            }
            this.props.chonGhe(gheDuocChon); //Gọi hàm đưa lên reducer
        })
        // }
    }

    alertMessage = () => {
        console.log("Maximum is 10 tickets!!!");
    }

    render() {
        return (
            <Fragment>
                {this.renderGhe()}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dsGheChonUpdate: state.BookingManageReducer.dsGheChonUpdate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        chonGhe: (gheDuocChon) => {
            dispatch(updateSeatAction(gheDuocChon))
        },
        capNhatLoaiGhe: (mangGheCapNhat) => {
            dispatch(capNhatLoaiGheAction(mangGheCapNhat))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ghe)