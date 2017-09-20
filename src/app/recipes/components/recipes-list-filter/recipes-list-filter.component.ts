import {Component, EventEmitter, Output} from "@angular/core";

@Component({
    selector: 'recipes-list-filter',
    templateUrl: './recipes-list-filter.component.html',
    styleUrls: ['./recipes-list-filter.component.scss']
})
export class RecipesListFilterComponent{
    @Output()
    filter = new EventEmitter<string>();

    changeFilter(filter: string){
        this.filter.emit(filter);
    }
}