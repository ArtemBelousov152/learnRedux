export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filterFetching());
    request("http://localhost:3001/filters")
        .then(res => dispatch(filterFetched(res)))
        .catch(() => filterFetchingError())
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroAdd = (hero) => {
    return {
        type: "HERO_ADD",
        payload: hero
    }
}

export const heroDel = (id) => {
    return {
        type: "HERO_DEL",
        payload: id
    }
}

export const filterFetching = () => {
    return {
        type: "FILTER_FETCHING",
    }
}

export const filterFetched = (filters) => {
    return {
        type: "FILTER_FETCHED",
        payload: filters
    }
}

export const filterFetchingError = () => {
    return {
        type: "FILTER_FETCHING_ERROR",
    }
}

export const changeActiveFilter = (name) => {
    return {
        type: "CHANGE_ACTIVE_FILTER",
        payload: name
    }
}

// export const changeActiveFilter = (name) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: "CHANGE_ACTIVE_FILTER",
//             payload: name
//         })
//     }, 1000)
// }