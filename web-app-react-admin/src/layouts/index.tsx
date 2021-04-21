import React, { ReactNode, Suspense } from 'react'
import Header from './Header'
import Loader from './Loader'
import SideNav from './SideNav'

interface Props {
    children: ReactNode;
}

function Layout(props: Props) {
    function renderBody() {
        return <div id="wrapper" >
            <SideNav />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Header />
                    <div className="container-fluid">
                        <Suspense fallback={<Loader />}>
                            {props.children}
                        </Suspense>
                    </div>
                </div>
                {/* <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright © Your Website 2020</span>
                        </div>
                    </div>
                </footer> */}
            </div>
        </div >
    }

    return (
        renderBody()
    )
}

export default Layout;