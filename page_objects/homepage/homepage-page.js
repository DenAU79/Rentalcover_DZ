"use strict";
class Homepage {
    get $getQuoteHeader() { return $('.QuoteForm-heading'); }
    get $typeCountryBox() { return $('[autocomplete="nope-destination"]'); }
    get $getQuoteBtn() { return $('.col-md-4 [type="submit"]'); }
    get $changeCarTypeBtn() { return $('[aria-controls="QuoteForm-vehicleType-field"]'); }
    get $vehicleTypeDropDownMenu() { return $('.QuoteForm-vehicleType-select'); }
    get $fromDateCalendar() { return $('#QuoteForm_FromDate-datepicker'); }
    get $toDateCalendar() { return $('#QuoteForm_ToDate-datepicker'); }
    get $selectedFromDate() { return $("#QuoteForm_FromDate"); }
    get $selectedToDate() { return $("#QuoteForm_ToDate"); }
    get $$daysFromCurrentAndNextMonth() { return $$('[data-handler="selectDay"]'); }

    // Helper method to pick a random day
    getRandomDay(arr) {
      // Get random index value
      const randomIndex = Math.floor(Math.random() * arr.length);
      // get random item
      const item = arr[randomIndex];
      return item;
    }
    
    selectCountry(country) {
      // Type country name into "Select or type a country" box
      this.$typeCountryBox.waitForClickable();
      this.$typeCountryBox.setValue(country);
      browser.keys("Enter");
    }
    
    selectVehicleType(vehicleType) {
        // Press on vehicle "change" btn
        this.$changeCarTypeBtn.waitForClickable();
        this.$changeCarTypeBtn.click();
        // Choose a vehicle type from drop down menu
        this.$vehicleTypeDropDownMenu.waitForClickable();
        this.$vehicleTypeDropDownMenu.click();
        this.$vehicleTypeDropDownMenu.selectByAttribute('value', vehicleType);
    }

    // Helper method to select rental start date
    selectFromDate() {
        // Click on From Date calendar input box
        this.$fromDateCalendar.waitForClickable();
        this.$fromDateCalendar.click();
        // Wait for calendar is opened and pick dates are visible
        browser.waitUntil(() => {
            return this.$$daysFromCurrentAndNextMonth.map((elem) => elem.isDisplayed()).length > 28;          
        }, { timeout: 10000, timeoutMsg: 'Twenty nine elements were not visible' });
        // Pick the random date
        this.getRandomDay(this.$$daysFromCurrentAndNextMonth).click();        
    }

    // Helper method to select rental end date
    selectToDate() {
        // Click on To Date calendar input box
        this.$toDateCalendar.waitForClickable();
        this.$toDateCalendar.click();
        // Wait for calendar is opened and pick dates are visible
        browser.waitUntil(() => {
            return this.$$daysFromCurrentAndNextMonth.map((elem) => elem.isDisplayed()).length > 28;          
        }, { timeout: 10000, timeoutMsg: 'Twenty nine elements were not visible' });
        // Pick the random date
        this.getRandomDay(this.$$daysFromCurrentAndNextMonth).click();        
    }    
}
module.exports = new Homepage();