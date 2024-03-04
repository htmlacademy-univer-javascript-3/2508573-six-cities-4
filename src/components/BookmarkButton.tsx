type BookmarkButtonProps = {
    isFavourite: boolean;
}

export function BookmarkButton({ isFavourite }: BookmarkButtonProps) {
  const buttonDesc = isFavourite ? 'In bookmarks' : 'To bookmarks';

  return (
    <button
      className={`place-card__bookmark-button ${isFavourite ? 'place-card__bookmark-button--active' : ''} button`}
      type="button"
    >
      <svg
        className="place-card__bookmark-icon"
        width={18}
        height={19}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{buttonDesc}</span>
    </button>
  );
}
