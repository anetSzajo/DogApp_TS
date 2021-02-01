import {useState} from 'react';
import {Redirect} from "react-router-dom";
import {capitalizeFirstLetter} from '../../../utils';
import {Breed} from "../../../Model/Breed";

export function BreedsListElement(props: {breed: Breed}) {

    const [buttonPressed, setButtonPressed] = useState(false);

    if (buttonPressed) {
        return (
            <Redirect push
                      to={{
                          pathname: `/${props.breed.breedName}`,
                          state: {breed: props.breed}
                      }}
            />
    )}
    else {
        return (
            <div className="breedsList__element">
                <button onClick={() => setButtonPressed(true)}>
                    {capitalizeFirstLetter(props.breed.breedName)}
                </button>
            </div>
        );
    }
}
