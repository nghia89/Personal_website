import { IconBell } from '@/helpers/svg'
import React from 'react'
interface ReduxProps {

}

interface Props extends ReduxProps { }
function Notifications(props: Props) {
    return (
        <li className="nav-item">
            <a className="nav-link" type="button" id="dropdownNotify" data-bs-toggle="dropdown" aria-expanded="false" style={{ position: 'relative' }}>
                {IconBell(20)}
                <span className="badge badge-danger badge-counter">3+</span>
            </a>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="dropdownNotify"
            >
                <h6 className="dropdown-head dropdown-header">Alerts Center</h6>
                <a className="dropdown-item d-flex align-items-center cursor" >
                    <div className="mx-3">
                        <div className="icon-circle bg-primary">
                            <i className="fas fa-file-alt text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="small text-gray-500">December 12, 2019</div>
                        <span className="font-weight-bold">
                            A new monthly report is ready to download!
         </span>
                    </div>
                </a>
                <a className="dropdown-item d-flex align-items-center cursor" >
                    <div className="mx-3">
                        <div className="icon-circle bg-success">
                            <i className="fas fa-donate text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="small text-gray-500">December 7, 2019</div>
      $290.29 has been deposited into your account!
       </div>
                </a>
                <a className="dropdown-item d-flex align-items-center cursor" >
                    <div className="mx-3">
                        <div className="icon-circle bg-warning">
                            <i className="fas fa-exclamation-triangle text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="small text-gray-500">December 2, 2019</div>
         Spending Alert: We've noticed unusually high spending for your
         account.
       </div>
                </a>
                <a className="dropdown-item text-center small text-gray-500"  >
                    Show All Alerts</a>
            </div>
        </li>
    )
}

export default Notifications