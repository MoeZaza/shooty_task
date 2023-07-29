import './App.css';
import { FilterProvider } from './AppContext';
import { Filter } from './components';
import SearchView from './components/SearchView/SearchView';


function App() {
	
	return (
		<div className='flex p-20 h-100'>
			<FilterProvider>
				<Filter />
				
				<div className='grow-1'>
					<SearchView />
				</div>
				
			</FilterProvider>
		</div>
	);
}

export default App;
