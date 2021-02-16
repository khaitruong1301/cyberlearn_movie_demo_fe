import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMovieListAction, comingMovieAction } from '../../redux/actions/MovieManageAction';
import moment from 'moment';
import Slider from "react-slick";
import { Tag } from 'antd'

class ComingMovies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: {},
            classActive: false
        }
        this.props.getMovieList();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("nextProps", nextProps);
        console.log("prevState", prevState);
        return {
            ...prevState, movie: nextProps.activeMovie
        }
        return null;
    }

    toggleClass() {
        const currentState = this.state.classActive;
        this.setState({ classActive: !currentState });
    };

    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 400,
            slidesToShow: 4,
            slidesToScroll: 3
        };
        return (
            <div>
                {/* coming MOVIES */}
                <section className="coming">
                    <div className="coming__bg">
                        <div className="coming__bg__overlay"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h1 className="section-title">coming SOON</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 d-flex align-items-center">
                                    <div className="coming__detail text-white">                                        
                                        <div  className='d-flex mb-4'><Tag style={{fontSize: 16}} color="orange">COMEDY</Tag><Tag style={{fontSize: 16}} color="orange">CRIME</Tag></div >
                                        <h1 style={{ color: "white" }}>{this.state.movie.TenPhim}</h1>
                                        <p>
                                            {/* <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" /> */}
                                            <span className="coming__date ">
                                                <i className="fa fa-calendar-o mx-2" /> {moment(this.state.movie.NgayKhoiChieu).format('DD - MM - YYYY')}
                                            </span>
                                        </p>
                                        <p>
                                            {this.state.movie.MoTa}
                                        </p>
                                        <a href="">MORE INFO <i className="fa fa-angle-right" /></a>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="coming__trailer">
                                        <img src={this.state.movie.HinhAnh} alt="image" style={{ width: "100%", height: "400px" }} />
                                        <a data-fancybox href={this.state.movie.Trailer}><i className="fa fa-play video-play text-center text-white" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="coming__list">
                        <div className="container">
                            {/* <div className="row"> */}
                            <Slider {...settings}>
                                {
                                    this.props.comingMovieArray.map((movie, index) => {
                                        if (movie.SapChieu) {
                                            return (
                                                <div onClick={() => {
                                                    this.props.comingMovie(movie);
                                                    this.toggleClass();
                                                }} key={index}>
                                                    <div className={"coming__item text-center text-white"}>
                                                        <div className="coming__img">
                                                            <img src={movie.HinhAnh} className="img-fluid" alt="coming_img" />
                                                        </div>
                                                        <p className="mt-2 mb-0">{movie.TenPhim}</p>
                                                        <span> {moment(this.state.movie.NgayKhoiChieu).format('DD/MM/YYYY')}</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </section>
                {/* END coming MOVIES */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movieArray: state.MovieManageReducer.movieArray,
        activeMovie: state.MovieManageReducer.activeMovie,
        comingMovieArray: state.MovieManageReducer.comingMovieArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMovieList: () => {
            dispatch(getMovieListAction())
        },
        comingMovie: (comingMovie) => {
            dispatch(comingMovieAction(comingMovie))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComingMovies)