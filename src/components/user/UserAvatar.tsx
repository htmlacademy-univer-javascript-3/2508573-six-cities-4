import { UserData } from '../../entities/User';
import cn from 'classnames';

type UserAvatarProps = {
  user: UserData;
  type: string;
  alt: string;
  size: number;
  className?: string;
};


export function UserAvatar({ user, type, alt, className, size }: UserAvatarProps) {
  return (
    <div className={cn(className, 'user')} data-testid="user-container">
      <div
        className={cn(`${type}__avatar-wrapper`, 'user__avatar-wrapper', {
          'offer__avatar-wrapper--pro': type === 'offer' && user.isPro,
        })}
        data-testid="user__avatar"
      >
        <img
          className={cn(`${type}__avatar `, 'user__avatar')}
          src={user.avatarUrl}
          width={size}
          height={size}
          alt={alt}
          data-testid="user__avatar-image"
        />
      </div>
      <span className={`${type}__user-name`} data-testid="user__name">{user.name}</span>
      {type === 'offer' && user.isPro && (
        <span className={`${type}__user-status`} data-testid="user__status">Pro</span>
      )}
    </div>
  );
}

export const OfferUserAvatar = (props: Omit<UserAvatarProps, 'type' | 'size'>) => (
  <UserAvatar {...props} type="offer" size={74} />
);

export const ReviewUserAvatar = (props: Omit<UserAvatarProps, 'type' | 'size'>) => (
  <UserAvatar {...props} type="reviews" size={54} />
);
