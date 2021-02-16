import * as types from '../constants/BookingManageConstant';
import { showMessageAlert, showMessageAlertEvent } from '../../templates/SweetAlert';
import { sendMailConfirmCancel, sendMailConfirmBooking } from '../../common/common';
import { connection } from '../../index'
import { settings } from '../../config/settings';
const initialState = {
    createLCResult: {},
    lichChieuArray: [],
    danhSachGhe: [],
    thongTinPhim: {},
    danhSachGheDaDat: [],
    danhSachVeDuocChon: [],
    gheAdmin: {},
    cancelTicket: {},
    objectHuyVe: {},
    datVeResult: {},
    resultPutDSGheDangDat: '',
    objectDsGheDangChon: [],
    dsGheChonUpdate: [],
    objectDatVe: {}
}

export const BookingManageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_LICH_CHIEU: {
            state.createLCResult = action.createLCResult;
            if (action.createLCResult === "Thêm lịch chiếu thành công !") {
                showMessageAlertEvent("Notification", "Thêm lịch chiếu thành công !", "success")
            }
            else {
                showMessageAlert("Warning", action.createLCResult.Content, "warning")
            }
            return { ...state }
        }
        case types.GET_LIST_LICH_CHIEU: {
            state.lichChieuArray = action.lichChieuArray;
            return { ...state }
        }
        case types.GET_CHI_TIET_PHONG_VE: {
            state.thongTinPhim = action.thongTinPhim;
            state.danhSachGhe = action.danhSachGhe;
            return { ...state }
        }
        case types.DAT_GHE: {
            //Tìm trong mảng ghế đang đặt 
            // if (state.danhSachGheDaDat.length <= 10) {
            if (action.gheDuocChon.DangDat) {
                state.danhSachGheDaDat = [...state.danhSachGheDaDat, action.gheDuocChon]
            } else {
                state.danhSachGheDaDat = [...state.danhSachGheDaDat.filter(ghe => ghe.MaGhe != action.gheDuocChon.MaGhe)]
            }
            let taiKhoan = JSON.parse(localStorage.getItem(settings.userLogin)).TaiKhoan;
            console.log("state.danhSachGheDaDat", state.danhSachGheDaDat);
            connection.invoke("SendListGhe", taiKhoan, JSON.stringify(state.danhSachGheDaDat), action.maLichChieu).catch(err => console.error(err.toString()));

            return { ...state }
        }
        case types.CHON_VE_HUY: {
            // if (action.veDuocChon.DangChon) {
            state.danhSachVeDuocChon = [...state.danhSachVeDuocChon, action.veDuocChon]
            // } else {
            // state.danhSachVeDuocChon = [...state.danhSachVeDuocChon.filter(ve => ve.MaVe != action.veDuocChon.MaVe)]
            // }           
            console.log("state.danhSachVeDuocChon", state.danhSachVeDuocChon);
            return { ...state }
        }
        // Chỉnh sửa ghế
        case types.CHON_GHE_UPDATE: {
            //Tìm trong mảng ghế đang đặt 
            // if (state.danhSachGheDaDat.length <= 10) {
            if (action.gheChonUpdate.DangDat) {
                state.dsGheChonUpdate = [...state.dsGheChonUpdate, action.gheChonUpdate]
            } else {
                state.dsGheChonUpdate = [...state.dsGheChonUpdate.filter(ghe => ghe.MaGhe != action.gheChonUpdate.MaGhe)]
            }
            console.log("state.danhSachGheDaDat", state.dsGheChonUpdate);

            return { ...state }
        }
        // admin
        case types.CHON_GHE_ADMIN: {
            state.gheAdmin = action.gheDuocChonAd
            return { ...state }
        }
        // Đặt vé
        case types.DAT_VE: {
            state.datVeResult = action.datVeResult;
            if (action.datVeResult.Content === "Tài khoản người dùng không tồn tại!" || action.datVeResult.Content === "Tài khoản người dùng không tồn tại!") {
                showMessageAlert('Warning', action.datVeResult.Content, 'warning')
            }
            else {
                if (action.objectDatVe.TrangThaiThanhToan === 0) {
                    setTimeout(() => {
                        showMessageAlertEvent(' Notification', 'Booking success. Please check your mail!', 'success')
                    }, 3000);
                }
                else {
                    showMessageAlertEvent('Notification', 'Booking success. Please check your mail!', 'success')
                }
            }
            return { ...state }
        }
        // Hủy vé
        case types.HUY_VE: {
            state.cancelTicket = action.cancelTicket
            state.objectHuyVe = action.objectHuyVe
            if (action.cancelTicket === "Yêu cầu hủy vé được chấp nhận!") {
                // console.log("action.objectHuyVe", action.objectHuyVe);
                sendMailConfirmCancel(action.objectHuyVe.DanhSachVeHuy, action.objectHuyVe.MucHoanTra);
                showMessageAlertEvent("Notification", "Hãy kiểm tra Email của bạn!", "success");
            }
            else {
                showMessageAlert("Notification", "Hủy vé thất bại", "warning");
            }
            return { ...state }
        }
        //PUT danh sách ghế đang đặt
        case types.PUT_DANH_SACH_GHE_DANG_DAT: {
            state.objectDsGheDangChon = action.objectDsGheDangChon
            return { ...state }
        }
        // Cập nhật loại ghế
        case types.CAP_NHAT_LOAI_GHE: {
            if (action.resultCapNhatLoaiGhe != 'Danh sách ghế rỗng!' && action.resultCapNhatLoaiGhe != 'Rạp đã tồn tại lịch chiếu không thể cập nhật!') {
                state.danhSachGhe = action.resultCapNhatLoaiGhe.DanhSachGhe
                console.log(state.danhSachGhe);
                showMessageAlertEvent('Notification', 'Cập nhật thành công!', 'success')
            }
            else {
                showMessageAlert('Warning', 'Rạp đã tồn tại lịch chiếu không thể cập nhật!', 'warning')
            }
            return { ...state }
        }

        default:
            return state;
    }
}
