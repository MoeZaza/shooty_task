import { Categories, ICountry, ISectors, IState, useFilter } from "../../AppContext";
import { POSTS_PER_PAGE } from "../../constants";
import Post, { IPostProps } from "./Post";

export interface IPostsListProps {
    posts: IPostProps[], 
    search: string,
    pageNumber: number;
    onDelete: (postId: string) => void
}

export default function PostsList({posts, search, onDelete, pageNumber}: IPostsListProps){

    const {initState} = useFilter();

    let isFilterEnabled = false;

    let allFilter = {
        sectors: false,
        countries: false,
        cities: false
    };
    
    Object.keys(initState).forEach(key => {
        let category = initState[key as keyof IState];
        for (const cat in category){
            let filter = category[cat as Categories];
            if(filter){
                isFilterEnabled = true;
                allFilter[key as keyof IState] = true;
                break;
            }
        }
    });
        
    const filteredList = posts.map(function(post, idx){
        let xCountry = post.location.country as keyof ICountry;
        let xCity = post.location.city;
        let xSector = post.sector as keyof ISectors;
        
        // if this post match with one of the selected country filter 
        // and if match with a city filter or in case no city filter applied
        // and if match with a sector filter or in case no sector filter applied

        let matchCountry = initState.countries[xCountry] && 
        (initState.cities[xCity] || !allFilter.cities) && 
        (initState.sectors[xSector] || !allFilter.sectors);

        let matchCity = initState.cities[xCity] && 
        (initState.countries[xCountry] || !allFilter.countries) && 
        (initState.sectors[xSector] || !allFilter.sectors);

        let matchSector = initState.sectors[xSector] && 
        (initState.countries[xCountry] || !allFilter.countries) && 
        (initState.cities[xCity] || !allFilter.cities);
        
        if(
            (!isFilterEnabled || matchCountry || matchSector || matchCity) && 
            (post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 || search.length === 0)
        ){
            return post;
        }
        return null;
    });
    
    // let numberOfPages = Math.ceil(Object.keys(filteredList).length / POSTS_PER_PAGE);
    let endPoint = pageNumber * POSTS_PER_PAGE
    let startingPoint = endPoint - POSTS_PER_PAGE;
    let pagedPosts = [];
    for(; startingPoint < endPoint; startingPoint++){
        let xPost = filteredList[startingPoint];
        xPost && pagedPosts.push( 
            <div key={xPost?.id} className="mt-10">           
                <Post {...xPost} onDelete={onDelete}/>
            </div>
        )
    }
    return (
        <>
            {/* <div>Total: {posts.length} </div> */}
            {pagedPosts}
        </>
    );
}