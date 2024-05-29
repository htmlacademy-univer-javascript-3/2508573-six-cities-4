import { Link } from 'react-router-dom';
import { AppRoutes } from '../../Constants';
import cn from 'classnames';
import { Cities } from '../../Constants';

type TabsProps = {
  selectedCity: string;
  onClick: (city: string) => void;
}

export default function Tabs({ selectedCity, onClick }: TabsProps) {
  return (
    <div className="tabs" data-testid="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Cities.map((city) => (
            <li key={city} className="locations__item">
              <Link
                to={AppRoutes.Main}
                className={cn('locations__item-link', 'tabs__item', {
                  ['tabs__item--active']: city === selectedCity,
                })}
                onClick={() => onClick(city)}
                data-testid={`tabs-item-${city}`}
              >
                <span>{city}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
