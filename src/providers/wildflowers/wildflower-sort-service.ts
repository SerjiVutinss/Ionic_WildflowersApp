

import { Injectable } from '@angular/core';
import { Wildflower } from '../../pages/wildflower-pages/models';

/**
  * WildflowerSortFilterProvider - this service facilitates the creation and sorting 
  * of the grid matrix which is used to display Wildflower objects in an ordered way
  */

@Injectable()
export class WildflowerSortFilterProvider {

    /**
      * This function takes in an array of elements to be displayed, the number of
      * elements within the array to actually be processed and the desired width of the
      * grid
      * 
      * @param inputArray an array of objects which will be processed into the grid
      * @param numItems the actual number of items in the array to be processed
      * @param gridWidth the desired maximum number of elements per grid row
      * 
      * @returns a matrix of elements which will be displayed - an array of columns and rows
      * with a gridWidth number of columns per row
      * 
      */
    setupGridArray(
        inputArray: Wildflower[],
        numItems: number,
        gridWidth: number
    ): Array<Wildflower[]> {

        // create the return matrix (2D array)
        let gridMatrix = Array<Wildflower[]>();

        // format the outer array to the required number of rows
        gridMatrix = Array(Math.ceil(numItems / gridWidth));

        let elementIndex = 0;
        let rowNum = 0;

        // loop through the input array to the number of elements (numItems) we require
        // per row and increment by the numItems per row
        for (let i = 0; i < numItems; i += gridWidth) {
            // create a new row with gridWidth number of columns
            gridMatrix[rowNum] = Array<Wildflower>(gridWidth);
            elementIndex = i; // copy i
            // now loop through the element indexes that will be placed in the current row
            for (let j = 0; j < gridWidth; j++) {
                // check that the element is not null -  this will happen if we have e.g.
                // numItems=15 and gridWidth=4
                if (inputArray[elementIndex] != null) {
                    // element not null, place in return matrix, current row and correct col number
                    gridMatrix[rowNum][j] = inputArray[elementIndex];
                }
                elementIndex++; // next element index
            }
            rowNum++; // next row
        }
        // finally return the matrix
        return gridMatrix;
    }

    /**
      * This function takes in an array of elements and sorts them by the commonName attribute.
      * The default sort order is ascending, if optional desc parameter is true, order will be reversed
      * 
      * @param inputArray an array of objects which will be sorted
      * @param numItems required for gridifying the array once sorted
      * @param gridWidth required for gridifying the array once sorted
      * @param desc optional paramater, if true, items will be sorted in descending order
      * @returns a matrix of elements which will be displayed - an array of columns and rows
      * with a gridWidth number of columns per row
      * 
      */
    sortByCommonName(
        inputArray: Wildflower[],
        numItems: number,
        gridWidth: number,
        desc?: boolean
    ): Array<Wildflower[]> {


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

    /**
      * This function takes in an array of elements and sorts them by the scientificName attribute.
      * The default sort order is ascending, if optional desc parameter is true, order will be reversed
      * 
      * @param inputArray an array of objects which will be sorted
      * @param numItems required for gridifying the array once sorted
      * @param gridWidth required for gridifying the array once sorted
      * @param desc optional paramater, if true, items will be sorted in descending order
      * @returns a matrix of elements which will be displayed - an array of columns and rows
      * with a gridWidth number of columns per row
      * 
      */
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