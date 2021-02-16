import React, { Component } from 'react'
import { Table, Card, DatePicker, Tag, Icon } from 'antd';
import { Bar } from 'ant-design-pro/lib/Charts';
import moment from 'moment';
import { connect } from 'react-redux';
import { getThongKeSoLuongVeAction, getThongKeSLVeTheoNamAction, getThongKeDoanhThuTheoNamAction, getThongKeDoanhThuAction } from '../../../redux/actions/DashboardAction';
import { isEqual } from 'lodash';

import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";


const { RangePicker, MonthPicker } = DatePicker;
const monthFormat = 'DD/MM/YYYY';

const columns = [
    {
        title: 'Cụm rạp',
        dataIndex: 'TenCumRap',
        key: 'TenCumRap',
        align: 'center'
    },
    {
        title: 'Phim',
        dataIndex: 'MaPhim',
        key: 'MaPhim'+ 'TenCumRap',
        align: 'center'
    },
    {
        title: 'Số lượng ghế',
        dataIndex: 'SoLuongGhe',
        key: 'MaPhim',
        align: 'center'
    },
    {
        title: 'Số Lượng Vé Bán Ra',
        dataIndex: 'SoLuongVeBan',
        key: 'SoLuongVeBan',
        align: 'center'
    }

]

const columnsDT = [
    {
        title: 'Cụm rạp',
        dataIndex: 'MaCumRap',
        key: 'MaLichChieu',
        align: 'center'
    },
    {
        title: 'Mã Phim',
        dataIndex: 'MaPhim',
        key: 'MaPhim'+'MaCumRap',
        align: 'center'
    },
    {
        title: 'Doanh thu (VND)',
        dataIndex: 'DoanhThu',
        key: 'DoanhThu',
        align: 'center',
        render: (DoanhThu) => (
            <span>{DoanhThu.toLocaleString()} </span>
        )
    }

]


const data = [
    {
        year: "1991",
        value: 3
    },
    {
        year: "1992",
        value: 4
    },
    {
        year: "1993",
        value: 3.5
    },
    {
        year: "1994",
        value: 5
    },
    {
        year: "1995",
        value: 4.9
    },
    {
        year: "1996",
        value: 6
    },
    {
        year: "1997",
        value: 7
    },
    {
        year: "1998",
        value: 9
    },
    {
        year: "1999",
        value: 13
    }
];

class StatisticDasboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            maHeThongRap: this.props.match.params.MaHeThongRap,
            danhSachThongKeVe: [],
            initBeginDate: moment().startOf('month').format('YYYY-MM-DD'),
            initEndDate: moment().endOf('month').format('YYYY-MM-DD')
        }
    }

    componentDidMount() {
        // console.log("this.state.maHeThongRap", this.state.maHeThongRap);
        this.initData(this.state.maHeThongRap);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log("nextProps", nextProps);
        // console.log("prevState", prevState);

        if (!isEqual(nextProps.match.params.MaHeThongRap, prevState.maHeThongRap)) {
            return {
                maHeThongRap: nextProps.match.params.MaHeThongRap
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("prevState", prevState);
        console.log("this.state", this.state.maHeThongRap);

        if (JSON.stringify(prevState.maHeThongRap) !== JSON.stringify(this.state.maHeThongRap)) {
            this.initData(this.state.maHeThongRap);
        }
        // console.log("componentDidUpdate");        
    }



    initData(maHeThongRap) {
        this.props.getThongKeSoLuongVe(this.state.initBeginDate, this.state.initEndDate, maHeThongRap);
        this.props.getThongKeSLVeTheoNam(moment(this.state.initBeginDate).format('YYYY'), maHeThongRap);
        this.props.getThongKeDoanhThu(this.state.initBeginDate, this.state.initEndDate, maHeThongRap);
        this.props.getThongKeDoanhThuTheoNam(moment(this.state.initBeginDate).format('YYYY'), maHeThongRap);
    }


    getDSVeWithParams = (thang, nam, maHeThongRap) => {
        this.props.getThongKeSoLuongVe(thang, nam, maHeThongRap);
    }
    
    // Thay đổi ngày thống kê số lượng vé

    handleDatePickerChange = (date, dateString) => {
        console.log('NGAYBD, NGAYKT', date, dateString);
        if (date) {
            let NGAYBD = date[0].format('YYYY-MM-DD');
            let NGAYKT = date[1].format('YYYY-MM-DD');
            console.log('NGAYBD, NGAYKT', NGAYBD, NGAYKT);
            this.props.getThongKeSoLuongVe(NGAYBD, NGAYKT, this.state.maHeThongRap)
        }
    }

    handleDatePickerDTChange= (date, dateString) => {
        console.log('NGAYBD, NGAYKT', date, dateString);
        if (date) {
            let NGAYBD = date[0].format('YYYY-MM-DD');
            let NGAYKT = date[1].format('YYYY-MM-DD');
            console.log('NGAYBD, NGAYKT', NGAYBD, NGAYKT);
            this.props.getThongKeDoanhThu(NGAYBD, NGAYKT, this.state.maHeThongRap)

            // this.getDSVeWithParams(NGAYBD, NGAYKT, this.state.maHeThongRap)
        }
    }

    handleOnChangeYearSLV = (date, dateString) => {
        if (date) {
            let year = date.format('YYYY');
            console.log(year);
            this.props.getThongKeSLVeTheoNam(year, this.state.maHeThongRap)
        }
    }

    handleOnChangeYearDoanhThu = (date, dateString) => {
        if (date) {
            let year = date.format('YYYY');
            console.log(year);
            this.props.getThongKeDoanhThuTheoNam(year, this.state.maHeThongRap)
        }
    }

    render() {
        // Mức biểu đồ
        const cols = {
            SoLuongVeBan: {
                tickInterval: 20
            }
        };

        const dataFake = [
            {
                Thang: 1,
                SoLuongVeBan: 120
            },
            {
                Thang: 2,
                SoLuongVeBan: 20
            },
            {
                Thang: 3,
                SoLuongVeBan: 30
            },
            {
                Thang: 4,
                SoLuongVeBan: 20
            },
            {
                Thang: 5,
                SoLuongVeBan: 20
            },
            {
                Thang: 6,
                SoLuongVeBan: 220
            },
            {
                Thang: 7,
                SoLuongVeBan: 40
            },
            {
                Thang: 8,
                SoLuongVeBan: 20
            },
            {
                Thang: 9,
                SoLuongVeBan: 20
            },
            {
                Thang: 10,
                SoLuongVeBan: 20
            },
            {
                Thang: 11,
                SoLuongVeBan: 20
            },
            {
                Thang: 12,
                SoLuongVeBan: 20
            },
        ]

        return (
            <div>
                {/* <Tag color="orange" style={{ fontSize: "24px", marginBottom: "20px", padding: "10px 40px" }}>{this.state.maHeThongRap}</Tag> */}
                {/* Doanh thu */}
                <div className="chart__content">
                    <div style={{ width: "58%" }}>
                        <Card type="inner" title="Biểu đồ số lượng vé bán" >
                            <div className="year__content">
                                Choose year &nbsp;&nbsp;<MonthPicker defaultValue={moment(this.state.initBeginDate, 'YYYY')} placeholder="Select year" onChange={this.handleOnChangeYearSLV}/>
                            </div>
                            <Chart height={400} data={this.props.dsThongKeVeTheoNam} scale={cols} forceFit>
                                <Axis title name="Thang" />
                                <Axis title name="SoLuongVeBan" />
                                <Tooltip
                                    crosshairs={{
                                        type: "y"
                                    }}
                                />
                                <Geom type="interval" position="Thang*SoLuongVeBan"/>
                            </Chart>
                        </Card>
                    </div>
                    <div style={{ width: "40%" }}>
                        <Card type="inner" title="Thống kê doanh thu / tháng (VND)">
                            <div className="year__content">
                                Choose year &nbsp;&nbsp;<MonthPicker defaultValue={moment(this.state.initBeginDate, 'YYYY')} onChange={this.handleOnChangeYearDoanhThu} placeholder="Select year" />
                            </div>
                            <Chart height={400} data={this.props.dsThongKeDoanhThuTheoNam} scale={cols} forceFit>
                                <Axis name="Thang" />
                                <Axis name="DoanhThu" />
                                <Tooltip
                                    crosshairs={{
                                        type: "y"
                                    }}
                                />
                                <Geom type="line" position="Thang*DoanhThu" size={2} />
                                <Geom
                                    type="point"
                                    position="Thang*DoanhThu"
                                    size={4}
                                    shape={"circle"}
                                    style={{
                                        stroke: "#fff",
                                        lineWidth: 1
                                    }}
                                />
                            </Chart>
                        </Card>
                    </div>
                </div>
                {/* Danh sách số lượng vé bán theo cụm rạp */}
                <div className="mt-5">
                    <Card type="inner" title="Số lượng vé bán " >
                        Date Range: <RangePicker defaultValue={[moment(this.state.initBeginDate), moment(this.state.initEndDate)]} onChange={this.handleDatePickerChange} format={monthFormat} />
                        <br /> <br />
                        <Table bordered rowKey={record => record.MaPhim + record.TenCumRap} columns={columns} dataSource={this.props.danhSachThongKeVe} />
                    </Card>
                </div>
                <div className="mt-5">
                    <Card type="inner" title="Doanh thu" >
                        Date Range: <RangePicker defaultValue={[moment(this.state.initBeginDate), moment(this.state.initEndDate)]} onChange={this.handleDatePickerDTChange} format={monthFormat} />
                        <br /> <br />
                        <Table bordered rowKey={record => record.MaPhim + record.MaCumRap} columns={columnsDT} dataSource={this.props.dsThongKeDoanhThu} />
                    </Card>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        danhSachThongKeVe: state.DashboardReducer.danhSachThongKeVe,
        dsThongKeVeTheoNam: state.DashboardReducer.dsThongKeVeTheoNam,
        dsThongKeDoanhThuTheoNam: state.DashboardReducer.dsThongKeDoanhThuTheoNam,
        dsThongKeDoanhThu: state.DashboardReducer.dsThongKeDoanhThu,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getThongKeSoLuongVe: (beginDate, endDate, maHeThongRap) => {
            dispatch(getThongKeSoLuongVeAction(beginDate, endDate, maHeThongRap))
        },
        getThongKeSLVeTheoNam: (nam, maHeThongRap) => {
            dispatch(getThongKeSLVeTheoNamAction(nam, maHeThongRap))
        },
        getThongKeDoanhThuTheoNam: (nam, maHeThongRap) => {
            dispatch(getThongKeDoanhThuTheoNamAction(nam, maHeThongRap))
        },
        getThongKeDoanhThu: (beginDate, endDate, maHeThongRap) => {
            dispatch(getThongKeDoanhThuAction(beginDate, endDate, maHeThongRap))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(StatisticDasboard)
