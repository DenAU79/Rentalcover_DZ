"use strict";
class PolicyPayment {  
    get $policyInfoPaymentLbl() { return $('#policy-inclusions'); }
    get $startDateCheck() { return $('.col-md-push-8 [name="fromDate"]'); }
    get $endDateCheck() { return $('.col-md-push-8 [name="toDate"]'); }
    get $vehicleTypeCheck() { return $('.col-md-push-8 [data-module="quote/data-vehicletypes"]'); }
    get $priceNowCheck() { return $(".col-md-push-8 .Price-now"); }
    get $proceedToPayment() { return $(".col-md-push-8 .Price-now"); }
    
}
module.exports = new PolicyPayment();
