import moment from 'moment'
import React, { Component } from 'react'

export const sendMailConfirmBooking = (danhSachGheDaDat, thongTinPhim, maThanhToan, uuDai) => {
    const templateId = 'bookingticket';
    let stringGhe = '';
    let tongTien = 0;
    danhSachGheDaDat.map((ghe, index) => {
        let string = ghe.TenGhe + '-' + ghe.GiaVe;
        stringGhe = stringGhe + string + ', ';
        return tongTien += ghe.GiaVe;
    })
    setTimeout(() => {
        const templateParams = {
            to_mail: 'khaitruong1301@gmail.com',
            maThanhToan: maThanhToan,
            tenPhim: thongTinPhim.TenPhim,
            ngayChieu: thongTinPhim.NgayChieu,
            gioChieu: thongTinPhim.GioChieu,
            cumRap: thongTinPhim.TenCumRap,
            tenRap: thongTinPhim.TenRap,
            danhSachGhe: stringGhe,
            uuDai: uuDai,
            tongTien: tongTien
        }
        console.log(templateParams.maThanhToan);
        const userID = 'user_EhyaWsARPVawgX7Jf5dIu'
        sendFeedback('moviestar_gmail_com', templateId, templateParams, userID)
    }, 2000);
}

export const sendMailConfirmCancel = (objectVeHuy, mucHoanTien) => {
    const templateId = 'confirmcancel';
    let stringTemplate = '';
    objectVeHuy.map((ve) => {
        stringTemplate += 
            `<tr>
                <td>${ve.MaVe}</td>
                <td>${ve.TenGhe}</td>
                <td>${ve.GiaVe}</td>
            </tr>`
        
    })
    let html = `<table style="margin: 4px auto; height: 80px; width: 280px; text-align: center" border="1" cellspacing="0"><tr>
    <th>Mã Vé</th>
    <th>Tên Ghế</th>
    <th>Giá Vé</th>
    <tbody>
    </tr>` + stringTemplate + `</tbody></table>`;
    const templateParams = {
        to_mail: 'khaitruong1301@gmail.com',
        objectVeHuy: html,
        mucHoanTien: mucHoanTien
    }
    const userID = 'user_EhyaWsARPVawgX7Jf5dIu'
    sendFeedback('moviestar_gmail_com', templateId, templateParams, userID)
}


export const sendFeedback = (serviceID, templateID, templateParams, userID) => {
    window.emailjs.send(
        serviceID, templateID,
        templateParams,
        userID
    ).then(res => {
        console.log('Email successfully sent!')
    })
        // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
}

export const dateDiff = (startDate, endDate) => {
    var startDateF = moment(startDate, "DD.MM.YYYY");
    var endDateF = moment(endDate, "DD.MM.YYYY");

    console.log(startDateF, endDateF);

    var duration = endDateF.diff(startDateF, 'days');
    return duration;
}

// Disable date less than current
export const disabledDate = (current) => {
    let customDate = moment().format("YYYY-MM-DD");
    return current && current < moment(customDate, "YYYY-MM-DD");
}
