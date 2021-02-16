import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Checkbox, Form, Input, InputNumber, Button, DatePicker, Row, Col, Upload, Icon } from 'antd' // Popconfirm, Icon
import moment from 'moment';
import { compose } from 'redux';
// Redux
import { getMovieDetailAction, updateMovieAction, createMovieAction, UploadHinhAnhAction } from '../../../redux/actions/MovieManageAction';
import { isEqual } from 'lodash';

const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";
const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};

class FormMovieAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            maPhim: this.props.match.params.MaPhim,
            movieInfor: {
                MaPhim: "",
                TenPhim: "",
                BiDanh: "",
                Trailer: "",
                HinhAnh: "",
                MoTa: "",
                NgayKhoiChieu: "",
                DanhGia: "",
                DienVien: "",
                DaoDien: "",
                DoTuoi: "",
                DaXoa: false,
                KhoiChieu: false,
                SapChieu: false,
            },
            selectedFile: null,
            selectedFileList: []
        }
    }

    componentDidMount() {
        console.log(this.state.maPhim);
        if (this.state.maPhim) {
            this.props.getMovieDetail(this.state.maPhim);
        }
    }


    // componentWillReceiveProps(nextProps) {
    //     // console.log("nextProps", nextProps);        
    //     if (!isEqual(nextProps.movieInfor.MaPhim, this.state.MaPhim)) {
    //         this.setState({ ...this.state, movieInfor: nextProps.movieInfor });
    //     }
    // }

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log("nextProps", nextProps);
        // console.log("prevState", prevState);
        if (prevState.maPhim) {
            if (!isEqual(nextProps.movieInfor.MaPhim, prevState.MaPhim)) {
                return {
                    ...prevState, movieInfor: nextProps.movieInfor
                }
            }
        }
        return null;
    }

    // componentWillReceiveProps(nextProps,nextState){
    //     console.log(nextProps);
    //     //Nay het xai dc roi
    //     this.setState({
    //         movieInfor: nextProps.movieInfor      
    //     },() => {
    //         console.log("setState", this.state.movieInfor);
    //     })

    // }
    uploadHinhAnh = (tenPhim, fileHinhAnh) => {
        var formData = new FormData();
        formData.set('tenPhim', tenPhim);
        formData.append('file', fileHinhAnh.originFileObj);
        this.props.uploadHinhAnh(formData);
    }

    handleChange(field, e) {
        const movieInfor = Object.assign({}, this.state.movieInfor, { [field]: e.target.value });
        this.setState(Object.assign({}, this.state, { movieInfor }));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            var hinhAnh = values['HinhAnh'];
            let hinhAnhFinal;
            let fileHinhAnh;
            hinhAnh.map((img, i) => {
                console.log(img);
                
                if (i === 0) {
                    hinhAnhFinal = img.name;
                    fileHinhAnh = img;
                }
            })
            if (this.state.maPhim) {
                const updateValues = {
                    ...values,
                    'HinhAnh': hinhAnhFinal,
                    'NgayKhoiChieu': values['NgayKhoiChieu'].format('DD/MM/YYYY'),
                };
                this.props.updateMovie(updateValues);
                setTimeout(() => {
                    if (this.props.updateResult === "Cập nhật phim thành công!"){
                        this.uploadHinhAnh(updateValues.TenPhim, fileHinhAnh)
                    }
                }, 3000);
                // this.props.history.push('/movieadmin');
            } else {
                const createValues = {
                    ...values,
                    'HinhAnh': hinhAnhFinal,
                    'NgayKhoiChieu': values['NgayKhoiChieu'].format('YYYY-MM-DD'),
                };
                console.log("createValues", createValues);                
                this.props.createMovie(createValues);
                setTimeout(() => {
                    if (this.props.createResult === "Thêm phim thành công!"){
                        this.uploadHinhAnh(createValues.TenPhim, fileHinhAnh)
                    }
                }, 3000);
            }
        });
    }

    normFile = e => {
        console.log("Upload event:", e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    cutString = (string) => {
        var NewText = string.replace("https://localhost:44350/HinhAnh/", "");
        return NewText;
    }


    render() {
        const movie = this.state.movieInfor;
        // console.log("movie", movie);    

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <div >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayout} label="Mã Phim">
                        {getFieldDecorator('MaPhim', {
                            rules: [
                                {
                                    required: false,
                                    message: 'Hãy nhập tên phim !',
                                },
                            ],
                            initialValue: movie.MaPhim,
                        })(<Input disabled />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Tên Phim">
                        {getFieldDecorator('TenPhim', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Hãy nhập tên phim !',
                                },
                            ],
                            onChange: this.handleChange.bind(this, 'TenPhim'),
                            initialValue: movie.TenPhim,
                        })(<Input placeholder="Hãy nhập tên phim" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Trailer">
                        {getFieldDecorator('Trailer', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Hãy nhập trailer !',
                                },
                            ],
                            initialValue: movie.Trailer,
                        })(<Input placeholder="Hãy nhập trailer" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Hình Ảnh">
                        {getFieldDecorator('HinhAnh', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Hãy nhập URL hình ảnh !',
                                },
                            ],
                            valuePropName: "fileList",
                            getValueFromEvent: this.normFile,
                            initialValue: movie.MaPhim ? [
                                {
                                    uid: "-1",
                                    name: this.cutString(movie.HinhAnh),
                                    status: "done",
                                    url: movie.HinhAnh
                                }
                            ] : null,
                        })(
                            <Upload
                                beforeUpload={() => {
                                    return false;
                                }}
                                customRequest={dummyRequest}
                                listType="picture"
                            >
                                <Button>
                                    <Icon type="upload" /> Upload
                                </Button>
                                {/* <pre>{JSON.stringify(this.state.selectedFile, null, 2)}</pre> */}
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Mô Tả">
                        {getFieldDecorator('MoTa', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Hãy nhập mô tả cho phim !',
                                },
                            ],
                            initialValue: movie.MoTa,
                        })(<TextArea
                            placeholder="Nhập nội dung"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />)}
                    </Form.Item>
                    <div className="d-flex" style={{ marginLeft: 185 }}>
                        <Form.Item label="Ngày Khởi Chiếu" style={{ width: 500 }} >
                            {getFieldDecorator('NgayKhoiChieu', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy nhập ngày khởi chiếu phim !',
                                    },
                                ],
                                initialValue: this.state.maPhim ? moment(movie.NgayKhoiChieu, dateFormat) : moment(undefined),
                            })(<DatePicker format={dateFormat} />)}
                        </Form.Item>
                        <Form.Item label="Đánh Giá" style={{ width: 400 }}>
                            {getFieldDecorator('DanhGia', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Hãy nhập đánh giá !',
                                    },
                                ],
                                initialValue: movie.DanhGia,
                            })(<InputNumber min={0} max={10} step={0.1} placeholder="Hãy nhập đánh giá phim" />)}
                        </Form.Item>
                    </div>
                    <Form.Item {...formItemLayout} label="Đạo Diễn">
                        {getFieldDecorator('DaoDien', {
                            rules: [
                                {
                                    required: false,
                                    message: 'Hãy nhập tên đạo diễn !',
                                },
                            ],
                            initialValue: movie.DaoDien,
                        })(<Input placeholder="Hãy nhập tên đạo diễn" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Diễn Viên">
                        {getFieldDecorator('DienVien', {
                            rules: [
                                {
                                    required: false,
                                    message: 'Hãy nhập các diễn viên trong phim !',
                                },
                            ],
                            initialValue: movie.DienVien,
                        })(<TextArea
                            placeholder="Nhập nội dung"
                            autoSize={{ minRows: 2, maxRows: 5 }}
                        />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Độ Tuổi">
                        {getFieldDecorator('DoTuoi', {
                            rules: [
                                {
                                    required: false,
                                    message: 'Hãy nhập tuổi cho phép !',
                                },
                            ],
                            initialValue: movie.DoTuoi,
                        })(<Input placeholder="Hãy nhập giới hạn tuổi cho phép" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Bí Danh">
                        {getFieldDecorator('BiDanh', {
                            rules: [
                                {
                                    required: false,
                                    message: 'Hãy nhập bí danh !',
                                },
                            ],
                            initialValue: movie.BiDanh,
                        })(<Input placeholder="Bí Danh" />)}
                    </Form.Item>
                    <Row type="flex" justify="center" style={{ marginLeft: 220 }}>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label="Xóa">
                                {getFieldDecorator('DaXoa', {
                                    initialValue: movie.DaXoa,
                                    valuePropName: 'checked'
                                })(<Checkbox></Checkbox>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label="Đang Chiếu">
                                {getFieldDecorator('KhoiChieu', {
                                    initialValue: movie.KhoiChieu,
                                    valuePropName: 'checked'
                                })(<Checkbox></Checkbox>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label="Sắp Chiếu">
                                {getFieldDecorator('SapChieu', {
                                    initialValue: movie.SapChieu,
                                    valuePropName: 'checked'
                                })(<Checkbox></Checkbox>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="btn__formMovie text-center">
                        <Button style={{ marginRight: 20, width: 150 }} type="primary" htmlType="submit">{this.state.maPhim ? 'Update' : 'Create'}</Button>
                        <Button style={{ marginLeft: 20, width: 150 }} type="default" htmlType="button" >Hủy</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movieInfor: state.MovieManageReducer.movieInfor,
        updateResult: state.MovieManageReducer.updateResult,
        createResult: state.MovieManageReducer.createResult
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMovieDetail: (maPhim) => {
            dispatch(getMovieDetailAction(maPhim))
        },
        updateMovie: (movie) => {
            dispatch(updateMovieAction(movie))
        },
        createMovie: (movie) => {
            dispatch(createMovieAction(movie))
        },
        uploadHinhAnh: (file) => {
            dispatch(UploadHinhAnhAction(file))
        }
    }
}

export default compose(
    Form.create(),
    connect(mapStateToProps, mapDispatchToProps)
)(FormMovieAction);
