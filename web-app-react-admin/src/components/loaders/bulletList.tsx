import React from "react"
import ContentLoader from "react-content-loader"

interface IProps {
    W: number,
    H: number
}

const BulletList = (props: IProps) => (
    <div style={{ margin: '0 auto' }}>
        <ContentLoader
            speed={2}
            width={props.W}
            height={props.H}
            backgroundColor="#ffffff"
            foregroundColor="#ecebeb"
        >
            <circle cx="17" cy="15" r="10" />
            <rect x="37" y="5" rx="10" ry="10" width={props.W - 40} height="18" />
            <circle cx="17" cy="55" r="10" />
            <rect x="37" y="45" rx="10" ry="10" width={props.W - 40} height="18" />
            <circle cx="17" cy="95" r="10" />
            <rect x="37" y="85" rx="10" ry="10" width={props.W - 40} height="18" />
            <circle cx="17" cy="135" r="10" />
            <rect x="37" y="125" rx="10" ry="10" width={props.W - 40} height="18" />
            <circle cx="17" cy="175" r="10" />
            <rect x="37" y="165" rx="10" ry="10" width={props.W - 40} height="18" />
        </ContentLoader>
    </div>

)

export default BulletList