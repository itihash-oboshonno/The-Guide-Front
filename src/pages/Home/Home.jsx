import React from 'react';
import Banner from './HomeComponents/Banner';
import RecentBlogs from './HomeComponents/RecentBlogs';
import SubNewsLetter from './HomeComponents/SubNewsLetter';
import FAQ from './HomeComponents/FAQ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <RecentBlogs></RecentBlogs>
            <FAQ></FAQ>
            <SubNewsLetter></SubNewsLetter>
        </div>
    );
};

export default Home;