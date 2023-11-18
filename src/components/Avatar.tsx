
import styles from './Avatar.module.css';

interface AvatarProps {
  hasBorder?: boolean;
  src: string;
  alt?: string;
}

function Avatar({ src, hasBorder = true, alt}: AvatarProps) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
      alt={alt}
    />
  );
}

export default Avatar;
