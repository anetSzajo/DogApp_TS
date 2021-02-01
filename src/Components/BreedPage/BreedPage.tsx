import * as React from "react";
import { RouteComponentProps } from 'react-router-dom'
import axios, {AxiosResponse}  from "axios";
import {Breed} from "../../Model/Breed";
import {BreedApiResponse} from "../../Model/BreedApiResponse";
import {BreedImagesContainer} from "./BreedImagesContainer";
import {SubBreed} from "./SubBreed";
import '../../main.scss';
import {reduceToN} from "../../utils";


type BreedPageState = {
    readonly breed: Breed;
    readonly chosenSubBreedName: string;
    readonly loaded: boolean;
    readonly images: string[]
}

type LocationState = {
    breed: Breed;
}

type MockType = {
    [key: string]: string | undefined;
};

type TypeWithLocationState =
    RouteComponentProps<MockType, MockType, LocationState>;


export default class BreedPage extends React.Component<TypeWithLocationState, BreedPageState> {
    readonly state: BreedPageState = {
        breed: this.props.location.state.breed,
        chosenSubBreedName: '',
        loaded: false,
        images: []
    };

    reduceArrayTo3 = reduceToN(3);

    fetchBreedPhotos = () => {
        axios
            .get<BreedApiResponse>(`https://dog.ceo/api/breed/${this.state.breed.breedName}/images`)
            .then((res: AxiosResponse<BreedApiResponse>) => res.data.message)
            .then((imagesSrcArray) => this.reduceArrayTo3(imagesSrcArray))
            .then((reducedImagesSrc) => {
                this.setState({
                    loaded: true,
                    images: reducedImagesSrc
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    fetchSubBreedPhotos = (subBreedName: string) => {
        axios
            .get<BreedApiResponse>(`https://dog.ceo/api/breed/${this.state.breed.breedName}/${subBreedName}/images`)
            .then((res: AxiosResponse<BreedApiResponse>) => res.data.message)
            .then((imagesSrcArray) => this.reduceArrayTo3(imagesSrcArray))
            .then((reducedImagesSrc) => {
                this.setState({
                    loaded: true,
                    images: reducedImagesSrc,
                    chosenSubBreedName: subBreedName
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    componentDidMount() {
        this.fetchBreedPhotos();
    }

    render() {
        const {breed} = this.state;

        if (this.state.loaded) {
            return (
                <div className="breedPage">
                    <BreedImagesContainer images={this.state.images} breed={breed}
                                          subBreed={this.state.chosenSubBreedName}/>
                    {(breed.subBreeds !== undefined && breed.subBreeds.length !== 0) ? (
                        <div className="subBreeds__container">
                            <div className="subBreeds__container--title">Available subbreeds</div>
                            <div
                                className={breed.subBreeds.length > 1 ? "subBreeds__container--elements" : "subBreeds__container--singleElement"}>
                                {breed.subBreeds.map((subBreedName, index) => (
                                    <SubBreed key={`${subBreedName}_${index}`} subBreedName={subBreedName}
                                              onClick={() => this.fetchSubBreedPhotos(subBreedName)}/>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            );
        } else {
            return null;
        }
    }
}
