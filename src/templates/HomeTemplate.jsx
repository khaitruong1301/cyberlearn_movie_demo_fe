import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

//Tạo homelayout
const HomeLayout = (props) => {
  return (
    <Fragment>
      <Header />
      {props.children}
      <Footer />
    </Fragment>
  )
}
//Tạo ra thẻ homeTemplate (HomeTemplateComponent)
export const HomeTemplate = ({ Component, ...rest }) => {
  return <Route {...rest} render={(props) => {
    return (
      <HomeLayout>
        <Component {...props} />
      </HomeLayout>
    )
  }} />
}