import * as React from "react";
import {Theme, makeStyles, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {capitalizeFirstLetter} from '../../utils';
import {Breed} from "../../Model/Breed";
import '../../main.scss';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        height: 67,
        backgroundColor: theme.palette.background.default,
    }
}));


export function BreedImagesContainer(props: { images: Array<string>, breed: Breed, subBreed: string }) {

    const classes = useStyles();

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = props.images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className="root imagesContainer">
            <Paper square elevation={0} className={classes.header}>
                <Typography className="breedName" variant="h4">
                    {props.subBreed && capitalizeFirstLetter(props.subBreed)} {capitalizeFirstLetter(props.breed.breedName)}
                </Typography>
            </Paper>
            <img.
                src={props.images[activeStep]}
                alt={props.images[activeStep]}
            />
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                        Back
                    </Button>
                }
            />
        </div>

    );
}
