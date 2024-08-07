import React from "react";
import { Form } from "react-router-dom";

import AddressInput from "./AddressInput";

export interface AddressFormProps {
    classes?: string;
};

const AddressForm: React.FunctionComponent<AddressFormProps> = (props: AddressFormProps): JSX.Element => {
    const className: string = props.classes ?? "";

    function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
        const form: HTMLFormElement = event.currentTarget;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        event.currentTarget.classList.add("was-validated");
    }

    return (
        <Form method="POST" className={className} onSubmit={onSubmit}>
            <AddressInput submit="Get Logs" />
        </Form>
    );
};

export default AddressForm;
