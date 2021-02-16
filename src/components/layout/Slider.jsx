import React, { Component } from 'react'

export default class Slider extends Component {
    render() {
        return (
            <div>
                {/*CAROUSEL*/}
                <section className="my-carousel">
                    <div id="myCarousel" className="carousel carousel-fade slide" data-ride="carousel">
                        <ol className="carousel-indicators justify-content-start">
                            <li data-target="#myCarousel" data-slide-to={0} className="active" />
                            <li data-target="#myCarousel" data-slide-to={1} />
                            <li data-target="#myCarousel" data-slide-to={2} />
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src={process.env.PUBLIC_URL + "/img/frozen.jpg"} alt="First slide" />
                                <div className="carouse-item__overlay" />
                                <a style={{ textAlign: "center", color: "#ffffff" }} data-fancybox href="https://www.youtube.com/watch?v=bwzLiQZDw2I"><i className="fa fa-play d-block mx-auto mb-3 video-play-slider" /></a>
                                {/* <div className="container carousel-item__caption text-white">
                                    <span className="title">ACTION, ADVENTURE, FANTASY</span>
                                    <h1 className="display-4 slider__title">End of the World: Part I</h1>
                                    <p>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirumest notare quam littera gothica, quam nunc putamu.</p>
                                    <div className="carousel-item__trailer mt-4">
                                        <span className="d-inline-block text-white rounded-circle text-center mr-2">PG</span>
                                        <button className="btn-orange border-0 text-white">
                                            <i className="fa fa-play mr-1" />
                                            PLAY TRAILER
                                            </button>
                                    </div>
                                </div> */}
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={process.env.PUBLIC_URL + "/img/jumanjii.jpg"} alt="Second slide" />
                                <div className="carouse-item__overlay" />
                                <a style={{ textAlign: "center", color: "#ffffff" }} data-fancybox href="https://www.youtube.com/watch?v=voYLots_ZOg"><i className="fa fa-play d-block mx-auto mb-3 video-play-slider" /></a>

                                {/* <div className="container carousel-item__caption text-white">
                                    <span className="title">ACTION, ADVENTURE, FANTASY</span>
                                    <h1 className="display-4 slider__title">End of the World: Part I</h1>
                                    <p>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirumest notare quam littera gothica, quam nunc putamu.</p>
                                    <div className="carousel-item__trailer mt-4">
                                        <span className="d-inline-block text-white rounded-circle text-center mr-2">PG</span>
                                        <button className="btn-orange border-0 text-white">
                                            <i className="fa fa-play mr-1" />
                                            PLAY TRAILER
                                            </button>
                                    </div>
                                </div> */}
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={process.env.PUBLIC_URL + "/img/mat-biec.jpg"} alt="Third slide" />
                                <div className="carouse-item__overlay" />
                                <a style={{ textAlign: "center", color: "#ffffff" }} data-fancybox href="https://www.youtube.com/watch?v=MNm77lvTfi4"><i className="fa fa-play d-block mx-auto mb-3 video-play-slider" /></a>

                                {/* <div className="container carousel-item__caption text-white">
                                    <span className="title">ACTION, ADVENTURE, FANTASY</span>
                                    <h1 className="display-4 slider__title">End of the World: Part I</h1>
                                    <p>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirumest notare quam littera gothica, quam nunc putamu.</p>
                                    <div className="carousel-item__trailer mt-4">
                                        <span className="d-inline-block text-white rounded-circle text-center mr-2">PG</span>
                                        <button className="btn-orange border-0 text-white">
                                            <i className="fa fa-play mr-1" />
                                            PLAY TRAILER
                                            </button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
                {/* END CAROUSEL */}
            </div>
        )
    }
}
