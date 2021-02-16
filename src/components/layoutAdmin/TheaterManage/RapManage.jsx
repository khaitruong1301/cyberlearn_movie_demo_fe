import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getRapListAction } from '../../../redux/actions/TheaterSystemManageAction'

import moment from 'moment'
import { Tag, Button, Table, Modal, message, Checkbox, Icon, Dropdown, Menu, Form, Input, DatePicker, TimePicker, Spin, Select } from 'antd';
import { compose } from 'redux';
import { disabledDate } from '../../../common/common';
import { getMovieListAction } from '../../../redux/actions/MovieManageAction'
import { createLichChieuAction } from '../../../redux/actions/BookingManageAction'

const { Option } = Select;
const dateFormat = "DD/MM/YYYY";

class RapManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            maCumRap: this.props.match.params.MaCumRap,
            visible: false,
            maRapCurrent: 0,
            giaVeDaGiam: 0,
            giaVeThuc: 0,
            mucGiamGia: 0
        }
    }

    componentDidMount() {
        this.props.getRapList(this.state.maCumRap);
        this.props.getMovieList();
    }

    openModalThemGhe = (maRap) => {
        this.props.history.push('/admin/themghe/' + maRap)
    }

    openModalThemLichChieu = (record) => {
        this.setState({
            visible: true,
            maRapCurrent: record.MaRap
        })
    }

    menu = (record) => (
        <Menu >
            <Menu.Item key="1">
                <span className="span__title__icon">
                    <Icon type="unordered-list" />
                    <span onClick={() => this.openModalThemGhe(record.MaRap)}>Thêm danh sách ghế</span>
                </span>
            </Menu.Item>

            {record.SoGhe > 0 ?
                <Menu.Item key="2">
                    <span className="span__title__icon">
                        <Icon type="clock-circle" />
                        <span onClick={() => this.openModalThemLichChieu(record)}>Thêm lịch chiếu</span>
                    </span>
                </Menu.Item>
                : ''
            }
        </Menu>
    );

    columns = [
        {
            title: 'MÃ RẠP',
            dataIndex: 'MaRap',
            align: 'center'
        },
        {
            title: 'TÊN RẠP',
            dataIndex: 'TenRap',
            align: 'center'
        },
        {
            title: 'SỐ GHẾ',
            dataIndex: 'SoGhe',
            align: 'center',
            render: (SoGhe) => (
                <div className="d-flex justify-content-center">
                    {SoGhe === 0 ? <span>Chưa có DS ghế</span> : <span>{SoGhe}</span>}
                </div>
            )
        },
        {
            title: 'Action',
            key: 'operation',
            width: 100,
            align: 'center',
            render: (record) => (
                <div className="d-flex justify-content-center">
                    {/* </Popconfirm> */}
                    <Dropdown overlay={this.menu(record)}>
                        <a ><Tag color="#f50">More</Tag><Icon type="down" /></a>
                        {/* <Button className="button__title__icon" icon="down" size={"small"}></Button> */}
                    </Dropdown>
                </div>
            ),
        },
    ];

    handleSubmitTaoLC = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            else {
                const finalValues = {
                    ...values,
                    'NgayChieu': values['NgayChieu'].format('YYYY-MM-DD'),
                    'GioChieu': values['GioChieu'].format('HH:mm'),
                };
                let objectLichChieu = {
                    MaPhim: finalValues.MaPhim,
                    NgayChieuGioChieu: finalValues.NgayChieu + ' ' + finalValues.GioChieu,
                    MaRap: finalValues.MaRap,
                    GiaVe: finalValues.GiaVe,
                    GiamGia: parseInt(finalValues.GiamGia)
                }
                if (objectLichChieu) {
                    this.props.createLichChieu(objectLichChieu);
                }
                console.log("LC", objectLichChieu);
            }
        });
    }

    handleOnChangeGiaVe = (e) => {
        console.log('giaVeThuc', e.target.value);
        this.setState({
            giaVeThuc: e.target.value
        })
    }

    handleOnChangeGiamGia = (GiamGia) => {
        console.log('mucGiamGia', GiamGia);
        this.setState({
            mucGiamGia: GiamGia / 100
        })
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 16 },
        };
        return (
            <div>
                <Table
                    onRow={(record, rowIndex) => {
                        return {
                            onDoubleClick: event => { this.props.history.push('/admin/ghemanage/' + record.MaRap) }, // double click row                      
                        };
                    }}
                    title={() => 'DANH SÁCH CÁC RẠP CỦA CỤM RẠP ' + this.props.thongTinCumRap.TenCumRap} rowKey={record => record.MaRap} columns={this.columns} dataSource={this.props.danhSachRap} size="middle" bordered />
                <Modal
                    title="Thêm lịch chiếu"
                    visible={this.state.visible}
                    // onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form {...formItemLayout} onSubmit={this.handleSubmitTaoLC}>
                        <Form.Item {...formItemLayout} label="Mã Phim">
                            {getFieldDecorator('MaPhim', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy nhập ngày chiếu phim !',
                                    },
                                ]
                            })(
                                <Select placeholder="Chọn phim">
                                    {
                                        this.props.movieArray.map((movie, i) => {
                                            if (!movie.DaXoa && movie.KhoiChieu) {
                                                return (
                                                    <Option key={i} value={movie.MaPhim}>{movie.TenPhim}</Option>
                                                )
                                            }
                                        })
                                    }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Ngày Chiếu" >
                            {getFieldDecorator('NgayChieu', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy nhập ngày chiếu phim !',
                                    },
                                ],
                                initialValue: moment(moment(), dateFormat)
                            })(<DatePicker format={dateFormat} disabledDate={disabledDate} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Giờ Chiếu" >
                            {getFieldDecorator('GioChieu', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy nhập giờ chiếu phim !',
                                    },
                                ],
                                // initialValue: this.state.maPhim ? moment(movie.NgayKhoiChieu, dateFormat) : moment(undefined),
                            })(<TimePicker />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Cụm Rạp" >
                            {getFieldDecorator('MaCumRap', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy chọn mã cụm rạp !',
                                    },
                                ],
                                initialValue: this.state.maCumRap,
                            })(
                                <Input disabled></Input>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Rạp" >
                            {getFieldDecorator('MaRap', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy chọn rạp !',
                                    },
                                ],
                                initialValue: this.state.maRapCurrent,
                            })(
                                <Input disabled></Input>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Giá Vé Ban Đầu" >
                            {getFieldDecorator('GiaVeThuc', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy nhập giá vé!',
                                    },
                                ],
                                // initialValue: this.state.maPhim ? moment(movie.NgayKhoiChieu, dateFormat) : moment(undefined),
                            })(<Input onChange={this.handleOnChangeGiaVe} />)}
                        </Form.Item>

                        <Form.Item {...formItemLayout} label="Giảm giá" >
                            {getFieldDecorator('GiamGia', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy nhập mức giảm giá!',
                                    },
                                ],
                                initialValue: 0
                            })(
                                <Select onChange={this.handleOnChangeGiamGia}>
                                    <Option value="0">0%</Option>
                                    <Option value="5">5%</Option>
                                    <Option value="10">10%</Option>
                                    <Option value="15">15%</Option>
                                    <Option value="20">20%</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Giá Vé Đã Giảm" >
                            {getFieldDecorator('GiaVe', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy nhập giá vé !',
                                    },
                                ],
                                initialValue: this.state.giaVeThuc - this.state.giaVeThuc * this.state.mucGiamGia,
                            })(<Input disabled />)}
                        </Form.Item>
                        <div className="text-center">
                            <Button className="mr-4" type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button type="primary" htmlType="submit" onClick={() => this.handleCancel()}>
                                Hủy
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        danhSachRap: state.TheaterSystemManageReducer.danhSachRap,
        thongTinCumRap: state.TheaterSystemManageReducer.thongTinCumRap,
        movieArray: state.MovieManageReducer.movieArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRapList: (maCumRap) => {
            dispatch(getRapListAction(maCumRap))
        },
        getMovieList: () => {
            dispatch(getMovieListAction())
        },
        createLichChieu: (lichChieu) => {
            dispatch(createLichChieuAction(lichChieu))
        },
    }
}

export default (withRouter)(compose(Form.create(), connect(mapStateToProps, mapDispatchToProps))(RapManage));