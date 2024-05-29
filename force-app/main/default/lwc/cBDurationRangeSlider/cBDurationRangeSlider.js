import { LightningElement } from 'lwc';

export default class CBDurationRangeSlider extends LightningElement {

    durations = ['1M', '2M', '3M', '4M', '6M', '7M', '8M', '10M', '1Y', '1Y 5M', '2Y', '2Y 4M', '2Y 8M', '3Y', '3Y 5M', '4Y 5M', '5Y']

    filled = [1, 3, 5, 7, 9, 11, 14, 17]
    filledL = 8
    leftOffsets = [18, 18, 20, 22, 22, 24, 24, 25, 25, 26, 28, 30, 30, 30, 32, 32, 32]
    rangeValue = '1'
    popover = null
    hasRendered = false
    rangeMin = 1
    rangeMax = 17



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



    connectedCallback() {

    }


    renderedCallback() {
        if (!this.hasRendered) {
            this.hasRendered = true
        }
    }

    get formattedrangeValue() {
        return this.durations[Number(this.rangeValue) - 1]
    }

    handleRange(event) {
        this.rangeValue = event.target.value
        // this.update(Number(event.target.value))
        this.updatePopoverPosition(event.target.value)
        this.fireEvent()
    }


    // update(val) {
    //     if (Number(this.rangeValue) < val) {
    //         for (let i = 0; i < this.filledL; i++) {
    //             if (this.filled[i] > val) {
    //                 this.rangeValue = `${this.filled[i]}`
    //                 break;
    //             }
    //         }
    //     } else if ((Number(this.rangeValue) > val)) {
    //         for (let i = 0; i < this.filledL; i++) {
    //             if (this.filled[i] > val) {
    //                 this.rangeValue = `${this.filled[i - 1]}`
    //                 break;
    //             }
    //         }
    //     } else {
    //         this.rangeValue = val
    //     }
    // }



    updatePopoverPosition(rangeVal) {
        let popover = this.template.querySelector(".popover")
        const newVal = Number(((rangeVal - this.rangeMin) * 100) / (this.rangeMax - this.rangeMin));
        let leftOffset = this.leftOffsets[Number(this.rangeValue) - 1]
        popover.style.left = `calc(${newVal}% - ${leftOffset}px)`;
    }
}