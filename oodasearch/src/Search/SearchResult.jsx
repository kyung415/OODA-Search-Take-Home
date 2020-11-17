import React from 'react'

import './SearchResult.css'

//Address Info Component
const AddressInfo = (props) => {
    let addressInfo = props.addressInfo

    return (
        <div>
            <div>
                {addressInfo.address_1}
                <br />
                {addressInfo.address_2}
                <br />
                {addressInfo.city}, {addressInfo.state} {addressInfo.postal_code}
                <br />
                {addressInfo.telephone_number}
            </div>
        </div>
    )
}

const SearchResult = (props) => {

    let data = props.data
    let type = props.type

    let name = type === 'name'
                    ? <tr>
                        <td>Name</td>
                        <td>{data.basic.first_name} {data.basic.last_name} </td>
                    </tr>
                    : <tr>
                        <td>Name</td>
                        <td>{data.basic.organization_name} </td>
                    </tr>
    
    return (
        <div id='searchResult'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {name}
                    <tr>
                        <td>NPI</td>
                        <td>{data.number}</td>
                    </tr>
                    <tr>
                        <td>Location</td>
                        <td><AddressInfo addressInfo={data.addresses[0]} /></td>
                    </tr>
                    <tr>
                        <td>Mailing Address</td>
                        <td><AddressInfo addressInfo={data.addresses[1]} /></td>
                    </tr>
                    <tr>
                        <td>URL</td>
                        <td>
                            {'endpoints' in data
                                ? data.endpoints.endpoint
                                : 'No URL Available'
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SearchResult;