import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div className="">
                {/* footer section*/}
                <footer className="ht-footer">
                    <div className="container ">
                    <div className="ht-footer-overlay"></div>
                        <div className="flex-parent-ft">
                            <div className="flex-child-ft item1">
                                <a href="index-2.html"><img src={process.env.PUBLIC_URL + '/img/logo1.png'} alt="logo" width={265} /></a>
                                <p>197 Học Viện Công Nghệ Bưu Chính Viễn Thông<br />
                                    Quận 9, Thành Phố Hồ Chí Minh</p>
                                <p>Call us: <a href="#">(+84) 39 888 4505</a></p>
                            </div>
                            <div className="flex-child-ft item2">
                                {/* <h4>Resources</h4>
                                <ul>
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Blockbuster</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Forums</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Help Center</a></li>
                                </ul> */}
                            </div>
                            <div className="flex-child-ft item3">
                                <h4>Chính sách</h4>
                                <ul className="pl-0">
                                    <li><a href="#">Terms of Use</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Security</a></li>
                                </ul>
                            </div>
                            <div className="flex-child-ft item4">
                                <h4>Tài khoản</h4>
                                <ul className="pl-0">
                                    <li><a href="#">My Account</a></li>
                                    <li><a href="#">Watchlist</a></li>
                                    <li><a href="#">Collections</a></li>
                                    <li><a href="#">User Guide</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="ft-copyright">
                        <div className="ft-left">
                            <p><a target="_blank">Văn Trần Trúc Phương</a></p>
                        </div>
                        <div className="backtotop">
                            <p><a href="#" id="back-to-top">Back to top  <i className="fa fa-arrow-circle-up"></i></a></p>
                        </div>
                    </div>
                </footer>
                {/* end of footer section*/}

            </div>
        )
    }
}
