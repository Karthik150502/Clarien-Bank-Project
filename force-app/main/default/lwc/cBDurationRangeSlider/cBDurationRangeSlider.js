import { LightningElement } from 'lwc';
import CB_Years from '@salesforce/label/c.CB_Years';
import CB_Months from '@salesforce/label/c.CB_Months';

export default class CBDurationRangeSlider extends LightningElement {


    label = {
        CB_Months,
        CB_Years
    }


    durations = ['1M', '2M', '3M', '4M', '6M', '7M', '8M', '10M', '1Y', '1Y 6M', '2Y', '2Y 4M', '2Y 8M', '3Y', '3Y 6M', '4Y 6M', '5Y']

    filled = [1, 3, 5, 7, 9, 11, 14, 17]
    filledL = 8
    leftOffsets = [18, 18, 20, 22, 22, 24, 24, 25, 25, 26, 28, 30, 30, 30, 32, 32, 32]
    rangeValue = '1'
    popover = null
    hasRendered = false
    rangeMin = 1
    rangeMax = 17


    // Dispatches a custom event named 'duration' with the selected duration as detail
    // The event bubbles up through the DOM
    fireEvent() {
        this.dispatchEvent(
            new CustomEvent('duration',
                {
                    bubbles: true,
                    detail: {
                        duration: this.durations[Number(this.rangeValue) - 1]
                    }
                }
            ))
    }







    // Lifecycle hook that gets called after the component's template has been rendered
    // Sets hasRendered to true to ensure the callback logic runs only once
    renderedCallback() {
        if (!this.hasRendered) {
            this.hasRendered = true
        }
    }


    // Getter that returns the formatted range value
    // Retrieves the duration corresponding to the current rangeValue
    get formattedrangeValue() {
        return this.durations[Number(this.rangeValue) - 1]
    }


    // Handles the change event for the range input
    // Updates the rangeValue and calls updatePopoverPosition and fireEvent methods
    handleRange(event) {
        this.rangeValue = event.target.value
        // this.update(Number(event.target.value))
        this.updatePopoverPosition(event.target.value)
        this.fireEvent()
    }





    // Updates the position of the popover based on the current range value
    // Calculates the new position and adjusts the left offset for the popover
    updatePopoverPosition(rangeVal) {
        let popover = this.template.querySelector(".popover")
        const newVal = Number(((rangeVal - this.rangeMin) * 100) / (this.rangeMax - this.rangeMin));
        let leftOffset = this.leftOffsets[Number(this.rangeValue) - 1]
        popover.style.left = `calc(${newVal}% - ${leftOffset}px)`;
    }
}