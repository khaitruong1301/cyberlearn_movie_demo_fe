import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// CONNECT REDUX
import { connect } from 'react-redux';
// import { MovieManageReducer } from '../../redux/reducers/MovieManageReducer';
import { getMovieListAction } from '../../redux/actions/MovieManageAction';
// Slick Slider
import Slider from "react-slick";

class ShowingMovies extends Component {

    componentDidMount() {
        this.props.getMovieList();
    }


    render() {
        const settings = {
            centerMode: false,
            infinite: true,
            // centerPadding: "60px",
            slidesToShow: 4,
            speed: 400,
            rows: 2,
            slidesPerRow: 1
        };
        return (
            <div>
                {/* SHOWING MOVIE */}
                <section className="movie pb-5">
                    <div className="container m-auto">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="section-title">showing MOVIES</h1>
                            </div>
                        </div>
                        {/* <a href="https://www.youtube.com/embed/o-0hcF97wy0" className="item item-2 fancybox-media hvr-grow"><i className="fa fa-play d-block mx-auto mb-3 video-play" /></a> */}
                        {/* <div className="row"> */}

                        <Slider {...settings}>
                            {this.props.movieArray.map((movie, index) => {
                                if (movie.KhoiChieu && !movie.DaXoa) {
                                    // let doTuoi = JSON.stringify((movie.DoTuoi));
                                    let doTuoiObj = JSON.parse(movie.DoTuoi);
                                    return (
                                        <div className="mb-4" key={index}>
                                            <div className="movie__item" >
                                                <img src={movie.HinhAnh} className="img-fluid w-100 mb-2" />
                                                <div className="movie__overlay" />
                                                <div className="movie__detail w-100 text-center text-white">
                                                    <div>
                                                        <a data-fancybox href={movie.Trailer}><i className="fa fa-play d-block mx-auto mb-3 video-play" /></a>
                                                    </div>
                                                    <NavLink to={'/moviedetail/' + movie.MaPhim} className="d-block text-white mb-2">READ MORE</NavLink>
                                                </div>

                                                <div className="rate-index">
                                                    <p>{movie.DanhGia}</p>
                                                </div>

                                                <div className="age-index" style={{ backgroundColor: doTuoiObj.backgroundColor }}>
                                                    <p>{doTuoiObj.doTuoi}</p>
                                                </div>

                                            </div>
                                            <p className="movie__name mt-2">{movie.TenPhim}</p>
                                        </div>
                                    )
                                }
                            })}
                        </Slider>
                    </div>
                    {/* </div> */}

                </section>
                {/* END SHOWING MOVIE */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movieArray: state.MovieManageReducer.movieArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMovieList: () => {
            dispatch(getMovieListAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowingMovies)