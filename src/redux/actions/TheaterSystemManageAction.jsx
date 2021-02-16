import * as types from '../constants/TheaterSystemManageConstant';
import axios from 'axios';
import { settings } from '../../config/settings'
import { HeThongRap } from '../models/HeThongRap';

// Get theater system
export const getTheaterSystemListAction = () => {
  let theaterSystemArray = [];
  return dispatch => {
    axios({
      url: settings.domainLocal + '/QuanLyHeThongRap/LayThongTinHeThongRap',
      method: 'GET'
    }).then(result => {
      theaterSystemArray = result.data
      console.log('arrayPromise', theaterSystemArray);
    })
    .then(() => {
      let arrayPromise = [];
      for (let lichChieu of theaterSystemArray) {
        const promise = axios({
          url: settings.domainLocal + `/QuanLyHeThongRap/LayThongTinLichChieuTheoHeThong?MaHeThongRap=${lichChieu.MaHeThongRap}`,
          method: 'GET'
        }).then(res => {
          lichChieu.mangLichChieu = res.data;
        });
        arrayPromise.push(promise);
        console.log("lichChieu", lichChieu.MaHeThongRap);
        
      }
      console.log('theaterSystemArray2', theaterSystemArray);
      Promise.all(arrayPromise).then(() => {
        // Kết quả nhận được
        console.log('theaterSystemArray2', theaterSystemArray);
        // Dispatch action tại đây
        dispatch({
          type: types.GET_THEATER_SYSTEM_LIST,
          theaterSystemArray: theaterSystemArray
        })
      })
    })
    .catch((errors) => {
      //Log ra lỗi backend trả về
      // console.log(errors.response.data);
    })
  }
}


// Get theater area
export const getTheaterListAction = (maHeThongRap) => {
  return dispatch => {
    axios({
      url: settings.domain + `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
      method: 'GET'
    }).then(result => {
      console.log("getTheaterListAction", result);
      dispatch({
        type: types.GET_THEATER_LIST,
        theaterArray: result.data
      })
    }).catch((errors) => {
      // console.log(errors.response.data);
    })
  }
}

// Lấy thông tin lịch chiếu hệ thống rạp
export const getLichChieuHTRListAction = (maHeThongRap) => {
  return dispatch => {
    axios({
      url: settings.domainLocal + `/QuanLyHeThongRap/LayThongTinLichChieuTheoHeThong?MaHeThongRap=${maHeThongRap}`,
      method: 'GET'
    }).then(result => {
      console.log("getLichChieuHTRAction", result.data);
      dispatch({
        type: types.GET_TTLC_SYSTEM_LIST,
        lichChieuHTRArray: result.data
      })
    }).catch((errors) => {
      // console.log(errors.response.data);
    })
  }
}

// Lấy danh sách hệ thống rạp
export const getHeThongRapListAction = () => {
  return dispatch => {
    axios({
      url: settings.domainLocal + `/QuanLyHeThongRap/LayThongTinHeThongRap`,
      method: 'GET'
    }).then(result => {
      console.log("getHeThongRapListAction", result.data);
      dispatch({
        type: types.GET_HTR_LIST,
        HTRArray: result.data
      })
    }).catch((errors) => {
      // console.log(errors.response.data);
    })
  }
}


// Lấy danh sách cụm rạp theo hệ thống rạp
export const getCumRapListAction = (maHeThongRap) => {
  return dispatch => {
    axios({
      url: settings.domainLocal + `/CumRap/LayDanhSachCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
      method: 'GET'
    }).then(result => {
      console.log("getCumRapListAction", result.data);
      dispatch({
        type: types.GET_CUMRAP_LIST,
        cumRapInfor: result.data,
        rapArray: result.data.DanhSachRap 
      })
    }).catch((errors) => {
      // console.log(errors.response.data);
    })
  }
}

// Lấy danh sách rạp thuộc cụm rạp
export const getRapListAction = (maCumRap) => {
  return dispatch => {
    axios({
      url: settings.domainLocal + `/CumRap/LayDanhSachRap?maCumRap=${maCumRap}`,
      method: 'GET'
    }).then(result => {
      console.log("getRapListAction", result.data);
      dispatch({
        type: types.GET_RAP_LIST,
        danhSachRap: result.data.DanhSachRap,
        thongTinCumRap: result.data
      })
    }).catch((errors) => {
      // console.log(errors.response.data);
    })
  }
}


// Lấy danh sách ghế thuộc rạp
export const getGheListAction = (maRap) => {
  return dispatch => {
    axios({
      url: settings.domainLocal + `/CumRap/LayDanhSachGheTheoRap?maRap=${maRap}`,
      method: 'GET'
    }).then(result => {
      console.log("getGheListAction", result.data);
      dispatch({
        type: types.GET_GHE_LIST,
        danhSachGhe: result.data.DanhSachGhe
      })
    }).catch((errors) => {
      // console.log(errors.response.data);
    })
  }
}

// THÊM GHẾ
export const themGheAction = (mangGheThem) => {
  return dispatch => {
    axios({
      url: settings.domainLocal + `/CumRap/ThemGhe`,
      method: 'Post',
      data: mangGheThem
    }).then(result => {
      console.log("themGheAction", result.data);
      dispatch({
        type: types.THEM_GHE,
        themGheResult: result.data
      })
    }).catch((errors) => {
      // console.log(errors.response.data);
    })
  }
}

