import React, { useState, useEffect, Fragment } from 'react'
import { productQuantityVM } from '@/models/index';
import { IconEdit } from '@/helpers/svg'
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { IsNullOrEmpty } from '@/helpers/utils';
import { useHistory } from 'react-router-dom';
import { PATH } from '@/constants/paths';
import EditVariant from './editVariant';


export interface IProps {
    handlePostQuantity: Function
    data?: productQuantityVM[]
    productId: number
}


function ProductQuantity(props: IProps) {
    let history = useHistory();
    const [dataProQuantity, setDataProQuantity] = useState<productQuantityVM[]>([])
    const [typeVariant, setTypeVariant] = useState(0);
    useEffect(() => {
        setDataProQuantity(props.data ? props.data : [])
    }, [])


    function renderNameVariant(colorName, sizeName, name) {
        let text = '';
        if (!IsNullOrEmpty(colorName))
            text += colorName
        if (!IsNullOrEmpty(sizeName))
            text += IsNullOrEmpty(text) ? sizeName : ` / ${sizeName}`
        if (!IsNullOrEmpty(name))
            text += IsNullOrEmpty(text) ? name : ` / ${name}`
        return text;
    }

    function renderItem(item: productQuantityVM, index) {
        return <div className="col-11" style={{ margin: '0 auto' }}>
            <div className="d-flex border-line-bottom justify-content-center align-items-center p-3">
                <div className="col-10 d-flex align-items-center">
                    <span className="hmt-image-thumbnail">
                        <AddPhotoAlternateIcon />
                    </span>
                    <div className="cursor">
                        <p onClick={() => history.push(`${PATH.PRODUCT_VARIANT}${props.productId}/variant/${item.id}`)} style={{ margin: 0, fontSize: '14px', color: '#2962ff', fontWeight: 500 }}>
                            {renderNameVariant(item.color?.name, item.size?.name, item.name)}
                        </p>
                        {item.sku && <p style={{ fontSize: '14px', margin: 0 }}>
                            SKU: {item.sku}
                        </p>}
                    </div>
                </div>

                <div className="col-2" style={{ textAlign: 'end', fontWeight: 500 }}>
                    <span>{item.price} đ</span>

                </div>
            </div>
        </div>
    }




    function renderContent() {
        return <Fragment>
            <div style={{ marginLeft: '5px' }}>
                <div className="col-12 border-line-bottom pb-3 d-flex justify-content-end" style={{ display: 'grid' }}>
                    <div onClick={() => history.push(`${PATH.PRODUCT_VARIANT}${props.productId}`)} className="btn btn-light pe-2">
                        {IconEdit(14)}
                        <a className="text-label-custom ps-2">Thêm mới biến thể</a>
                    </div>
                    <div className="dropdown ps-2">
                        <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                            Chỉnh sửa biến thể
                        </button>
                        <ul style={{ width: '11rem !important' }} className="dropdown-menu dropdown-menu" aria-labelledby="dropdownMenu2" >
                            <li onClick={() => setTypeVariant(1)}><button className="dropdown-item" type="button">Chỉnh giá</button></li>
                            <li onClick={() => setTypeVariant(2)}><button className="dropdown-item" type="button">Chỉnh SKU</button></li>
                        </ul>
                    </div>
                </div>
                {
                    dataProQuantity.map((item, index) => {
                        return <Fragment key={`variant${index}`}>
                            {renderItem(item, index)}
                        </Fragment>
                    })

                }
            </div>
            <EditVariant
                productId={props.productId}
                data={props.data}
                isOpen={typeVariant > 0 ? true : false}
                type={typeVariant}
                handleClose={() => setTypeVariant(0)}
            />
        </Fragment >
    }

    return renderContent()
}




export default ProductQuantity;

