import { LegacyRef, useState } from "react";
import { useFilter } from "../../AppContext";
import { Select, TextBox } from "../../elements";

export default function AddPostForm({formRef}: {formRef: LegacyRef<HTMLFormElement>}){
    const {initState, staticDataCountries} = useFilter();
    const countries = Object.keys(initState.countries);
    const [selectedCountry, setCountry] = useState("");
    const getCities = function (){
        const country = staticDataCountries.find((country) => {
            return country.id === selectedCountry;
        });
        return country ? country.cities : [];
    };
    
    return (
        <form ref={formRef}>
            <div className="flex inline-controls mt-10">
                <TextBox 
                    name="title"
                    placeholder='Job title'
                    css="w-48 mr-10"
                    
                />
                
                <Select 
                    name="Sector" 
                    css="w-48"
                    options={Object.keys(initState.sectors)}
                />
                
            </div>
            <div className="flex mt-10">
                <Select 
                    name="Country" 
                    options={countries}
                    css="w-50 mr-10"
                    onChange={(e) => setCountry(e.target.value)}
                />

                <Select 
                    name="City" 
                    options={getCities()}
                    css="w-48"
                />

            </div>
            <div className="flex mt-10">
                <textarea 
                    required
                    placeholder='Description' 
                    name="desc" 
                    className="w-100" 
                    rows={5}
                    style={{resize: "none"}}
                >

                </textarea>
            </div>

        </form>
    )
}