import React from "react";
import {capitalizeFirstLetter} from '../../utils';
import '../../../main.scss';

export function SubBreed(props: {onClick: Function, subBreedName: string }) {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>,) => {
        props.onClick(e.currentTarget.value)
    };

    return (
        <div className="subBreedsList__element">
            <button onClick={handleClick}>{capitalizeFirstLetter(props.subBreedName)}</button>
        </div>)
}
