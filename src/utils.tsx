import {BreedApiResponse} from "./Model/BreedApiResponse";
import {Breed} from "./Model/Breed";

export function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const transformApiResponse = ((data: BreedApiResponse): Breed[] =>
    Object.entries(data.message).map((n) => {
        return {breedName: n[0], subBreeds: n[1]};
    }))

function getRandomWithinRangeExclusive(n: number): number {
    return Math.floor(Math.random() * Math.floor(n));
}

export const reduceToN = (n: number): Function => (array: string[]): string[] => {
    let newArray: string[] = [];
    for (let i = 0; i < n; i++) {
        newArray.push(array[getRandomWithinRangeExclusive(array.length)]);
    }
    return newArray;
};
