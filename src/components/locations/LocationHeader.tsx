import cn from 'classnames';
import { Link } from 'react-router-dom';

type LocationHeaderProps = {
  title: string;
  selected: boolean;
};

export default function LocationHeader({
  title,
  selected,
}: LocationHeaderProps) {
  return (
    <div className={cn('favorites__locations locations', {'locations--current': selected})}>
      <div className="locations__item">
        <Link className="locations__item-link" to="/">
          <span>{title}</span>
        </Link>
      </div>
    </div>
  );
}
