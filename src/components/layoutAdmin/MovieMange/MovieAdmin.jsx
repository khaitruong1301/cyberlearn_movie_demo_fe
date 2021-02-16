import React, { Component } from 'react'
import { getMovieListAction, deleteMovieAction } from '../../../redux/actions/MovieManageAction';
// CONNECT REDUX
import { connect } from 'react-redux';
import { Button, Table, Modal, message, Checkbox, Icon, Dropdown, Menu, Form, Input, DatePicker, TimePicker, Spin, Select } from 'antd';
import { compose } from 'redux';
import { createLichChieuAction } from '../../../redux/actions/BookingManageAction';
import { LichChieu } from '../../../redux/models/LichChieu';
import moment from 'moment'
import { getHeThongRapListAction, getCumRapListAction } from '../../../redux/actions/TheaterSystemManageAction';
import { disabledDate } from '../../../common/common';


const { Option } = Select;

const { confirm } = Modal;
message.config({
    top: 100,
    duration: 2
});
const dateFormat = "DD/MM/YYYY";

class MovieAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            maPhim: 0,
            lichChieu: LichChieu,
            movieArray: [],
            dsCumRap: [],
            dsRap: []
        }
    }

    componentDidMount() {
        this.props.getMovieList();
    }

    // componentDidUpdate() {
    //     // window.location.reload();
    // }

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log("nextProps", nextProps);
        // console.log("prevState", prevState);
        return {
            ...prevState, movieArray: nextProps.movieArray, dsCumRap: nextProps.cumRapInfor
        }
    }

    showDeleteConfirm = async (maPhim) => {
        confirm({
            title: 'Are you sure delete this task?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                await this.props.deleteMovie(maPhim);
                // setTimeout(() => {
                //     if (this.props.deleteResult.Content === 'Phim đã xếp lịch chiếu không thể xóa!' || this.props.deleteResult.Content === 'Mã phim không hợp lệ!') {
                //         message.warning(this.props.deleteResult.Content);
                //     }
                //     else{
                //         // message.success(this.props.deleteResult);
                //         // window.location.reload();
                //     }
                // }, 1000);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    handleReloadMovieList = (e) => {
        e.preventDefault();
        window.location.reload();
    }

    handleEditMovie = (maPhim) => {
        console.log("movie", maPhim);
        this.props.history.push(`/admin/movieadmin/formMovieAction/` + maPhim);
    }

    handleAddMovie = () => {
        // e.preventDefault();
        this.props.history.push('/admin/movieadmin/formMovieAction/addMovie');
    }

    openFormThemLichChieu = () => {
        // console.log(maPhim);
        this.setState({
            visible: true,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            else {
                const finalValues = {
                    ...values,
                    'NgayChieu': values['NgayChieu'].format('YYYY-MM-DD'),
                    'GioChieu': values['GioChieu'].format('hh:mm'),
                };
                let lichChieu = {
                    MaPhim: finalValues.MaPhim,
                    NgayChieuGioChieu: finalValues.NgayChieu + ' ' + finalValues.GioChieu,
                    MaRap: finalValues.MaRap,
                    GiaVe: finalValues.GiaVe
                }
                console.log("LC", lichChieu);

                this.props.createLichChieu(lichChieu);
                // setTimeout(() => {
                //     if (this.props.createLCResult === "Thêm lịch chiếu thành công !") {
                //         message.success(this.props.createLCResult);
                //         this.handleCancel();
                //     }
                //     else {
                //         message.warning(this.props.createLCResult.Content);
                //     }
                // }, 1000);
            }
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.props.form.resetFields();
    }

    // onchange trong form lịch chiếu
    handleOnChangeHTRLC = (maHeThongRap) => {
        console.log("Mã hệ thống rạp", maHeThongRap)
        this.props.getCumRapList(maHeThongRap);
    }

    handleOnChangeCumRapLC = (maCumRap) => {
        this.state.dsCumRap.map((cumRap, i) => {
            if (cumRap.MaCumRap === maCumRap){
                this.setState({
                    dsRap: cumRap.DanhSachRap
                })
            }
        })
    }
    // End thêm lịch chiếu

    render() {

        // const showDeleteConfirm = ({params,callBackSuccess,callBackFailure}) => {
        //     confirm({
        //         title: 'Are you sure delete this task?',
        //         content: 'Some descriptions',
        //         okText: 'Yes',
        //         okType: 'danger',
        //         cancelText: 'No',
        //         onOk : ()=> {
        //             let result = this.props.deleteMovie(maPhim);
        //             console.log("result", result);
        //             callBackSuccess()

        //             if (result === 'Mã phim không hợp lệ!') {
        //             }
        //         },
        //         onCancel() {
        //             console.log('Cancel');
        //         },
        //     });
        // }
        const menu = (
            <Menu>
                <Menu.Item key="1">
                    <span className="span__title__icon">
                        <Icon type="calendar" />
                        <span onClick={() => this.openFormThemLichChieu()}>Thêm Lịch Chiếu</span>
                    </span>
                </Menu.Item>
            </Menu>
        );

        const columns = [
            {
                title: 'Mã Phim',
                width: 150,
                dataIndex: 'MaPhim',
                key: 'MaPhim',
                fixed: 'left',
                sorter: (a, b) => a.MaPhim - b.MaPhim,
                defaultSortOrder: ['descend'],
                align: 'center'
            },
            {
                title: 'Tên Phim',
                width: 150,
                dataIndex: 'TenPhim',
                key: 'tenPhim',
                fixed: 'left',
                sorter: (a, b) => a.TenPhim - b.TenPhim,
                defaultSortOrder: ['descend'],
                align: 'center'
            },
            {
                title: 'Hình Ảnh',
                dataIndex: 'HinhAnh',
                key: 'hinhAnh',
                width: 150,
                align: 'center',
                render: (hinhAnh) => <img src={hinhAnh} style={{height: "180px", width:"120px"}}/>
            },
            {
                title: 'Trailer',
                dataIndex: 'Trailer',
                key: 'trailer',
                width: 150,
                align: 'center'
            },
            {
                title: 'Mô Tả',
                dataIndex: 'MoTa',
                key: 'moTa',
                width: 550,
                align: 'center'
            },
            {
                title: 'Ngày Khởi Chiếu',
                dataIndex: 'NgayKhoiChieu',
                key: 'ngayKhoiChieu',
                width: 300,
                align: 'center'
            },
            {
                title: 'Đánh Giá',
                dataIndex: 'DanhGia',
                key: 'danhGia',
                width: 150,
                align: 'center'
            },
            {
                title: 'Đạo Diễn',
                dataIndex: 'DaoDien',
                key: 'daoDien',
                width: 150,
                align: 'center'
            },
            {
                title: 'Diễn Viên',
                dataIndex: 'DienVien',
                key: 'dienVien',
                width: 150,
                align: 'center'
            },
            {
                title: 'Độ Tuổi',
                dataIndex: 'DoTuoi',
                key: 'doTuoi',
                width: 150,
                align: 'center',
                render: (DoTuoi) => (
                    <div>
                        <span>{DoTuoi}</span>
                    </div>
                ),
            },
            {
                title: 'Bí Danh',
                dataIndex: 'BiDanh',
                key: 'BiDanh',
                width: 150,
                align: 'center'
            },
            {
                title: 'Khởi Chiếu',
                dataIndex: 'KhoiChieu',
                key: 'KhoiChieu',
                width: 150,
                align: 'center',
                render: (KhoiChieu) => (
                    <div>
                        <Checkbox checked={KhoiChieu} disabled />
                    </div>
                ),
            },
            {
                title: 'Sắp Chiếu',
                dataIndex: 'SapChieu',
                key: 'SapChieu',
                width: 150,
                align: 'center',
                render: (SapChieu) => (
                    <div className="text-center">
                        <Checkbox checked={SapChieu} disabled />
                    </div>
                ),
            },
            {
                title: 'Đã Xóa',
                dataIndex: 'DaXoa',
                key: 'DaXoa',
                width: 150,
                align: 'center',
                render: (DaXoa) => (
                    <div >
                        <Checkbox checked={DaXoa} disabled />
                    </div>
                ),
            },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 150,
                align: 'center',
                render: (movie) => (
                    <div className="d-flex ">
                        <Button className="button__title__icon mr-2" type="primary" icon="edit" size={"small"} onClick={() => this.handleEditMovie(movie.MaPhim)
                        } > Edit </Button>
                        <Button className="button__title__icon mr-2" disabled={movie.DaXoa} type="danger" icon="delete" size={"small"} onClick={() => { this.showDeleteConfirm(movie.MaPhim) }}> Xóa </Button>
                        {/* </Popconfirm> */}
                        {
                            movie.DaXoa ? "" :
                            <Dropdown overlay={menu} trigger={['click']} onClick={() => {
                                this.setState({
                                    maPhim: movie.MaPhim
                                });
                            }}>
                                <a ><Icon type="down" /></a>
                                {/* <Button className="button__title__icon" icon="down" size={"small"}></Button> */}
                            </Dropdown>
                        }
                    </div>
                ),
            },
        ];

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 16 },
        };

        const movieArray = this.state.movieArray;
        // console.log("movieArray", movieArray);
        if (this.state.movieArray.length === 0) {
            return (
                <div className="spinner" style={{ textAlign: "center" }}>
                    <Spin size="large"></Spin>
                </div>)
        }
        
        return (
            <div>
                {/* <Spin spinning={true} delay={500}></Spin> */}
                <div className="btn__Add mb-4 d-flex justify-content-between">
                    <Button className="button__title__icon" icon="plus" type="primary" onClick={() => this.handleAddMovie()}>Thêm Phim</Button>
                    <Icon style={{ fontSize: 25 }} type="reload" onClick={(e) => this.handleReloadMovieList(e)} />
                </div>
                <Table id="somePrefix" rowKey={record => record.MaPhim} columns={columns} dataSource={this.props.movieArray} scroll={{ x: 'max-content'}}  bordered center  pagination={{defaultPageSize: 3}}/>
                <Modal
                    title="Thêm lịch chiếu"
                    visible={this.state.visible}
                    // onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item {...formItemLayout} label="Mã Phim">
                            {getFieldDecorator('MaPhim', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy nhập ngày chiếu phim !',
                                    },
                                ],
                                initialValue: this.state.maPhim,
                            })
                                (<Input disabled />)}
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
                            })(<DatePicker format={dateFormat} disabledDate={disabledDate}/>)}
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
                        <Form.Item {...formItemLayout} label="Hệ thống rạp" >
                            {getFieldDecorator('MaHeThongRap', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy chọn hệ thống rạp !',
                                    },
                                ]
                            })(
                                <Select placeholder="Chọn hệ thống rạp" onChange={this.handleOnChangeHTRLC}>
                                    {
                                        this.props.HTRArray.map((HTR, i) => {
                                            return (
                                                <Option key={i} value={HTR.MaHeThongRap}>{HTR.TenHeThongRap}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Cụm Rạp" >
                            {getFieldDecorator('MaCumRap', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy chọn mã cụm rạp !',
                                    },
                                ],
                                // initialValue: this.state.dsCumRap,
                            })(
                                <Select placeholder="Chọn cụm rạp" onChange={this.handleOnChangeCumRapLC}>
                                    {
                                        this.state.dsCumRap.map((cumRap, i) => {
                                            return (
                                                <Option key={i} value={cumRap.MaCumRap}>{cumRap.TenCumRap}</Option>
                                            )
                                        })
                                    }
                                </Select>
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
                                // initialValue: this.state.dsCumRap,
                            })(
                                <Select placeholder="Chọn rạp">
                                    {
                                        this.state.dsRap.map((rap, i) => {
                                            return (
                                                <Option key={i} value={rap.MaRap}>{rap.TenRap}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Giá Vé" >
                            {getFieldDecorator('GiaVe', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy nhập giá vé !',
                                    },
                                ],
                                // initialValue: this.state.maPhim ? moment(movie.NgayKhoiChieu, dateFormat) : moment(undefined),
                            })(<Input />)}
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
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        movieArray: state.MovieManageReducer.movieArray,
        deleteResult: state.MovieManageReducer.deleteResult,
        createLCResult: state.BookingManageReducer.createLCResult,
        HTRArray: state.TheaterSystemManageReducer.HTRArray,
        cumRapInfor: state.TheaterSystemManageReducer.cumRapInfor,
        rapArray: state.TheaterSystemManageReducer.rapArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMovieList: () => {
            dispatch(getMovieListAction())
        },
        deleteMovie: (maPhim) => {
            dispatch(deleteMovieAction(maPhim))
        },
        createLichChieu: (lichChieu) => {
            dispatch(createLichChieuAction(lichChieu))
        },
        getHeThongRapList: () => {
            dispatch(getHeThongRapListAction())
        },
        getCumRapList: (maHeThongRap) => {
            dispatch(getCumRapListAction(maHeThongRap))
        }
    }
}

export default compose(Form.create(), connect(mapStateToProps, mapDispatchToProps))(MovieAdmin)