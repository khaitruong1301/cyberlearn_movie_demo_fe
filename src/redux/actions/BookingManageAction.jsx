import * as types from '../constants/BookingManageConstant';
import axios from 'axios';
import { settings } from '../../config/settings'

export const createLichChieuAction = (lichChieu) => {
    return dispatch => {
        axios({
            url: settings.domainLocal + '/QuanLyDatVe/TaoLichChieu',
            method: 'POST',
            data: {
                MaPhim: lichChieu.MaPhim,
                NgayChieuGioChieu: lichChieu.NgayChieuGioChieu,
                MaRap: lichChieu.MaRap,
                GiaVe: lichChieu.GiaVe,
                GiamGia: lichChieu.GiamGia
            }
        }).then(result => {
            console.log("createLichChieuAction", result);
            dispatch({
                type: types.CREATE_LICH_CHIEU,
                createLCResult: result.data
            })
        }).catch((errors) => {
            //Log ra lỗi backend trả về
        })
    }
}

export const getLichChieuListAction = () => {
    return dispatch => {
        axios({
            url: settings.domainLocal + '/QuanLyDatVe/LayDanhSachLichChieu',
            method: 'GET'
        }).then(result => {
            console.log("getLichChieuListAction", result);
            dispatch({
                type: types.GET_LIST_LICH_CHIEU,
                lichChieuArray: result.data
            })
        }).catch((errors) => {
            //Log ra lỗi backend trả về
        })
    }
}

export const bookingSeatAction = (gheDuocChon, maLichChieu) => {
    return {
        type: types.DAT_GHE,
        gheDuocChon,
        maLichChieu
    }
}

export const huyVeAction = (veDuocChon) => {
    return {
        type: types.CHON_VE_HUY,
        veDuocChon
    }
}



export const putDataInvokeAction = (objectDsGheDangChon) => {
    return {
        type: types.PUT_DANH_SACH_GHE_DANG_DAT,
        objectDsGheDangChon,
    }
}

// CHỈNH SỬA GHẾ ADMIN
export const updateSeatAction = (gheChonUpdate) => {
    return {
        type: types.CHON_GHE_UPDATE,
        gheChonUpdate,
    }
}

// Admin
export const chonGheAdminAction = (gheDuocChonAd) => {
    return {
        type: types.CHON_GHE_ADMIN,
        gheDuocChonAd
    }
}


export const getChiTietPhongVeAction = (maLichChieu) => {
    return dispatch => {
        axios({
            url: settings.domainLocal + `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
            method: 'GET',
        }).then(result => {
            console.log("layChiTietPhongVeAction", result.data);
            dispatch({
                type: types.GET_CHI_TIET_PHONG_VE,
                danhSachGhe: result.data.DanhSachGhe,
                thongTinPhim: result.data.ThongTinPhim
            })
        }).catch(errors => {
            console.log(errors.response.data);
        })
    }
}

export const bookingTicketAction = (objectDatVe) => {
    console.log(objectDatVe);
    return dispatch => {
        axios({
            url: settings.domainLocal + `/QuanLyDatVe/DatVe`,
            method: 'POST',
            data: objectDatVe,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem(settings.token)
            }
        }).then(result => {
            dispatch({
                type: types.DAT_VE,
                datVeResult: result.data,
                objectDatVe: objectDatVe
            })
            
        }).catch(errors => {
            // console.log(errors.response.data);
        })
    }
}


export const cancelTicketAction = (objectHuyVe) => {
    console.log(objectHuyVe);
    return dispatch => {
        axios({
            url: settings.domainLocal + `/QuanLyDatVe/HuyVe`,
            method: 'PUT',
            data: objectHuyVe,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result);
            dispatch({
                type: types.HUY_VE,
                objectHuyVe: objectHuyVe,
                cancelTicket: result.data
            })
        }).catch(errors => {
            // console.log(errors.response.data);
        })
    }
}

// Put danh sách ghế đang đặt
export const putListGheDangDatAction = (objectGheDangDat) => {
    return dispatch => {
        axios({
            url: settings.domainLocal + `/QuanLyDatVe/PutDanhSachVeDangDat`,
            method: 'POST',
            data: objectGheDangDat
        }).then(result => {
            console.log("putListGheDangDatAction", result.data);
            dispatch({
                type: types.PUT_DANH_SACH_GHE_DANG_DAT,
                resultPutDSGheDangDat: result.data
            })
        }).catch((errors) => {
            // console.log(errors.response.data);
        })
    }
}

// Cập nhật loại ghế
export const capNhatLoaiGheAction = (mangGheCapNhat) => {
    return dispatch => {
      axios({
        url: settings.domainLocal + `/CumRap/CapNhatLoaiGhe`,
        method: 'Put',
        data: mangGheCapNhat
      }).then(result => {
        console.log("capNhatLoaiGheAction", result.data);
        dispatch({
          type: types.CAP_NHAT_LOAI_GHE,
          resultCapNhatLoaiGhe: result.data
        })
      }).catch((errors) => {
        // console.log(errors.response.data);
      })
    }
  }