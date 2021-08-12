import { apiAnnouncement } from '@/apis';
import { AvatarComponent } from '@/components';
import { LoadMore } from '@/components/loaders';
import { env } from '@/environments/config';
import { IconBell } from '@/helpers/svg'
import { SerializeParam, timeSince } from '@/helpers/utils';
import { AnnouncementVM, IBaseParams } from '@/models';
import { debounce } from '@material-ui/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import React, { useEffect, useState } from 'react'
import './index.scss'
import { useSelector } from 'react-redux'
interface ReduxProps {

}

interface Props extends ReduxProps { }

function Notifications(props: Props) {
    const claimUser = useSelector((state: any) => state.claimUser)
    const [connection, setConnection] = useState<HubConnection>();
    let [countUnRead, setCountUnRead] = useState<number>(0);
    const [data, setData] = useState<AnnouncementVM[]>([]);
    const [dataMessage, setDataMessage] = useState<AnnouncementVM>();
    const [loadMore, setLoadMore] = useState(false);
    const [pause, setPause] = useState(false);
    const [params, setParams] = useState<IBaseParams>({ page: 1, pageSize: 20, query: '' })
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${env.baseApiUrl}/hubs`)
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (loadMore && !pause) {
            params.page += 1;
            setParams({ ...params })
            getData(params)
        } else
            setLoadMore(false)
    }, [loadMore])

    useEffect(() => {
        if (claimUser?.isAuthentication) {
            getCountUnRead()
            getData(params)
        }
    }, [claimUser?.isAuthentication])

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

            let pushCount = countUnRead += 1;
            setCountUnRead(pushCount)
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

    function handleScroll(e) {
        const currentScrollY = e.target.scrollTop;
        const currentScrollHeight = e.target.scrollHeight;
        const height = e.target.clientHeight;
        const currentHeight = (currentScrollHeight - currentScrollY - 150)
        if (currentHeight < height && !loadMore) {
            setLoadMore(true);
        }
    }

    async function getCountUnRead() {
        let rsp = await apiAnnouncement.getCountUnRead();
        if (!rsp?.isError) {
            setCountUnRead(rsp.data)
        }
    }
    async function getData(params) {
        let serialParam = SerializeParam(params);
        let rsp = await apiAnnouncement.getPaging(serialParam);
        if (!rsp?.isError) {
            if (loadMore) {
                let newData = data.concat(rsp.data.data)
                setData([...newData])
            } else
                setData(rsp.data.data)
            if (rsp.data.data?.length <= 0)
                setPause(true)
            setLoadMore(false)
        }
    }
    const callbackDebounce = debounce(handleScroll, 200);
    return (
        <li className="nav-item">
            <a className="nav-link" type="button" id="dropdownNotify" data-bs-toggle="dropdown" aria-expanded="false" style={{ position: 'relative' }}>
                {IconBell(20)}
                {countUnRead > 0 && <span className="badge badge-danger badge-counter">{countUnRead}</span>}
            </a>
            <div
                className=" dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="dropdownNotify">
                <h6 className="dropdown-head dropdown-header">Thông báo</h6>
                <ul
                    onScroll={(e) => callbackDebounce(e)}
                >
                    {
                        data.map((item, index) => {
                            return <li key={`notify${index}`} style={{ backgroundColor: '#ddedf9' }}>
                                <a href="#" className="top-text-block">
                                    <div style={{ paddingRight: 5 }}>
                                        <AvatarComponent userId={item.userId} />
                                    </div>
                                    <div>
                                        <div className="top-text-heading font-weight-500">{item.title}</div>
                                        <div className="top-text-light">{timeSince(item.dateCreated)}</div>
                                    </div>
                                </a>
                            </li>
                        })
                    }


                    {loadMore && <li>
                        <LoadMore />
                    </li>}
                </ul>

            </div>
        </li>
    )
}

export default Notifications