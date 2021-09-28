import React from 'react';
import { NavLink } from 'react-router-dom';
import Svg503 from '@/images/503-error-service-unavailable.svg'
export default function Error401() {
    return (
        <div className="container-xl px-4">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="text-center mt-4">
                        <img className="img-fluid p-4" src={Svg503} alt="" />
                        <p className="lead">Máy chủ tạm thời không thể phục vụ yêu cầu của bạn do thời gian ngừng hoạt động bảo trì hoặc sự cố về dung lượng. Vui lòng thử lại sau.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
