import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
    type: 'up' | 'down';
}


export const TouchableOpacityButton = styled(TouchableOpacity)`
    width: 48%;
    flex-direction: row;
    align-items: center;
    padding: 16px;

    border: 1.5px solid ${({theme}) => theme.colors.text};
    border-radius: 5px;
    justify-content: center;
`;

export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${({theme, type}) => 
    type === 'up' ? theme.colors.success : theme.colors.attention}
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};

`;