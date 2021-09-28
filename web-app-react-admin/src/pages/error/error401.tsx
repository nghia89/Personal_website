import React from 'react';
import { NavLink } from 'react-router-dom';
import Svg401 from '@/images/401-error-unauthorized.svg'
export default function Error401() {
    return (
        <div className="container-xl px-4">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="text-center mt-4">
                        <img className="img-fluid p-4" src={Svg401} alt="" />
                        <p className="lead">Bạn Không được phép truy cập</p>
                        <NavLink className="text-arrow-icon" to="/dashboard">&larr; Back to Dashboard</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
