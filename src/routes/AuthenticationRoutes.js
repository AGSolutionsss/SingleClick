import React, {lazy} from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';
import MinimalLayout from './../layout/MinimalLayout';




const Register = lazy(() => import('../views/pages/authentication/register/index'));

const AuthenticationRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                
                
                '/register',
                
            ]}
        >
            <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                    
                    <Route path="/register" component={Register} />
                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default AuthenticationRoutes;
