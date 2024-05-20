import { Helmet } from 'react-helmet';
import orderCover from '../../assets/shop/banner2.jpg'
import Cover from '../Shared/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import useMenu from '../../hooks/useMenu';
import OrderCategory from './OrderCategory';
import { useParams } from 'react-router-dom';

const Order = () => {
    const categories = ['salad','pizza','soups','desserts','drinks']
    const {category} = useParams();
    const initialIndex = categories.indexOf(category ? category : "salad")
    const [tabIndex, setTabIndex] = useState(initialIndex);
    
    const { menu } = useMenu();
    const drinks = menu.filter(item => item.category === 'drinks');
    const dessert = menu.filter(item => item.category === 'dessert');
    const soups = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    return (
        <div className='pb-10'>
            <Helmet>
                <title>Order || Bistro Boos</title>
            </Helmet>
            <Cover img={orderCover} title={'order food'}></Cover>

            <Tabs className="flex flex-col justify-center items-center gap-5 md:gap-0" selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className='md:flex justify-center mt-10 md:my-10'>
                    <Tab>SALAD</Tab>
                    <Tab>PIZZA</Tab>
                    <Tab>SOUPS</Tab>
                    <Tab>DESSERTS</Tab>
                    <Tab>DRINKS</Tab>
                </TabList>

                <TabPanel>
                    <OrderCategory items={salad}></OrderCategory>
                </TabPanel>
                <TabPanel>
                    <OrderCategory items={pizza}></OrderCategory>
                </TabPanel>
                <TabPanel>
                    <OrderCategory items={soups}></OrderCategory>
                </TabPanel>
                <TabPanel>
                    <OrderCategory items={dessert}></OrderCategory>
                </TabPanel>
                <TabPanel>
                    <OrderCategory items={drinks}></OrderCategory>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;