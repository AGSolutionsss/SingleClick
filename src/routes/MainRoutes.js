import React, {lazy} from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';
import MainLayout from './../layout/MainLayout';

const DashboardDefault = lazy(() => import('../views/dashboard/Default'));
const CategoriesList = lazy(() => import('../views/categories/CategoriesList'));
const CategoriesAdd = lazy(() => import('../views/categories/CategoriesAdd'));
const CategoriesEdit = lazy(() => import('../views/categories/CategoriesEdit'));
const CategoriesSubList = lazy(() => import('../views/categoriessub/CategoriesSubList'));
const CategoriesSubAdd = lazy(() => import('../views/categoriessub/CategoriesSubAdd'));
const CategoriesSubEdit = lazy(() => import('../views/categoriessub/CategoriesSubEdit'));
const UsersList = lazy(() => import('../views/users/UsersList'));
const MembersList = lazy(() => import('../views/members/MembersList'));
const Commingsoon = lazy(() => import('../views/comingsoon'));

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard',
                '/category-list',
                '/category-add',
                '/category-edit',
                '/category-sub-list',
                '/category-sub-add',
                '/category-sub-edit',
                '/users-list',
                '/members-list',
                '/commingsoon',
                
            ]}
        >
            <MainLayout showBreadcrumb={true}>
                <Switch location={location} key={location.pathname}>
                    <Route path="/dashboard" component={DashboardDefault} />
                    <Route path='/category-list' component={CategoriesList}/>
                    <Route path='/category-add' component={CategoriesAdd}/>
                    <Route path='/category-edit' component={CategoriesEdit}/>
                    <Route path='/category-sub-list' component={CategoriesSubList}/>
                    <Route path='/category-sub-add' component={CategoriesSubAdd}/>
                    <Route path='/category-sub-edit' component={CategoriesSubEdit}/>
                    <Route path='/users-list' component={UsersList}/>
                    <Route path='/members-list' component={MembersList}/>
                    <Route path='/commingsoon' component={Commingsoon}/>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
