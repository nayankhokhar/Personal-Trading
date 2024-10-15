import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root',
})
export class NseIndiaService {
    constructor(
        private commonService: CommonService
    ) { }

    getIT(params?: any) {
        return this.commonService.get("/corporates-pit", params);
    }
}