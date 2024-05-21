/*
	Author - Prateek Deshmukh
	Created Date - 06/03/2024
	Modified Date - 21/03/2024
	Description - Used to the Promation
*/

import { LightningElement } from 'lwc';
import PromImage from "@salesforce/resourceUrl/PromImage";
import PROMOTIONS from '@salesforce/label/c.CB_Promotions';
import START_A_GOAL from '@salesforce/label/c.CB_StartAGoal';

export default class CBPromotion extends LightningElement {
    // Labels for UI elements
    label = {
        PROMOTIONS,
        START_A_GOAL
    };

    // Promotion image URL
    PromImage = PromImage;
    // Promotion caption
    caption = '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptates exercitationem cumque perspiciatis, officiis ratione ea maxime. dolor sit amet consectetur.';
    // Hyperlink name for starting a goal
    hyberlinkName = 'Start a goal';
}