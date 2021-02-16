import React, { Component } from 'react'
import { Table, Input, Button, Popconfirm, Form } from "antd";
import { connect } from 'react-redux';
import { themGheAction } from '../../../redux/actions/TheaterSystemManageAction';


const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`
                        }
                    ],
                    initialValue: record[dataIndex]
                })(
                    <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                    />
                )}
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                >
                    {children}
                </div>
            );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                        children
                    )}
            </td>
        );
    }
}

class ModalAddDSGhe extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "HÀNG",
                dataIndex: "TenHang",
                width: "30%",
                editable: true,
                align: 'center'
            },
            {
                title: "SỐ GHẾ",
                dataIndex: "SoLuongGhe",
                width: "30%",
                editable: true,
                align: 'center'
            },
            {
                title: "Action",
                dataIndex: "operation",
                align: 'center',
                width: "10%",
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => this.handleDelete(record.key)}
                        >
                            <Button style={{ margin: '0 auto' }} className="button__title__icon" type="danger" icon="delete" size={"small"}> Delete </Button>
                        </Popconfirm>
                    ) : null
            }
        ];

        this.state = {
            dataSource: [
                {
                    key: "A",
                    TenHang: "A",
                    SoLuongGhe: 16
                },
                {
                    key: "B",
                    TenHang: "B",
                    SoLuongGhe: 16
                }
            ],
            count: ''
        };
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleAdd = () => {
        const {  dataSource } = this.state;
        let count = this.state.count;
        const rowLen = dataSource.length;
        if (rowLen > 0){
            dataSource.map((itemGhe, i) => {
                if (rowLen === i + 1) {
                    // last one
                    console.log(itemGhe.key);                    
                    count = itemGhe.key;
                } else {
                    // not last one
                }
            })
        }
        else{
            count = 'Z'
        }
        const newData = {
            key: this.nextChar(count),
            TenHang: this.nextChar(count),
            SoLuongGhe: 16
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count
        });
        console.log(this.state.dataSource);
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row
        });
        this.setState({ dataSource: newData });
    };

    nextChar = c => {
        var res =
            c === "z"
                ? "a"
                : c === "Z"
                    ? "A"
                    : String.fromCharCode(c.charCodeAt(0) + 1);
        return res;
    };

    // Tạo danh sách ghế
    handleAddDSGhe = () => {
        let maRap = this.props.match.params.MaRap;
        let danhSachGhe = this.state.dataSource;
        let danhSachGheTemp = [];

        danhSachGhe.map((ghe, index) => {
            danhSachGheTemp.push({
                TenHang: ghe.TenHang,
                SoLuongGhe: ghe.SoLuongGhe
            })
        })

        if (danhSachGheTemp.length > 0) {
            let objectAddDSGhe = {
                MaRap: parseInt(maRap),
                DanhSachGhe: danhSachGheTemp
            }
            this.props.themGhe(objectAddDSGhe)
            console.log("objectAddDSGhe", objectAddDSGhe);
        }
    }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave
                })
            };
        });

        return (
            <div >
                <div className='d-flex'>
                    <Button
                        className="button__title__icon"
                        icon="plus"
                        onClick={this.handleAdd}
                        type="primary"
                        style={{ marginBottom: 16 }}
                    >
                        Add a row
                    </Button>
                    <Button
                        onClick={() => {
                            this.handleAddDSGhe()
                        }}
                        className="button__title__icon"
                        icon="database"
                        style={{ marginBottom: 16, marginLeft: 10, backgroundColor: "orange", color: '#ffffff' }}
                    >
                        Generate
                    </Button>
                </div>
                <Table
                    components={components}
                    rowClassName={() => "editable-row"}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        themGhe: (objectAddDSGhe) => {
            dispatch(themGheAction(objectAddDSGhe))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalAddDSGhe)