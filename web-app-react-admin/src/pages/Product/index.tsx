import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

export function Product(props) {
    const [getProductList, productList] = useState();

    useEffect(() => {
        fetchApi();
    }, [getProductList])

    const fetchApi = () => {
        console.log('444')
    }

    return (
        <h2>Product List</h2>
    )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
