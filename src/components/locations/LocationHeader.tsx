import cn from 'classnames';

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
        <a className="locations__item-link" href="#">
          <span>{title}</span>
        </a>
      </div>
    </div>
  );
}
