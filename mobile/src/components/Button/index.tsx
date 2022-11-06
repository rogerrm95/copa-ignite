import { ReactNode } from "react";
import { Button as ButtonNativeBase, Text as TextNativeBase, IButtonProps, ITextProps } from "native-base";

interface ButtonRootProps extends IButtonProps {
    children: ReactNode,
    types?: 'PRIMARY' | 'SECONDARY'
}

// BOTÃO //
function ButtonRoot({ children, types = 'PRIMARY', ...rest }: ButtonRootProps) {
    return (
        <ButtonNativeBase
            w='full'
            h={14}
            rounded='sm'
            fontSize='md'
            textTransform="uppercase"
            bg={types === "SECONDARY" ? 'red.500' : "yellow.500"}
            _pressed={{
                bg: types === "SECONDARY" ? 'red.700' : "yellow.700"
            }}
            _loading={{
                _spinner: {
                    color: 'white',
                }
            }}
            {...rest}>
            {
                children
            }
        </ButtonNativeBase>
    )
}

// TEXTO DO BOTÃO //
interface ButtonTextProps extends ITextProps {
    label: string,
    types?: "PRIMARY" | "SECONDARY"
}

function ButtonText({ label, types, ...rest }: ButtonTextProps) {
    return (
        <TextNativeBase
            fontSize='sm'
            fontFamily="heading"
            textTransform="uppercase"
            color={types === "SECONDARY" ? 'white' : "black"}
            {...rest}>
            {label}
        </TextNativeBase>
    )
}

ButtonRoot.displayName = "Button.Root"
ButtonText.displayName = "Button.Text"

export const Button = {
    Root: ButtonRoot,
    Text: ButtonText,
}