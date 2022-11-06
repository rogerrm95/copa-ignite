import { Text, ITextProps } from "native-base";

interface HeadingProps extends ITextProps {
    title: string
}

export function Heading({ title, ...rest }: HeadingProps) {
    return (
        <Text {...rest}>
            {
                title
            }
        </Text>
    )
}