import React, {useState} from 'react'

import SearchRow from './SearchRow'
import './Search.css'

import { getNppesDataFirstName, getNppesDataOrgName } from '../api/GetNppesData' 

const Search = () => {

    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [toggleValue, setToggleValue] = useState('Name')
    const [showNameSearchResults, setShowNameSearchResults] = useState(false)
    const [showOrgSearchResults, setShowOrgSearchResults] = useState(false)

    function searchBarTyped (e) {
        setSearchText(e.target.value)
    }

    async function searchButtonClicked () {
        //getNppesDataFirstName(searchText)
        if (toggleValue === 'Name') {
            console.log('Search Name')
            let response = await getNppesDataFirstName(searchText)
            console.log(response)
            setShowNameSearchResults(true)
            setShowOrgSearchResults(false)
            setSearchResults(response)
        }
        else {
            console.log('Search Org')
            let response = await getNppesDataOrgName(searchText)
            console.log(response)
            setShowOrgSearchResults(true)
            setShowNameSearchResults(false)
            setSearchResults(response)
        }
        setSearchText('')
    }

    function toggleButtonClicked () {

        if (toggleValue === 'Name') {
            setToggleValue('Org')
        }
        else {
            setToggleValue('Name')
        }

    }

    function searchResultClicked (data) {
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
                            ? searchResults.map((result) => {
                                let name = `${result.basic.first_name}  ${result.basic.last_name}`
                                return (
                                    <div style={{width: '100%'}} onClick={() => searchResultClicked(result)}><SearchRow name={name} /></div>
                                )
                            })
                            : <div></div>
                        }
                        {showOrgSearchResults
                            ? searchResults.map((result) => {
                                console.log(result)
                                let name = result.basic.organization_name
                                return (
                                    <div style={{width: '100%'}} onClick={() => searchResultClicked(result)}><SearchRow name={name} /></div>
                                )
                            })
                            : <div></div>
                        }
                    </div>
                </div>
                <button id='toggleButton' onClick={toggleButtonClicked}>{toggleValue}</button>
                <button id='searchButton' onClick={searchButtonClicked}>Search</button>
            </div>
        </div>
    )
}

export default Search;