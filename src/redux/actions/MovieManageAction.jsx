import * as types from '../constants/MovieManageConstant';
import axios from 'axios';
import { settings } from '../../config/settings'

export const getMovieListAction = () => {
  return dispatch => {
    axios({
      url: settings.domainLocal + '/QuanLyPhim/LayDanhSachPhim',
      method: 'GET'
    }).then(result => {
      console.log("getMovieListAction", result);
      let comingMovie = [];
      result.data.map((movie, i) => {
        if (movie.SapChieu && movie.DaXoa === false) {
          comingMovie.push(movie)
        }
      })
      let activeMovie = {};
      comingMovie.map((m, index) => {
        if (index === 0) {
          activeMovie = m
        }
      })
      console.log("activeMovie", comingMovie);
      dispatch({
        type: types.GET_MOVIE_LIST,
        movieArray: result.data,
        comingMovieArray: comingMovie,
        activeMovie: activeMovie,
      })
    }).catch((errors) => {
      //Log ra lỗi backend trả về
    })
  }
}


export const getMovieDetailAction = (maPhim) => {
  return dispatch => {
    axios({
      url: settings.domainLocal + `/QuanLyPhim/LayThongTinPhimFull?maPhim=${maPhim}`,
      method: 'GET'
    }).then(result => {
      console.log("getMovieDetailAction", result);
      dispatch({
        type: types.GET_MOVIE_DETAIL,
        movieInfor: result.data,
        ngayKhoiChieu: result.data.NgayKhoiChieu,
        thongTinBinhLuanPhim: result.data.ThongTinBinhLuan,
        lichChieuPhim: result.data.LichChieu
      })
    }).catch((errors) => {
      //Log ra lỗi backend trả về
      // console.log(errors.response.data);
    })
  }
}

export const createMovieAction = (movie) => {
  return dispatch => {
    axios({
      url: settings.domainLocal + '/QuanLyPhim/ThemPhim',
      method: 'POST',
      data: {
        TenPhim: movie.TenPhim,
        BiDanh: movie.BiDanh,
        Trailer: movie.Trailer,
        HinhAnh: movie.HinhAnh,
        MoTa: movie.MoTa,
        NgayKhoiChieu: movie.NgayKhoiChieu,
        DanhGia: movie.DanhGia,
        DienVien: movie.DienVien,
        DaoDien: movie.DaoDien,
        DoTuoi: movie.DoTuoi,
        DaXoa: movie.DaXoa,
        KhoiChieu: movie.KhoiChieu,
        SapChieu: movie.SapChieu
      }
    }).then(result => {
      console.log(result.data);
      dispatch({
        type: types.CREATE_MOVIE,
        createResult: result.data
      })
    }).catch((errors) => {
      //Log ra lỗi backend trả về
      // console.log(errors.response.data);
    })
  }
}

export const updateMovieAction = (movie) => {
  return dispatch => {
    axios({
      url: settings.domainLocal + `/QuanLyPhim/CapNhatPhim`,
      method: 'PUT',
      data: {
        MaPhim: movie.MaPhim,
        TenPhim: movie.TenPhim,
        BiDanh: movie.BiDanh,
        Trailer: movie.Trailer,
        HinhAnh: movie.HinhAnh,
        MoTa: movie.MoTa,
        NgayKhoiChieu: movie.NgayKhoiChieu,
        DanhGia: movie.DanhGia,
        DienVien: movie.DienVien,
        DaoDien: movie.DaoDien,
        DoTuoi: movie.DoTuoi,
        DaXoa: movie.DaXoa,
        KhoiChieu: movie.KhoiChieu,
        SapChieu: movie.SapChieu
      }
    }).then(result => {
      console.log(result.data);
      dispatch({
        type: types.UPDATE_MOVIE,
        updateResult: result.data
      })
      if (result.data === "Cập nhật phim thành công!") {
        console.log("Thành công");
      }
    }).catch((errors) => {
      //Log ra lỗi backend trả về
      // console.log(errors.response.data);
    })
  }
}

export const deleteMovieAction = (maPhim) => {
  return dispatch => {
    axios({
      url: settings.domainLocal + `/QuanLyPhim/XoaPhim?maPhim=${maPhim}`,
      method: 'DELETE'
    }).then(result => {
      console.log(result.data);
      dispatch({
        type: types.DELETE_MOVIE,
        deleteResult: result.data
      })
    }).catch((errors) => {
      //Log ra lỗi backend trả về
      // console.log(errors.response.data);
    })
  }
}


export const comingMovieAction = (activeMovie) => {
  return {
    type: types.COMING_MOVIE,
    activeMovie
  }
}

export const UploadHinhAnhAction = (fileHinhAnh) => {
  return dispatch => {
    axios({
      url: settings.domainLocal + '/QuanLyPhim/UploadHinhAnhPhim',
      method: "POST",
      data: fileHinhAnh,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(result => {
      console.log(result.data);
      dispatch({
        type: types.UPLOAD_HINH_ANH,
        deleteResult: result.data
      })
    }).catch((errors) => {
      //Log ra lỗi backend trả về
      // console.log(errors.response.data);
    })
  }
}

// TÌM KIẾM LC
export const searchLCAction = (maPhim, maCumRap, ngayChieuGioChieu) => {
  return dispatch => {
    axios({
      url: settings.domainLocal + `/QuanLyPhim/TimKiemPhim?maPhim=${maPhim}&maCumRap=${maCumRap}&ngayChieuGioChieu=${ngayChieuGioChieu}`,
      method: "GET"
    }).then(result => {
      console.log(result.data);
      dispatch({
        type: types.SEARCH_LICH_CHIEU,
        maLichChieuSearch: result.data
      })
    }).catch((errors) => {
      //Log ra lỗi backend trả về
      // console.log(errors.response.data);
    })
  }
}

export const AddCommentAction = (comment) => {
  return dispatch => {
    axios({
      url: settings.domainLocal + '/QuanLyPhim/BinhLuanPhim',
      method: "POST",
      data: comment,
    }).then(result => {
      console.log(result.data);
      dispatch({
        type: types.ADD_COMMENT,
        addCommentResult: result.data
      })
    }).catch((errors) => {
      //Log ra lỗi backend trả về
      // console.log(errors.response.data);
    })
  }
}