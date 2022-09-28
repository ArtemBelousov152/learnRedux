// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid';

import { useHttp } from "../../hooks/http.hook"
import { fetchFilters, changeActiveFilter} from "../../actions"
import Spinner from "../spinner/Spinner"
import classNames from "classnames";

const HeroesFilters = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();

    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);

    useEffect(() => {
        dispatch(fetchFilters(request))
    },[])

    switch(filtersLoadingStatus ) {
        case "loading":
            return <Spinner/>
        case "error": 
            return <h5 className="text-center mt-5">Ошибка загрузки</h5>
        default: <h5 className="text-center mt-5">Неизвестное состояние</h5>
    }

    const renderFilterElements = (arr) => {
        if(arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры отсутствуют</h5>
        }

        return arr.map(({name, label, className}) => {
            const btnClass = classNames('btn', className,{
                'active': name === activeFilter
            })
            return <button
                key={uuidv4()}
                id={name}
                className={btnClass}
                onClick={() => dispatch(changeActiveFilter(name))}
                >{label}</button>
        })
    }

    const elements = renderFilterElements(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;