import {BreedApiResponse} from "./Model/BreedApiResponse";
import {Breed} from "./Model/Breed";

export function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const transformApiResponse = ((data: BreedApiResponse): Breed[] =>
    Object.entries(data.message).map((n) => {
        return {breedName: n[0], subBreeds: n[1]};
    }))