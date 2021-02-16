import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

//Tạo homelayout
const BookingLayout = (props) => {
  return (
    <Fragment>
      <Header />
      {props.children}
      <Footer />
    </Fragment>
  )
}
//Tạo ra thẻ homeTemplate (HomeTemplateComponent)
export const BookingTemplate = ({ Component, ...rest }) => {
  return <Route {...rest} render={(props) => {
    return (
      <BookingLayout>
        <Component {...props} />
      </BookingLayout>
    )
  }} />
}