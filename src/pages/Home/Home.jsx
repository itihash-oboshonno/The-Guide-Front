import React from 'react';
import Banner from './HomeComponents/Banner';
import RecentBlogs from './HomeComponents/RecentBlogs';
import SubNewsLetter from './HomeComponents/SubNewsLetter';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <RecentBlogs></RecentBlogs>
            <SubNewsLetter></SubNewsLetter>
        </div>
    );
};

export default Home;