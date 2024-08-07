import React from 'react'

// type ChangeHandler = React.ChangeEventHandler<HTMLInputElement>;

export interface AddressInputProps {
    classes?: string;
    label?: string;
    name?: string;
    submit?: string;
};

let makeID: () => string = (function () {
    let next: number = 0;
    return function (): string {
        return `x-address-input-description-${next++}`;
    }    
}());

const AddressInput: React.FunctionComponent<AddressInputProps> = (props: AddressInputProps): JSX.Element => {
    const name: string = props.name ?? "address";
    const label: string = props.label ?? "Address";
    const className = "input-group " + (props.classes ?? "");
    const button: JSX.Element = (props.submit != null)
        ? <button className="btn btn-outline-secondary" type="submit">{props.submit ?? "Submit"}</button>
        : <></>;

    const desc: string = makeID();

    function onInput(_event: React.FormEvent<HTMLInputElement>): void {
        // const x: HTMLInputElement = event.currentTarget;

        // x.setCustomValidity("");
        // if (x.validity.valueMissing) {
        //     x.setCustomValidity("Input field is empty, please provide an address.");
        // } else if (x.validity.tooShort) {
        //     x.setCustomValidity("Address is too short, should be 42 characters.");
        // } else if (x.validity.tooLong) {
        //     x.setCustomValidity("Address is too long, should be 42 characters.");
        // } else if (x.validity.patternMismatch) {
        //     x.setCustomValidity("Address contains invalid characters.");
        // } else if (!x.validity.valid) {
        //     x.setCustomValidity("Address is invalid.");
        // }
        // x.reportValidity();

        // console.log("ValidityState:");
        // console.log("    badInput:", x.validity.badInput);
        // console.log("    customError:", x.validity.customError);
        // console.log("    patternMismatch:", x.validity.patternMismatch);
        // console.log("    rangeOverflow:", x.validity.rangeOverflow);
        // console.log("    rangeUnderflow:", x.validity.rangeUnderflow);
        // console.log("    stepMismatch:", x.validity.stepMismatch);
        // console.log("    tooLong:", x.validity.tooLong);
        // console.log("    tooShort:", x.validity.tooShort);
        // console.log("    typeMismatch:", x.validity.typeMismatch);
        // console.log("    valid:", x.validity.valid);
        // console.log("    valueMissing:", x.validity.valueMissing);
    }

    return (
        <div className={className}>
            <span className="input-group-text" id={desc}>{label}</span>
            <input
                className="form-control"
                name={name}
                onInput={onInput}
                pattern="^0x[0-9a-fA-F]{40}$"
                placeholder="0x..."
                required
                minLength={42}
                maxLength={42}
                type="text"
                aria-label={label}
                aria-describedby={desc}/>
            {button}
            <div className="invalid-feedback">
                <div className="d-flex justify-content-center">
                    Please provide a valid Ethereum address.
                </div>
            </div>
        </div>
    );
}

export default AddressInput;
