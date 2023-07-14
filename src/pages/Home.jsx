import { useEffect, useState } from 'react';
import axios from 'axios';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

    async function fetchData() {
      try {
        const itemsResponse = await axios.get(
          `https://64aea1a3c85640541d4d6f3a.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
        );
        setItems(itemsResponse.data);
      } catch (e) {
        alert('Ошибка при запросе данных :(');
        console.error(e);
      }
      setIsLoading(false);
    }
    fetchData();

    // переместиться в начало страницы
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className={'container'}>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={i => setCategoryId(i)} />
        <Sort value={sortType} onChangeSort={i => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};
