import {getRandomInteger} from "./number";
import {isNumber} from "util";

type Enum = { [id: number]: string };

export const getRandomEnum: <T>(Enum) => T = <T>(enumType: Enum) => {
    const enumValues = Object.values(enumType).filter(i => isNumber(i));
    return <T>enumValues[getRandomInteger(enumValues.length)];
};

export const getAllValues: <T>(Enum) => T[] = <T>(enumType: Enum) => Object.values(enumType).filter((i: T) => isNumber(i)) as T[];