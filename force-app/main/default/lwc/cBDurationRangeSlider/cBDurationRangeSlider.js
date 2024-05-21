import { LightningElement } from 'lwc';

export default class CBDurationRangeSlider extends LightningElement {

    durations = ['1M','3M','6M','8M','1Y','2Y','3Y','5Y']

    sliderHandler(event) {

        this.dispatchEvent(
            new CustomEvent('duration',
            {
                detail:this.durations[Number(event.target.value)]
            }
        ))

    }
}