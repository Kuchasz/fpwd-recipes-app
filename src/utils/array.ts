import {getRandomInteger} from "./number";

export const getArrayFromRange = (range: number) => Array.from(Array(range)).map((_, index) => index);

export const gerRandomArrayItem = <T>(arr: T[]) => arr[getRandomInteger(arr.length)];

export const removeDuplicates = <T, U>(array: T[], identityAccessor: (item: T) => U) => {
    const uniqueItems = new Set<U>(array.map((item) => identityAccessor(item)));
    return Array.from(uniqueItems).map(identity => array.filter(item => identityAccessor(item) == identity)[0]);
};