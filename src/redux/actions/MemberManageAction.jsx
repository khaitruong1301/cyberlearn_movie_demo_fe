import * as types from '../constants/MemberManageConstant';
import axios from 'axios';
import { settings } from '../../config/settings'

export const loginAction = (userLogin) => {
    return dispatch => {
        axios({
            url: settings.domainLocal + '/QuanLyThanhVien/DangNhap',
            method: 'POST',
            data: {
                TaiKhoan: userLogin.TaiKhoan,
                MatKhau: userLogin.MatKhau
            }
        }).then(result => {
            console.log("getMember", result);
            if (localStorage.getItem(settings.userLogin) != null){
                localStorage.removeItem(settings.userLogin);
            }
            localStorage.setItem(settings.userLogin, JSON.stringify(result.data));
            localStorage.setItem(settings.token, result.data.AccessToken);
            dispatch({
                type: types.LOGIN,
                resultLogin: result.data
            })
        }).catch((errors) => {
            //Log ra lỗi backend trả về
        })
    }
}

export const registerAction = (userRegister) => {
    return dispatch => {
        axios({
            url: settings.domainLocal + '/QuanLyThanhVien/DangKy',
            method: 'POST',
            data: {
                TaiKhoan: userRegister.TaiKhoan,
                HoTen: userRegister.HoTen,
                MatKhau: userRegister.MatKhau,
                Email: userRegister.Email,
                SoDienThoai: userRegister.SoDienThoai,
                MaLoaiThanhVien: userRegister.MaLoaiThanhVien
            }
        }).then(result => {
            console.log("getMemberRegister", result);           
        }).catch((errors) => {
            //Log ra lỗi backend trả về
        })
    }
}

export const getMemberListAction = () => {
    return dispatch => {
        axios({
            url: settings.domainLocal + '/QuanLyThanhVien/LayDanhSachThanhVien',
            method: 'GET',
        }).then(result => {
            console.log("getMemberList", result);
            dispatch({
                type: types.GET_MEMBER_LIST,
                memberArray: result.data
            })
        }).catch((errors) => {
            //Log ra lỗi backend trả về
        })
    }
}

export const getProFileAction = (taiKhoan) => {
    return dispatch => {
        axios({
            url: settings.domainLocal + `/QuanLyThanhVien/LayThongTinTaiKhoan?taiKhoan=${taiKhoan}`,
            method: 'GET',
        }).then(result => {
            console.log("getProFileAction", result);
            dispatch({
                type: types.GET_PROFILE,
                profileInfor: result.data
            })
        }).catch((errors) => {
            //Log ra lỗi backend trả về
        })
    }
}