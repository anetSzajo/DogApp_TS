import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import '../../main.scss';

function FilterByBreed(props) {
    function handleChange(event) {
        props.handleBreedChange(event.target.value);
    };

    return (
        <div className="searchInput">
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <SearchIcon/>
                </Grid>
                <Grid item>
                    <TextField id="input-with-icon-grid" label="Find a breed..." onChange={handleChange}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default FilterByBreed;
