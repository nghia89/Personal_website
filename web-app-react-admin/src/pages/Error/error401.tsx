import React from 'react';

export default function Error401() {
    return (
        <div className="text-center">
            <div className="error mx-auto" data-text="404">401</div>
            <p className="lead text-gray-800 mb-5">Bạn không có quyền cập</p>
            {/* <NavLink to="/dashboard">&larr; Back to Dashboard</NavLink> */}
        </div>
    )
}
