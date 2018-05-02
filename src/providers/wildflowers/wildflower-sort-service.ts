

import { Injectable } from '@angular/core';
import { Wildflower } from '../../pages/wildflower-pages/models';

/**
  * WildflowerSortFilterProvider - this service facilitates the creation and sorting 
  * of the grid matrix which is used to display Wildflower objects in an ordered way
  */

@Injectable()
export class WildflowerSortFilterProvider {

    setupGridArray(
        inputArray: Wildflower[],
        numItems: number,
        gridWidth: number
    ): Array<Wildflower[]> {

        //let size: number = 4;
        let gridMatrix = Array<Wildflower[]>();

        gridMatrix = Array(Math.ceil(numItems / gridWidth));

        let n = 0;
        let rowNum = 0;
        for (let i = 0; i < numItems; i += gridWidth) {
            gridMatrix[rowNum] = Array<Wildflower>(gridWidth);

            n = i;
            for (let j = 0; j < gridWidth; j++) {
                if (inputArray[n] != null) {
                    gridMatrix[rowNum][j] = inputArray[n];
                }
                n++;
            }
            rowNum++;
        }

        return gridMatrix;
    }

    sortByCommonName(
        inputArray: Wildflower[],
        numItems: number,
        gridWidth: number,
        desc?: boolean
    ): Array<Wildflower[]> {


        //this.limit = this.defaultLimit;
        if (!desc) {
            inputArray.sort(
                (a, b) => a.commonName.localeCompare(b.commonName)
            );
        } else {
            inputArray.sort(
                (a, b) => b.commonName.localeCompare(a.commonName)
            );
        }
        return this.setupGridArray(
            inputArray,
            numItems,
            gridWidth
        );
    }
    sortByScientificName(
        inputArray: Wildflower[],
        numItems: number,
        gridWidth: number,
        desc?: boolean
    ): Array<Wildflower[]> {

        //this.limit = this.defaultLimit;
        if (!desc) {
            inputArray.sort(
                (a, b) => a.scientificName.localeCompare(b.scientificName)
            );
        } else {
            inputArray.sort(
                (a, b) => b.scientificName.localeCompare(a.scientificName)
            );
        }
        return this.setupGridArray(
            inputArray,
            numItems,
            gridWidth
        );
    }

}