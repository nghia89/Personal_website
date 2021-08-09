import { env } from '@/environments/config';
import { IconBell } from '@/helpers/svg'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import React, { useEffect, useState } from 'react'
import './index.scss'
interface ReduxProps {

}

interface Props extends ReduxProps { }
function Notifications(props: Props) {

    const [connection, setConnection] = useState<HubConnection>();


    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${env.baseApiUrl}/hubs`)
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected hub success');
                    connection.on('ReceiveNotify', message => {
                        console.log('message', message)
                    });
                })
                .catch(e => console.log('Connection hub failed: ', e));
        }

    }, [connection]);


    return (
        <li className="nav-item">
            <a className="nav-link" type="button" id="dropdownNotify" data-bs-toggle="dropdown" aria-expanded="false" style={{ position: 'relative' }}>
                {IconBell(20)}
                <span className="badge badge-danger badge-counter">3+</span>
            </a>
            <div className=" dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="dropdownNotify">
                <h6 className="dropdown-head dropdown-header">Thông báo</h6>
                <ul>
                    <li style={{ backgroundColor: '#ddedf9' }}>
                        <a href="#" className="top-text-block">
                            <div className="top-text-heading">New asset recommendations in</div>
                            <div className="top-text-light">7 hours ago</div>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="top-text-block">
                            <div className="top-text-heading">New asset recommendations in</div>
                            <div className="top-text-light">7 hours ago</div>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="top-text-block">
                            <div className="top-text-heading">New asset recommendations in</div>
                            <div className="top-text-light">7 hours ago</div>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="top-text-block">
                            <div className="top-text-heading">New asset recommendations in</div>
                            <div className="top-text-light">7 hours ago</div>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="top-text-block">
                            <div className="top-text-heading">New asset recommendations in</div>
                            <div className="top-text-light">7 hours ago</div>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="top-text-block">
                            <div className="top-text-heading">New asset recommendations in</div>
                            <div className="top-text-light">7 hours ago</div>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="top-text-block">
                            <div className="top-text-heading">New asset recommendations in</div>
                            <div className="top-text-light">7 hours ago</div>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="top-text-block">
                            <div className="top-text-heading">New asset recommendations in</div>
                            <div className="top-text-light">7 hours ago</div>
                        </a>
                    </li>
                    {/* <li>
                    <div className="loader-topbar"></div>
                </li> */}
                </ul>

            </div>
        </li>
    )
}

export default Notifications