export class CurrentPage {
    index: number;
    hasNext: boolean;
    hasPrev: boolean;

    constructor(index:number, hasNext:boolean, hasPrev: boolean){
        this.index = index;
        this.hasNext = hasNext;
        this.hasPrev = hasPrev;
    }

    getNext():number{
        return this.index++;
    }

    getPrev():number{
        return this.index--;
    }
}