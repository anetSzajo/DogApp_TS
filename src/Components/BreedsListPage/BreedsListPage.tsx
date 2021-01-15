import * as React from 'react';
import axios, {AxiosResponse} from "axios";
import FilterByBreed from '../FilterByBreed';
import {BreedsList} from "./BreedsList/BreedsList";
import {Breed} from "../../Model/Breed";
import {BreedApiResponse} from "../../Model/BreedApiResponse";
import {transformApiResponse} from '../../utils';
import '../../main.scss';

type BreedsListPageState = {
    readonly loaded: boolean;
    readonly breeds: Breed[];
    readonly filterInputQuery: string
}

export class BreedsListPage extends React.Component<{}, BreedsListPageState> {
    readonly state: BreedsListPageState = {
        loaded: false,
        breeds: [],
        filterInputQuery: ''
    };

    fetchBreeds = () => {
        axios.get<BreedApiResponse>("https://dog.ceo/api/breeds/list/all")
            .then((res: AxiosResponse<BreedApiResponse>) => {
                this.setState({
                    loaded: true,
                    breeds: transformApiResponse(res.data)
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
                    <h1>Check out awesome dogs!</h1>
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