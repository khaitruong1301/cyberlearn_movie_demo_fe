import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getGheListAction } from '../../../redux/actions/TheaterSystemManageAction'
import { Spin, Tooltip } from 'antd'
import Ghe from './Ghe'

class GheManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            maRap: this.props.match.params.MaRap,
            danhSachGhe: [],
        }
    }

    componentDidMount() {
        this.props.getGheList(this.state.maRap);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("nextProps", nextProps);
        console.log("prevState", prevState);
        if (nextProps != prevState) {
            return {
                ...prevState, danhSachGhe: nextProps.danhSachGhe
            }
        }
    }

    componentDidUpdate() {
        this.state.danhSachGhe = this.props.danhSachGhe;
    }

    renderDanhSachGhe = () => {
        return this.state.danhSachGhe.map((ds, index) => {
            return (
                <div className="d-flex" key={index}>
                    <span className="tenHang__admin">{ds.TenHang}</span>
                    {
                        ds.DanhSachGheTheoHang.map((ghe, i) => {
                            return (
                                <Ghe className="ghe__admin" maRap={this.state.maRap} ghe={ghe} index={i + 1} tenHang={ghe.TenHang} key={i} />
                            )
                        })
                    }
                </div>
            )
        })
    }

    openModalThemGhe = (maRap) => {
        this.props.history.push('/admin/themghe/' + maRap)
    }

    render() {
        if (this.state.danhSachGhe.length === 0) {
            return (
                <div className="spinner" style={{ textAlign: "center" }}>
                    <Spin></Spin>
                </div>)
        }
        return (
            <div>
                <div style={{textAlign: 'center', backgroundColor: 'orange', padding: '10px 0', fontSize: 16, color: '#ffffff', fontWeight: 600, marginBottom: 20 }}>
                    <span>DANH SÁCH GHẾ CỦA RẠP {this.state.maRap}</span>
                </div>
                <div className="d-flex">

                    <div>
                        {this.renderDanhSachGhe()}
                    </div>
                    <div className="infor__ghe" style={{ color: '#000000', marginLeft: 100 }}>
                        <div >
                            <p className="mr-2">
                                <button className="gheNote"></button>
                                <span>Ghế thường</span>
                            </p>
                            <p className="mr-2">
                                <button className="gheNote gheVip"></button>
                                <span>Ghế VIP</span>
                            </p>
                            <p className="mr-2">
                                <button className="gheNote gheDangDat"></button>
                                <span>Ghế đang chọn</span>
                            </p >
                        </div>
                        <div style={{ marginTop: 10, fontSize: 16 }}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        danhSachGhe: state.TheaterSystemManageReducer.danhSachGhe,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGheList: (maRap) => {
            dispatch(getGheListAction(maRap))
        }
    }
}

export default (withRouter)(connect(mapStateToProps, mapDispatchToProps)(GheManage)) 