// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import { useHttp } from "../../hooks/http.hook";
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { v4 as uuidv4 } from 'uuid';

import { heroAdd } from "../../actions";

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);

    const {request} = useHttp();

    const dispatch = useDispatch();

    const onSubmitHero = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
        .then(res => console.log(res))
        .then(dispatch(heroAdd(newHero)))
        .catch(err => console.log(err))

        setHeroDescr("");
        setHeroElement("");
        setHeroName("");
    }

    const renderSelectOptions = (filters, filtersLoadingStatus) => {
        switch(filtersLoadingStatus) {
            case 'loading':
                return <option>Загрузка элементов</option>
            case 'error':
                return <option>Ошибка загрузки</option>
        }

        return filters.map(({name, label}) => {
            if (filters && filters.length > 0 ) {
                if (name === 'all') return;

                return <option key={name} value={name}>{label}</option>;
            }
        })
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHero}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    value={heroDescr}
                    style={{"height": '130px'}}
                    onChange={(e) => setHeroDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option>Я владею элементом...</option>
                    {renderSelectOptions(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;