import { HStack } from 'native-base';
import { useState } from 'react';
import CountryFlag from "react-native-country-flag";

import { Input } from '../Input/Input';

interface Props {
  code: string;
  position: 'left' | 'right';
  onChangeText: (value: string) => void;
  value?: number | null
}

export function Team({ code, position, value = null, onChangeText }: Props) {
  const [points, setPoints] = useState(value)

  return (
    <HStack alignItems="center">
      {position === 'left' && <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />}

      {
        !value ?
          (
            <Input
              w={10}
              h={9}
              textAlign="center"
              fontSize="xs"
              keyboardType="numeric"
              onChangeText={onChangeText}
            />
          )
          :
          (
            <Input
              w={10}
              h={9}
              textAlign="center"
              fontSize="xs"
              value={value.toString()}
              isReadOnly
            />
          )
      }



      {position === 'right' && <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />}
    </HStack>
  );
}