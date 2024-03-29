import cn from 'classnames';

type BookmarkButtonProps = {
  isFavorite: boolean;
  type: string;
};

function BookmarkButton({ isFavorite: isFavourite, type }: BookmarkButtonProps) {
  const buttonDesc = isFavourite ? 'In bookmarks' : 'To bookmarks';

  return (
    <button
      className={cn('button', `${type}__bookmark-button`, {
        [`${type}__bookmark-button--active`]: isFavourite,
      })}
      type="button"
    >
      <svg className={`${type}__bookmark-icon`} width={18} height={19}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{buttonDesc}</span>
    </button>
  );
}

export const CardBookmarkButton = (
  props: Omit<BookmarkButtonProps, 'type'>
) => <BookmarkButton {...props} type="place-card" />;

export const OfferBookmarkButton = (
  props: Omit<BookmarkButtonProps, 'type'>
) => <BookmarkButton {...props} type="offer" />;
