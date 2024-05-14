import cn from 'classnames';
import { FavoriteData } from '../../entities/FavoriteData';
import { useAppDispatch } from '../../store/hooks';
import { changeFavoriteStatusAction } from '../../store/ApiActions';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../Constants';

type BookmarkButtonProps = FavoriteData & {
  type: string;
};

function BookmarkButton({ offerId, isFavorite, type }: BookmarkButtonProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const addToFavorites = () => {
    dispatch(changeFavoriteStatusAction({ offerId, isFavorite: !isFavorite }))
      .unwrap()
      .catch(() => navigate(AppRoutes.Login));
  };

  const buttonDesc = isFavorite ? 'In bookmarks' : 'To bookmarks';

  return (
    <button
      className={cn('button', `${type}__bookmark-button`, {
        [`${type}__bookmark-button--active`]: isFavorite,
      })}
      type="button"
      onClick={addToFavorites}
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
