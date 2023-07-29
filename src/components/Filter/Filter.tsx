import { ChangeEvent } from "react";
import { Categories, IState, useFilter } from "../../AppContext";
import { LOCALES } from "../../constants";
import { Checkbox } from "../../elements";
import "./Filter.css";

export default function Filter(){
    const {initState, setFilter, staticDataCountries} = useFilter();

    const handleChange = (category: keyof IState) => (event: ChangeEvent<HTMLInputElement>) => {
        let newFilter: IState;
        
        newFilter = {
            ...initState, 
            [category]: {
                ...initState[category], 
                [event.currentTarget.id]: event.currentTarget.checked
            }
        };
        
        setFilter(newFilter);
    }

    const renderCheckbox = function(sector: Categories, category: keyof IState){

        let id = sector;
        let value = initState[category][id];
        return (
            <Checkbox 
                key={id} 
                id={id} 
                label={LOCALES[id]} 
                value={value} 
                onChange={handleChange(category)} 
            />
        )
    }
    
    return (
        <div className="filter">
            <div>
                <h1>Sector</h1>

                {Object.keys(initState.sectors).map( (sector) => {
                    return renderCheckbox(sector as Categories, "sectors")
                })}
            </div>

            <div>
                <h1>Counrty</h1>

                {Object.keys(initState.countries).map( (country) => {
                    return renderCheckbox(country as Categories, "countries")
                })}
            </div>

            <div>
                <h1>City</h1>

                {staticDataCountries.map( (country) => {
                    if(initState.countries[country.id]){
                        return country.cities.map((city)=>{
                            return renderCheckbox(city as Categories, "cities")
                        });
                    }
                    return null;
                })}
            </div>
            
        </div>
    )
}