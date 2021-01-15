import React from "react";
import {BreedsListElement} from "./BreedsListElement";
import {Breed} from "../../../Model/Breed";

export function BreedsList(props: { breeds: Breed[] }) {
    return (
        <div className="breedsList">
            {props.breeds.map((breed: Breed, index: number) => (
                <BreedsListElement key={`${index}${breed}`} breed={breed}/>
            ))}
        </div>
    );
}
