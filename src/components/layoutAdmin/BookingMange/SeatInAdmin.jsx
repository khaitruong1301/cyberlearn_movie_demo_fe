import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { bookingSeatAction, chonGheAdminAction } from '../../../redux/actions/BookingManageAction';
import { isEqual } from 'lodash';
import { Menu, Dropdown } from 'antd';
import { element } from 'prop-types';
import { showMessageAlert } from '../../../templates/SweetAlert';


class SeatInAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dangChon: false
        }
    }

    handleOnChange = () => {
        this.setState({
            dangChon: false
        })
    }



    renderGhe = () => {
        const onClick = ({ key }) => {
            alert(`Click on item ${key}`);
        };

        const menu = (
            <Menu onClick={onClick}>
                <Menu.Item key="1">1st menu item</Menu.Item>
                <Menu.Item key="2">2nd memu item</Menu.Item>
                <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        );

        const { ghe, index } = this.props;
        let classTrangThaiGhe = 'ghe ';
        // let disabled = ghe.DaDat ? true : false;
        // let tenGhe = ghe.DaDat ? 'X' : ghe.STT;
        let tenGhe = ghe.STT;

        if (ghe.DaDat) {
            classTrangThaiGhe += ghe.DaDat ? 'gheDaDat ' : ' ';
        } else {
            if (this.state.dangChon ) {
                classTrangThaiGhe += 'gheDangDat ';
            } else {
                classTrangThaiGhe += ghe.LoaiGhe === 'Thường' ? 'ghe ' : ghe.LoaiGhe === 'Vip' ? 'gheVip ' : 'gheDoi';
            }
        }

        return (
            <Fragment>
                <Dropdown overlay={menu} trigger={['contextMenu']}>
                    <button id="idghe"  onClick={this.chonGhe} className={`${classTrangThaiGhe}`}>
                        {this.state.dangChon ? tenGhe : ''}
                    </button>
                </Dropdown>
            </Fragment>
        )
    }

    chonGhe = () => {
        //Sau khi setState thay đổi trang thái ghế sẽ đưa dữ liệu lên reducer xử lý
        if (!this.state.dangChon) {
            this.setState({
                dangChon: !this.state.dangChon
            }, () => {
                const gheDuocChon = this.props.ghe;
                this.props.chonGheAdmin(gheDuocChon); //Gọi hàm đưa lên reducer
            })
        }
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
        danhSachGheDaDat: state.BookingManageReducer.danhSachGheDaDat,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        chonGheAdmin: (gheDuocChon) => {
            dispatch(chonGheAdminAction(gheDuocChon))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeatInAdmin)