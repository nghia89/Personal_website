import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PATH } from '@/constants/paths'

import { PrivateRoute } from './privateRoute';
import Layout from '@/layouts/index';
import { Error401, Error503, Error403 } from '@/pages/index'
const Dashboard = React.lazy(() => import('@/pages/dashboard/index'));
const Home = React.lazy(() => import('@/pages/home/index'));


//#region  auth
const Callback = React.lazy(() => import('@/pages/auth/callback'));
const SilentRenewClient = React.lazy(() => import('@/pages/auth/silentRenewClient'));
//#endregion


//#region  systems
const User = React.lazy(() => import('@/pages/users/index'));
const Role = React.lazy(() => import('@/pages/roles/index'));
const PermissionFunction = React.lazy(() => import('@/pages/permissionFunction/index'));
//#endregion


//#region  Product
const Product = React.lazy(() => import('@/pages/Product/index'));
const ProductCreate = React.lazy(() => import('@/pages/Product/component/create/index'));
const ProductDetail = React.lazy(() => import('@/pages/Product/component/detail/index'));
const VariantNew = React.lazy(() => import('@/pages/Product/component/variantNew/index'));
const ProductCategory = React.lazy(() => import('@/pages/productCategory/index'));
const ProductCollection = React.lazy(() => import('@/pages/productCollection/index'));
const ProductCollectionCreate = React.lazy(() => import('@/pages/productCollection/component/index'));
//#endregion

//#region  Setting 
const Colors = React.lazy(() => import('@/pages/color/index'));
const Sizes = React.lazy(() => import('@/pages/sizes/index'));
//#endregion

//#region  Setting Page
const SystemConfig = React.lazy(() => import('@/pages/systemConfig/index'));
const SlideShow = React.lazy(() => import('@/pages/sliderShow/index'));
const PageOther = React.lazy(() => import('@/pages/pageOther/index'));
const PageOtherCreateAndEdit = React.lazy(() => import('@/pages/pageOther/component/index'));

//#endregion


export const Routes = (
    <Layout >
        <Switch >
            {/* <Route
            
            path="/:lng(en|es|de|fr|pt|it)/register/:form?"
            component={Register}
        /> */}
            <Route exact path="/auth-callback" component={Callback} />
            <Route exact path="/silent-renew" component={SilentRenewClient} />
            <Route exact path={PATH.error401} component={Error401} />
            <Route exact path={PATH.error403} component={Error403} />
            <Route exact path={PATH.error503} component={Error503} />

            <PrivateRoute path={PATH.Dashboard} component={Dashboard} />

            {/* <Route exact path={`${PATH.PRODUCT_DETAIL}:id`} component={ProductDetail} />
            <Route exact path={`${PATH.PRODUCT_VARIANT}:id/variant/:quantityid`} component={VariantNew} /> */}

            <PrivateRoute path={PATH.USER} component={User} />
            <PrivateRoute path={PATH.ROLE} component={Role} />
            <PrivateRoute path={PATH.PERMISSION} component={PermissionFunction} />

            <PrivateRoute path={PATH.CATEGORIES} component={ProductCategory} />


            <PrivateRoute path={PATH.PRODUCT_CREATE} component={ProductCreate} />
            <PrivateRoute path={`${PATH.PRODUCT_DETAIL}:id`} component={ProductDetail} />
            <PrivateRoute path={`${PATH.PRODUCT_VARIANT}:id/variant/:quantityid`} component={VariantNew} />
            <PrivateRoute path={`${PATH.PRODUCT_VARIANT}:id`} component={VariantNew} />

            <PrivateRoute path={`${PATH.PRODUCT_COLLECTIONS_Create}`} component={ProductCollectionCreate} />
            <PrivateRoute path={`${PATH.PRODUCT_COLLECTIONS}/:id`} component={ProductCollectionCreate} />
            <PrivateRoute path={`${PATH.PRODUCT_COLLECTIONS}`} component={ProductCollection} />

            <PrivateRoute path={PATH.PRODUCT} component={Product} />


            <PrivateRoute path={PATH.SETTING_COLOR} component={Colors} />
            <PrivateRoute path={PATH.SETTING_SIZE} component={Sizes} />

            <PrivateRoute path={PATH.SETTINGCONFIG} component={SystemConfig} />
            <PrivateRoute path={PATH.SETTING_SLIDES} component={SlideShow} />


            <PrivateRoute path={PATH.SETTING_PAGE_CREATE} component={PageOtherCreateAndEdit} />
            <PrivateRoute path={`${PATH.SETTING_PAGE_EDIT}:id`} component={PageOtherCreateAndEdit} />
            <PrivateRoute path={PATH.SETTING_PAGES} component={PageOther} />


            <PrivateRoute path={PATH.HOME} component={Home} />


        </Switch>
    </Layout >

);