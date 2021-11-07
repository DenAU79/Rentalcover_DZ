"use strict";
const vehicleType = require("../../data/vehicleType/vehicleType.json");
const Homepage = require("../../page_objects/homepage/homepage-page");
const PolicyPayment = require("../../page_objects/payment-page/payment-page");
const { expect } = require("chai");

describe("Rentalcover.com", () => {
  it("Get An Instant Quote In 15 Seconds", () => {
    // Open "rentalcover.com" homepage
    browser.url("./");
    Homepage.$getQuoteHeader.waitForDisplayed();
    expect(Homepage.$getQuoteHeader.getText()).to.equal(
      "Get An Instant Quote In 15 Seconds"
    );

    // Type in country name
    Homepage.selectCountry("United States");

    // Select vehicle type
    Homepage.$changeCarTypeBtn.waitForDisplayed();
    Homepage.selectVehicleType(vehicleType.fourByFour);

    // Choose From Date
    Homepage.selectFromDate();
    // Verify that selected date is not passed
    const fromDay = Date.parse(Homepage.$selectedFromDate.getValue());
    const currentDay = Date.parse(Homepage.$fromDateCalendar.getValue());
    expect(fromDay).to.be.at.least(currentDay);

    // Choose To Date
    Homepage.selectToDate();
    // Verify that To Date is not later than From Date
    const toDay = Date.parse(Homepage.$selectedToDate.getValue());
    expect(toDay).to.be.at.least(fromDay);

    // Press "Get Your Instant Quote" btn
    Homepage.$getQuoteBtn.click();

    // Wait for Policy Information & Payment page to be displayed
    PolicyPayment.$policyInfoPaymentLbl.waitForDisplayed();
    expect(PolicyPayment.$policyInfoPaymentLbl.getText()).to.equal(
      "Policy Information & Payment"
    );

    // Confirm that entered dates are correct
    const checkStartDate = Date.parse(PolicyPayment.$startDateCheck.getValue());
    const checkEndDate = Date.parse(PolicyPayment.$endDateCheck.getValue());
    expect(fromDay).to.equal(checkStartDate);
    expect(toDay).to.equal(checkEndDate);

    // Confirm that entered vehicle type is correct
    expect(PolicyPayment.$vehicleTypeCheck.getText()).to.equal(
      vehicleType.fourByFour
    );

    // Confirm quote price is visible
    expect(PolicyPayment.$priceNowCheck.getText()).to.contain("US$");
  });
});
