import { apiAnnouncement } from '@/apis';
import { env } from '@/environments/config';
import { IconBell } from '@/helpers/svg'
import { AnnouncementVM } from '@/models';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import React, { useEffect, useState } from 'react'
import './index.scss'
interface ReduxProps {

}

interface Props extends ReduxProps { }
function Notifications(props: Props) {

    const [connection, setConnection] = useState<HubConnection>();
    const [countUnRead, setCountUnRead] = useState<number>(0);
    const [data, setData] = useState<AnnouncementVM[]>([]);
    const [dataMessage, setDataMessage] = useState<AnnouncementVM>();

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${env.baseApiUrl}/hubs`)
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
        getCountUnRead()
        getData()
    }, []);

    useEffect(() => {
        if (dataMessage) {
            data.unshift({
                content: dataMessage.content,
                dateCreated: dataMessage.dateCreated,
                id: dataMessage.id,
                link: dataMessage.link,
                status: dataMessage.status,
                title: dataMessage.title,
                type: dataMessage.type,
                userId: dataMessage.userId
            } as AnnouncementVM)
            setData([...data])
            setDataMessage(undefined)
        }
    }, [dataMessage])

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected hub success');
                    connection.on('ReceiveNotify', message => {
                        if (message) {
                            setDataMessage(message)
                        }
                    });
                })
                .catch(e => console.log('Connection hub failed: ', e));
        }

    }, [connection]);

    async function getCountUnRead() {
        let rsp = await apiAnnouncement.getCountUnRead();
        if (!rsp?.isError) {
            setCountUnRead(rsp.data)
        }
    }
    async function getData() {
        let rsp = await apiAnnouncement.getPaging();
        if (!rsp?.isError) {
            setData(rsp.data.data)
        }
    }
    return (
        <li className="nav-item">
            <a className="nav-link" type="button" id="dropdownNotify" data-bs-toggle="dropdown" aria-expanded="false" style={{ position: 'relative' }}>
                {IconBell(20)}
                {countUnRead > 0 && <span className="badge badge-danger badge-counter">{countUnRead}</span>}
            </a>
            <div className=" dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="dropdownNotify">
                <h6 className="dropdown-head dropdown-header">Thông báo</h6>
                <ul>
                    {
                        data.map((item, index) => {
                            return <li style={{ backgroundColor: '#ddedf9' }}>
                                <a href="#" className="top-text-block">
                                    <div className="top-text-heading">{item.title}</div>
                                    <div className="top-text-light">7 hours ago</div>
                                </a>
                            </li>
                        })
                    }


                    {/* <li>
                    <div className="loader-topbar"></div>
                </li> */}
                </ul>

            </div>
        </li>
    )
}

export default Notifications