import React from 'react';
import { NavLink } from 'react-router-dom';
import Svg404 from '@/images/404-error-with-a-cute-animal.svg'

export default function Error404() {
    return (
        <div className="container-xl px-4">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="text-center mt-4">
                        <img className="img-fluid p-4" src={Svg404} alt="" />
                        <p className="lead">Không tìm thấy trang.</p>
                        <NavLink className="text-arrow-icon" to="/dashboard">&larr; Back to Dashboard</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
