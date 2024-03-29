import { UserData } from '../../entities/User';
import cn from 'classnames';

type UserAvatarProps = {
  user: UserData;
  type: string;
  alt: string;
  size: number;
  className?: string;
};


function UserAvatar({ user, type, alt, className, size }: UserAvatarProps) {
  return (
    <div className={cn(className, 'user')}>
      <div
        className={cn(`${type}__avatar-wrapper`, 'user__avatar-wrapper', {
          'offer__avatar-wrapper--pro': type === 'offer' && user.isPro,
        })}
      >
        <img
          className={cn(`${type}__avatar `, 'user__avatar')}
          src={user.avatarUrl}
          width={size}
          height={size}
          alt={alt}
        />
      </div>
      <span className={`${type}__user-name`}>{user.name}</span>
      {type === 'offer' && user.isPro && (
        <span className={`${type}__user-status`}>Pro</span>
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
