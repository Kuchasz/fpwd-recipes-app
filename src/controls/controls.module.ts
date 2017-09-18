import {NgModule} from "@angular/core";
import {DividerComponent} from "./divider/divider.component";

@NgModule({
    declarations:[
        DividerComponent
    ],
    exports: [
        DividerComponent
    ]
})
export class ControlsModule{

}