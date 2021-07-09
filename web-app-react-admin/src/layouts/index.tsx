import React, { ReactNode, Suspense } from 'react'
import Header from './Header'
import Loader from './Loader'
import SideNav from './SideNav'

interface Props {
    children: ReactNode;
}

function Layout(props: Props) {
    function renderBody() {
        return <div id="body-pd" className="" >
            <Header />
            <SideNav />
            <div className="wrapper-container mtc-5">
                <div className="container">
                    <Suspense fallback={<Loader />}>
                        {props.children}
                    </Suspense>
                </div>

            </div>
        </div >
    }

    return (
        renderBody()
    )
}

export default Layout;