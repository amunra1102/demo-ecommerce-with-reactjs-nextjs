import React from 'react';

import NavBar from '../navbar';
import Notify from '../shared/notify';

const Layout = ({ children }) => {
    return (
        <div className="container">
            <NavBar />
            <Notify />
            {children}
        </div>
    );
};

export default Layout;
