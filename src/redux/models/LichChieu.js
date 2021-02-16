export class LichChieu {
    MaPhim;
    NgayChieuGioChieu;
    MaRap;
    GiaVe;

    constructor(MaPhim, NgayChieuGioChieu, MaRap, GiaVe) {
        this.MaPhim = MaPhim;
        this.NgayChieuGioChieu = NgayChieuGioChieu;
        this.MaRap = MaRap;
        this.GiaVe = GiaVe;
    }
}

export class LichChieuViewModel {
    MaPhim;
    TenPhim;
    MoTa;
    HinhAnh;
    LichChieu = [];

    constructor(MaPhim, TenPhim, MoTa, HinhAnh) {
        this.MaPhim = MaPhim;
        this.TenPhim = TenPhim;
        this.MoTa = MoTa;
        this.HinhAnh = HinhAnh;
    }

    themLichChieu(lichChieu) {
        const index = this.LichChieu.findIndex(n => n.MaPhim == lichChieu.MaPhim);
        if (index !== -1) {
            this.LichChieu.push(lichChieu);
        }
    }
}