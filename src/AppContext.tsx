import { Dispatch, ReactNode, createContext, useContext, useState } from "react";
import CountriesData from "./mocks/countries.json";
import SectorsData from "./mocks/sectors.json";

export interface ISectors {
    SALES: boolean;
    AIRLINES: boolean;
    ADMINSTRATION: boolean;
    SOFTWARE: boolean;
}

export interface ICountry {
    id: string;
    cities: string[];
}
export interface ObjectLiteral {
    [key: string]: boolean;
}
export type Categories = keyof ISectors /* & keyof ICity & keyof ICountry */;

export interface IState {
    sectors: ObjectLiteral,
    countries: ObjectLiteral,
    cities: ObjectLiteral
}

interface IAppState {
	initState: IState;
	setFilter: Dispatch<IState>;
    staticDataCountries: ICountry[];
}

const AppContext = createContext<IAppState | undefined>(undefined);

export function FilterProvider({children}: {children: ReactNode}) {

    const enumCountries: ObjectLiteral = {}; 
    CountriesData.forEach((country) => {
        enumCountries[country.id] = false;
    });

    const enumSectors: ObjectLiteral = {}; 
    SectorsData.forEach((sector) => {
        enumSectors[sector.id] = false;
    });

    const [initState, setFilter] = useState<IState>({
        sectors: enumSectors,
        countries: enumCountries,
        cities: {
        }
    });

    const value = {
        initState, 
        setFilter, 
        staticDataCountries: CountriesData
    };
    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export function useFilter() {
	const context = useContext(AppContext);

	if (context === undefined) {
	    throw new Error('No Provider');
	}

	return context;
}