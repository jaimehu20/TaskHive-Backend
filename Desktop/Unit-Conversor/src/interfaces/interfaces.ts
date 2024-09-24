export interface FavoriteConversion {
    from: string,
    fromUnit: string,
    to: string,
    toUnit: string
}

export interface FavoriteState {
    favoriteConversions : FavoriteConversion[];
}

export interface FavoriteConversionProps {
    setMyConversions : React.Dispatch<React.SetStateAction<FavoriteConversion[]>>,
    myConversions: FavoriteConversion[]
}