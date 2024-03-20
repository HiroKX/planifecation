import React, {ReactNode, useState} from 'react';
import TextInputTemplate from './TextInputTemplate';
import { HelperText } from 'react-native-paper';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { StyleProp, TextStyle } from 'react-native';

type FormValues = {
    password: string;
};
type PasswordConfirmInputProps = {
    control: Control<any>;
    errors: FieldErrors<FormValues>;
    style?: StyleProp<TextStyle>;
};

export default function PasswordInputRandomized(
    props: Readonly<PasswordConfirmInputProps>
): ReactNode {
    const randomize = require('randomatic');
    const [word] = useState(randomize('*', 16));

    return (
        <Controller
            control={props.control}
            rules={{
                required: 'Ce champ est requis',
                validate: (val: string) => {
                    if (val != word) {
                        return 'Le mot de passe doit être ' + word;
                    }
                },
            }}
            render={({
                         field: { onChange, onBlur, value },
                         fieldState: { error },
                     }) => (
                <>
                    <TextInputTemplate
                        style={props.style ?? undefined}
                        label="Mot de passe"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={true}
                    />
                    {props.errors.password && (
                        <HelperText type="error">
                            {props.errors.password?.message}
                        </HelperText>
                    )}
                </>
            )}
            name="password"
        />
    );
}
