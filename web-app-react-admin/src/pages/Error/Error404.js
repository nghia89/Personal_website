import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Error404() {
    return (
        <div className="text-center">
            <div className="error mx-auto" data-text="404">404</div>
            <p className="lead text-gray-800 mb-5">Không tìm thấy trang</p>
            <NavLink to="/dashboard">&larr; Back to Dashboard</NavLink>
        </div>
    )
}
