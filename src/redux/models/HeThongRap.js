// Bao gồm hệ thống rạp và cụm rạp thuộc hệ thống đó
export class HeThongRap {
    MaHeThongRap;
    TenHeThongRap;
    BiDanh;
    Logo;
    mangCumRap = [];
    mangLichChieu = [];
    constructor(MaHeThongRap, TenHeThongRap, BiDanh, Logo) {
        this.MaHeThongRap = MaHeThongRap;
        this.TenHeThongRap = TenHeThongRap;
        this.BiDanh = BiDanh;
        this.Logo = Logo;
    }
}