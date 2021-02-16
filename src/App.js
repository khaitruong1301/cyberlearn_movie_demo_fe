import React, { Fragment } from 'react';
// import logo from './logo.svg';
import 'antd/dist/antd.css';

import './App.css';
// import './assets/css/plugins.css';
//Routing
import { BrowserRouter, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { HomeTemplate } from './templates/HomeTemplate';
import MovieDetail from './pages/MovieDetail';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AdminTemplate from './templates/AdminTemplate';
import HomePageAdmin from './pages/Admin/HomePageAdmin';
import MovieAdmin from './components/layoutAdmin/MovieMange/MovieAdmin';
import FormMovieAction from './components/layoutAdmin/MovieMange/FormMovieAction';
import TheaterAdmin from './components/layoutAdmin/TheaterManage/TheaterAdmin';
import MemberManage from './components/layoutAdmin/MemberManage/MemberManage';
import ShowtimeManage from './components/layoutAdmin/BookingMange/ShowtimeManage';
import BookingTicket from './pages/BookingTicket/BookingTicket';
import { BookingTemplate } from './templates/BookingTemplate';
import ProfileUser from './pages/ProfileUser';
import StatisticDasboard from './components/layoutAdmin/Dashboard/StatisticDasboard';
import TicketRoom from './components/layoutAdmin/BookingMange/TicketRoom';
import ShowingMovies from './components/layout/ShowingMovies';
import RapManage from './components/layoutAdmin/TheaterManage/RapManage';
import GheManage from './components/layoutAdmin/TheaterManage/GheManage';
import Demo from './components/layout/Demo';
import ModalAddDSGhe from './components/layoutAdmin/TheaterManage/ModalAddDSGhe';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        {/* <Demo></Demo> */}
        <div className="snowflakes" aria-hidden="true">
          <div className="snowflake">
            ❅
          </div>
          <div className="snowflake">
            ❆
         </div>
          <div className="snowflake">
            ❅
          </div>
          <div className="snowflake">
            ❆
          </div>
          <div className="snowflake">
            ❅
          </div>
          <div className="snowflake">
            ❆
          </div>
          <div className="snowflake">
            ❅
          </div>
          <div className="snowflake">
            ❆
          </div>
          <div className="snowflake">
            ❅
          </div>
          <div className="snowflake">
            ❆
          </div>
          <div className="snowflake">
            ❅
          </div>
          <div className="snowflake">
            ❆
          </div>
        </div>
        <Switch>
          <HomeTemplate exact path='/home/homepage' Component={HomePage} />
          <HomeTemplate exact path='/homepage' Component={HomePage} />
          <HomeTemplate exact path='/moviedetail/:maPhim' Component={MovieDetail} />
          <HomeTemplate exact path='/signup' Component={SignUp} />
          <HomeTemplate exact path='/login' Component={Login} />
          <HomeTemplate exact path='/profileuser/:taiKhoan' Component={ProfileUser} />
          <HomeTemplate exact path='/' Component={HomePage} />
          <HomeTemplate exact path='/showingmovies' Component={ShowingMovies} />
          <HomeTemplate exact path='/demo' Component={Demo} />
          {/* Trang đặt vé */}
          <BookingTemplate exact path='/bookingticket/:MaLichChieu' Component={BookingTicket} />
          <AdminTemplate exact path='/admin' Component={HomePageAdmin} />
          <AdminTemplate exact path='/admin/movieadmin' Component={MovieAdmin} />
          <AdminTemplate exact path='/admin/movieadmin/formMovieAction/addMovie' Component={FormMovieAction} />
          <AdminTemplate exact path='/admin/movieadmin/formMovieAction/:MaPhim' Component={FormMovieAction} />
          <AdminTemplate exact path='/admin/theateradmin' Component={TheaterAdmin} />
          {/* Quản lý thành viên */}
          <AdminTemplate exact path='/admin/membermanage' Component={MemberManage} />
          {/* Danh sách lịch chiếu */}
          <AdminTemplate exact path='/admin/bookingmanage/showtimemanage' Component={ShowtimeManage} />
          {/* Thống kê */}
          <AdminTemplate exact path='/admin/statisticdashboard/:MaHeThongRap' Component={StatisticDasboard} />
          {/* Phòng vé */}
          <AdminTemplate exact path='/admin/ticketroom/:MaLichChieu' Component={TicketRoom} />
          {/* Cum rap */}
          <AdminTemplate exact path='/admin/rapmanage/:MaCumRap' Component={RapManage} />
          {/* ghe */}
          <AdminTemplate exact path='/admin/ghemanage/:MaRap' Component={GheManage} />
          {/* Thêm ghế */}
          <AdminTemplate exact path='/admin/themghe/:MaRap' Component={ModalAddDSGhe} />

        </Switch>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;