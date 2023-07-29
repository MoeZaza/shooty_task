import { ChangeEvent, useState } from "react";
import { POSTS_PER_PAGE } from "../../constants";
import { TextBox } from "../../elements";
import Pagination from "../../elements/Pagination/PaginationBar";
import useDebounce from "../../hooks/useDebounce";
import PostsData from "../../mocks/posts.json";
import AddPostBtn from "../Post/AddPostBtn";
import { IPostProps } from "../Post/Post";
import PostsList from "../Post/PostsList";

function SearchView(){

	const [posts, setPosts] = useState(PostsData);
	const [activePage, setActivePage] = useState(1);
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search, 500);
	const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.currentTarget.value);
	};

	const handleDelete = (postId: string) => {
		// let newList = posts.filter((post:IPostProps) => {
		// 	return post.id !== postId;
		// });
		// setPosts(newList);
        fetch('/jobs', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({postId})
          })
          .then((response) => response.json())
          .then((data) => setPosts(data))
          .catch((error) => console.error('Error fetching jobs:', error));
	};

    const handleAdd = async (newPost: IPostProps) => {
        fetch('/jobs', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost),
          })
          .then((response) => response.json())
          .then((data) => setPosts(data))
          .catch((error) => console.error('Error fetching jobs:', error));
    };
    

    return (
        <div id="search-view" className="h-100">

            <div className='flex'>
                <TextBox 
                    css="mr-10 grow-1" 
                    placeholder="Search By Job Title"
                    onChange={searchHandler}
                />
                <AddPostBtn savePost={handleAdd} />
            </div>

            <div style={{height: "90%", overflow: "auto"}}>
                <PostsList 
                    posts={posts} 
                    search={debouncedSearch} 
                    onDelete={handleDelete} 
                    pageNumber={activePage}
                />
                
            </div>
            <Pagination 
                moveNext={()=>{
                    setActivePage(activePage + 1);
                }}
                movePrev={()=>{
                    setActivePage(activePage - 1);
                }}
                total={Math.ceil(Object.keys(posts).length / POSTS_PER_PAGE)}
                activeIndex={activePage}
            />
        </div>
    );
}

export default SearchView;