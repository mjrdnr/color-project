import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { ChromePicker } from 'react-color'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles'

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = { currentColor: "teal", newColorName: "" };
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );

        ValidatorForm.addValidationRule('isColorUnique', value =>
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
    }

    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex })
    };

    handleType(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor);
        this.setState({ newColorName: "" });
    }

    render() {
        const { paletteIsFull, classes } = this.props;
        const { currentColor, newColorName } = this.state;
        return (
            <div>
                <ChromePicker color={currentColor}
                    onChange={this.handleChange}
                    onChangeComplete={this.updateCurrentColor} className={classes.picker} />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        placeholder="Color Name"
                        variant="filled"
                        className={classes.colorNameInput}
                        value={newColorName}
                        name='newColorName'
                        onChange={this.handleType}
                        margin="normal"
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Enter a color name', "Color name must be unique", "Color is already used"]} />
                    <Button
                        className={classes.addColor}
                        variant='contained'
                        color='primary'
                        style={{ backgroundColor: paletteIsFull ? "gray" : currentColor }}
                        type="submit"
                        disabled={paletteIsFull} >
                        {paletteIsFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>

            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);