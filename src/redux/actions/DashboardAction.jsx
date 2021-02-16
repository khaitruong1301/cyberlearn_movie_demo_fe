import * as types from '../constants/DashboardConstant';
import axios from 'axios';
import { settings } from '../../config/settings'

export const getThongKeSoLuongVeAction = (NGAYBD, NGAYKT, maHeThongRap) => {
    return dispatch => {
        axios({
            url: settings.domainLocal + `/DashBoard/ThongKeVeTheoHTR?NGAYBD=${NGAYBD}&NGAYKT=${NGAYKT}&MaHeThongRap=${maHeThongRap}`,
            method: 'GET'
        }).then(result => {
            console.log("getThongKeSoLuongVeAction", result);
            dispatch({
                type: types.GET_THONG_KE_SO_LUONG_VE,
                danhSachThongKeVe: result.data
            })
        }).catch((errors) => {
            //Log ra lỗi backend trả về
        })
    }
}

export const getThongKeSLVeTheoNamAction = (nam, maHeThongRap) => {
    return dispatch => {
        axios({
            url: settings.domainLocal + `/DashBoard/ThongKeVeTheoNam?nam=${nam}&maHeThongRap=${maHeThongRap}`,
            method: 'GET'
        }).then(result => {
            console.log("getThongKeSoLuongVeTheoNamAction", result);
            dispatch({
                type: types.GET_THONG_KE_SL_VE_THEO_NAM,
                dsThongKeVeTheoNam: result.data
            })
        }).catch((errors) => {
            //Log ra lỗi backend trả về
        })
    }
}

// Thống kê doanh thu theo năm

export const getThongKeDoanhThuTheoNamAction = (nam, maHeThongRap) => {
    return dispatch => {
        axios({
            url: settings.domainLocal + `/DashBoard/ThongKeDoanhThuTheoNam?nam=${nam}&maHeThongRap=${maHeThongRap}`,
            method: 'GET'
        }).then(result => {
            console.log("getThongKeDoanhThuTheoNamAction", result);
            dispatch({
                type: types.GET_THONG_KE_DOANH_THU_THEO_NAM,
                dsThongKeDoanhThuTheoNam: result.data
            })
        }).catch((errors) => {
            //Log ra lỗi backend trả về
        })
    }
}

// Thống kê doanh thu theo khoảng thời gian
export const getThongKeDoanhThuAction = (NGAYBD, NGAYKT, maHeThongRap) => {
    return dispatch => {
        axios({
            url: settings.domainLocal + `/DashBoard/ThongKeDoanhThuTheoHTR?NGAYBD=${NGAYBD}&NGAYKT=${NGAYKT}&MaHeThongRap=${maHeThongRap}`,
            method: 'GET'
        }).then(result => {
            console.log("getThongKeDoanhThuAction", result);
            dispatch({
                type: types.GET_THONG_KE_DOANH_THU,
                dsThongKeDoanhThu: result.data
            })
        }).catch((errors) => {
            //Log ra lỗi backend trả về
        })
    }
}