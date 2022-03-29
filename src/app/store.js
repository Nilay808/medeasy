/**
 *
 * @version 1.0
 * @author [Chandan Shukla](chandan.shukla@dal.ca)
 */


import {configureStore} from "@reduxjs/toolkit";
import paymentMethodReducer from '../features/payment/PaymentType';
import orderSummaryCostReducer from '../features/payment/PaymentAmount';

const store = configureStore({
    reducer: {
        paymentMethodType: paymentMethodReducer,
        orderSummaryCost: orderSummaryCostReducer,
    },

});


export default store;