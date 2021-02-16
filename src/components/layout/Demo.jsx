import React, { Component } from 'react'
import { connection } from '../../index'

export default class Demo extends Component {

    state = {
        content: '',
        DanhSachGheDangChon: [],
        DanhSachGheNguoiKhacChon: []
    }
    componentDidMount() {

    }

    componentDidMount() {
        connection.on("ReceiveMessage", (name, message) => {
            this.setState({ content: name + ": " + message })
        })
    }

    componentDidUpdate() {
        // connection.on("ReceiveMessage",(name,message) => {
        //     this.setState({content: name +": " + message})
        //     console.log(name,message)
        // })
    }

    render() {
        return (
            <section className="movie pb-5">
                <div className="container m-auto">
                    <div className="row">
                        <button onClick={() => {
                            alert(1)
                            connection.invoke("SendMessage", "loc", "hello abc");
                        }} id="sendButton">Test</button>


                        <div>{this.state.content}</div>
                    </div>
                </div>
            </section>
        )
    }
}

