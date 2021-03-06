import React, { Suspense, useEffect } from 'react';
import { shape, string } from 'prop-types';

import Logo from '@magento/venia-ui/lib/components//Logo';
import { Link, resourceUrl, Route } from '@magento/venia-drivers';

import { useQuery } from '@apollo/react-hooks';
import GET_MENU from '../../queries/getMenuHeader.graphql';

import CategoryHead from '../CategoryHead';

import CartTrigger from './cartTrigger';
import NavTrigger from './navTrigger';
import SearchTrigger from './searchTrigger';
import OnlineIndicator from './onlineIndicator';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';

import { mergeClasses } from '../../classify';
import defaultClasses from './header.css';

const SearchBar = React.lazy(() => import('@magento/venia-ui/lib/components/SearchBar'));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        searchOpen
    } = useHeader();

    const { loading, error, data } = useQuery(GET_MENU);
    // console.log('GraphQL Data: ',data);

    useEffect(() =>{
        if(!loading){
            // console.log("Data : ",JSON.parse(data.TopMenu));
        } 
    },[loading,data]);

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = searchOpen ? classes.open : classes.closed;
    const searchBarFallback = (
        <div className={classes.searchFallback}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );
    const searchBar = searchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={searchOpen} />
            </Route>
        </Suspense>
    ) : null;

    return (
        <header className={rootClass}>
            <div className={classes.toolbar}>
                <div className={classes.primaryActions}>
                    {/* <NavTrigger /> */}
                    <Link to={resourceUrl('/')}>
                      <img className={classes.icon} src='https://jollysilks.webc.in/logo-pdb.svg' alt='logoimage' />     
                    </Link> 
                    <CategoryHead data={data} />
                </div>
                <OnlineIndicator
                    hasBeenOffline={hasBeenOffline}
                    isOnline={isOnline}
                />
                <Link to={resourceUrl('/')}>
                    <Logo classes={{ logo: classes.logo }} />
                </Link>
                <div className={classes.secondaryActions}>
                    <SearchTrigger
                        active={searchOpen}
                        onClick={handleSearchTriggerClick}
                    />
                    <CartTrigger />
                </div>
            </div>
            {searchBar}
        </header>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string
    })
};

export default Header;
