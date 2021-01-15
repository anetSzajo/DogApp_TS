import * as React from 'react';
import axios, {AxiosResponse} from "axios";
import FilterByBreed from '../FilterByBreed';
import '../../main.scss';
import {BreedsList} from "./BreedsList/BreedsList";
import {Breed} from "../../Model/Breed";


type BreedsListPageState = {
    readonly loaded: boolean;
    readonly breeds: Breed[];
    readonly filterInputQuery: string
}

type BreedApiResponse = {
    message: {
        [property: string]: Array<string>
    },
    status: string
}

export class BreedsListPage extends React.Component<{}, BreedsListPageState> {
    readonly state: BreedsListPageState = {
        loaded: false,
        breeds: [],
        filterInputQuery: ''
    };

    transformApiResponse = ((data: BreedApiResponse): Breed[] =>
        Object.entries(data.message).map((n) => {
            return {breedName: n[0], subBreeds: n[1]};
        }))


    fetchBreeds = () => {
        axios.get<BreedApiResponse>("https://dog.ceo/api/breeds/list/all")
            .then((res: AxiosResponse<BreedApiResponse>) => {
                this.setState({
                    loaded: true,
                    breeds: this.transformApiResponse(res.data)
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    componentDidMount() {
        this.fetchBreeds();
    }

    handleBreedChange = (filterInputQuery: string) => {
        this.setState({
            filterInputQuery
        })
    }


    filteringResults = (): Breed[] => {
        return this.state.breeds.filter(breed =>
            breed.breedName.toLowerCase().includes(this.state.filterInputQuery.toLowerCase()));
    }

    render() {
        if (this.state.loaded) {
            return (
                <div className="breedsListPage">
                    <h2>Check out awesome dogs!</h2>
                    <FilterByBreed handleBreedChange={this.handleBreedChange} />
                    <div className="breedsList__container">
                        <BreedsList
                            breeds={this.state.filterInputQuery === '' ? this.state.breeds : this.filteringResults()}
                        />
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}