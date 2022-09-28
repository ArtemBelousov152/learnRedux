import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'

import {fetchHeroes, heroDel } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if (filter === "all") {
                return heroes
            } else {
                return heroes.filter(item => item.element === filter)
            }
        }
    );

    // const filteredHeroes = useSelector(state => {
    //     if (state.filters.activeFilter === "all") {
    //         return state.heroes.heroes
    //     } else {
    //         return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter)
    //     }
    // });
    const filteredHeroes = useSelector(filteredHeroesSelector);
    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));

        // eslint-disable-next-line
    }, []);

    const onDelete = (id) => {
        request(`http://localhost:3001/heroes/${id}`,"DELETE")
        .then(dispatch(heroDel(id)))
        .catch(err => console.log(err))
    }

    switch(heroesLoadingStatus) {
        case "loading":
            return <Spinner/>
        case "error": 
            return <h5 className="text-center mt-5">Ошибка загрузки</h5>
        default: <h5 className="text-center mt-5">Неизвестное состояние</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} onDelete={() => onDelete(id)} {...props}/>
        })
    }

    return (
        <ul>
            {renderHeroesList(filteredHeroes)}
        </ul>
    )
}

export default HeroesList;