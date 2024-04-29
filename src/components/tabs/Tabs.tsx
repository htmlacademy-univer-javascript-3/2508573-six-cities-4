import { Link } from 'react-router-dom';
import { AppRoutes } from '../../Constants';
import cn from 'classnames';

const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export default function Tabs({ selectedCity }: { selectedCity: string }) {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((c) => (
            <li key={c} className="locations__item">
              <Link
                to={AppRoutes.Main}
                className={cn('locations__item-link', 'tabs__item', {
                  ['tabs__item--active']: c === selectedCity,
                })}
              >
                <span>{c}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
