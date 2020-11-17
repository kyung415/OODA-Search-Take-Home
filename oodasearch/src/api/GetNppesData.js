export async function getNppesDataFirstName (name) {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://npiregistry.cms.hhs.gov/api/?version=2.0&first_name=${name}&limit=20`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        return data.results
    })
    return response
}

export async function getNppesDataOrgName (name) {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://npiregistry.cms.hhs.gov/api/?version=2.0&organization_name=${name}&limit=20`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        return data.results
    })
    return response
}