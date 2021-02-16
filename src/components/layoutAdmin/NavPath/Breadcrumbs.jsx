import React from "react";
import { Link } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

const routes = [
    { path: '/admin/statisticdashboard/', breadcrumb: 'Dashboard' },
    { path: '/admin/movieadmin', breadcrumb: 'QuanLyPhim' },
    { path: '/admin/movieadmin/formMovieAction/addMovie', breadcrumb: 'ThemPhim' },
    { path: '/admin/movieadmin/formMovieAction/:MaPhim', breadcrumb: 'CapNhatPhim' },
    { path: '/admin/theateradmin', breadcrumb: 'QuanLyHeThongRap' },
    { path: '/admin/bookingmanage/showtimemanage', breadcrumb: 'QuanLyLichChieu'}, 
    { path: '/admin/membermanage', breadcrumb: 'QuanLyThanhVien' },
];

const PureBreadcrumbs = ({ breadcrumbs }) => (
    <div className="breadcrumbs">
        {breadcrumbs.map(({ breadcrumb, match }, index) => (
            index > 0 ? <div className="bc" key={match.url}>
                <Link to={match.url || ""}>{breadcrumb}</Link>
                {index < breadcrumbs.length - 1 && " / "}
            </div>
                : ""
        ))}
    </div>
);

export default withBreadcrumbs(routes)(PureBreadcrumbs);