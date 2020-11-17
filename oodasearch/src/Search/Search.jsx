import React, {useState} from 'react'

import SearchRow from './SearchRow'
import SearchResult from './SearchResult'
import './Search.css'

import { getNppesDataFirstName, getNppesDataOrgName } from '../api/GetNppesData' 

const Search = () => {

    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [toggleValue, setToggleValue] = useState('Name')
    const [selectedValue, setSelectedValue] = useState({})
    const [showNameSearchResults, setShowNameSearchResults] = useState(false)
    const [showOrgSearchResults, setShowOrgSearchResults] = useState(false)

    //Search bar input onchange function.
    function searchBarTyped (e) {
        setSearchText(e.target.value)
        setShowNameSearchResults(false)
        setShowOrgSearchResults(false)
    }

    //Search button clicked. Based on toggle value, call GET request with organization name or first name.
    //No results will so an empty results message.
    async function searchButtonClicked () {
        var response
        if (toggleValue === 'Name') {
            response = await getNppesDataFirstName(searchText)
            setShowNameSearchResults(true)
            setShowOrgSearchResults(false)
        }
        else {
            response = await getNppesDataOrgName(searchText)
            setShowOrgSearchResults(true)
            setShowNameSearchResults(false)
        }
        if (response.length === 0) {
            setSearchResults(['No results found'])
        }
        else {
            setSearchResults(response)
        }
        setSearchText('')
    }

    //Switches search between keyword for first name or organization name.
    function toggleButtonClicked () {

        if (toggleValue === 'Name') {
            setToggleValue('Org')
        }
        else {
            setToggleValue('Name')
        }

    }

    //Clicked search row. Hides search results and shows table with additional information.
    function searchResultClicked (data) {
        setSelectedValue(data)
        setShowNameSearchResults(false)
        setShowOrgSearchResults(false)
    }

    return (
        <div id='search'>
            <div id='searchHeader'>
                <div id='searchInputContainer'>
                    <input placeholder='Search org or first name' onChange={(e) => searchBarTyped(e)} value={searchText}></input>
                    <div id='searchResultsContainer'>
                        {showNameSearchResults
                            ? searchResults.map((result, index) => {
                                //If no results, show no results message.
                                if (result === 'No results found') {
                                    return <SearchRow name={result} key={`none_${index}`} />
                                }
                                let name = `${result.basic.first_name}  ${result.basic.last_name}`
                                return (
                                    <div style={{width: '100%'}} onClick={() => searchResultClicked(result)} key={`${result.basic.first_name}_${result.basic.last_name}_${index}`}><SearchRow name={name} /></div>
                                )
                            })
                            : <div></div>
                        }
                        {showOrgSearchResults
                            ?
                            searchResults.map((result, index) => {
                                //If no results, show no results message.
                                if (result === 'No results found') {
                                    return <SearchRow name={result} key={`none_${index}`} />
                                }
                                let name = result.basic.organization_name
                                return (
                                    <div style={{width: '100%'}} onClick={() => searchResultClicked(result)} key={`${result.basic.organization_name}_${index}`}><SearchRow name={name} /></div>
                                )
                            })
                            : <div></div>
                        }
                    </div>
                </div>
                <button id='toggleButton' onClick={toggleButtonClicked}>{toggleValue}</button>
                <button id='searchButton' onClick={searchButtonClicked}>Search</button>
            </div>
            {Object.keys(selectedValue).length !== 0
                ? <div id='searchBody'>
                    {'organization_name' in selectedValue.basic
                        ? <SearchResult data={selectedValue} type='org' />
                        : <SearchResult data={selectedValue} type='name' />
                    }
                </div>
                : <div></div>
            }
        </div>
    )
}

export default Search;