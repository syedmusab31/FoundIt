import { ImageOff } from 'lucide-react';
import { useState } from 'react';
import { resolveAssetUrl } from '../../../lib/format';

const ItemImage = ({ src, alt, className = '' }) => {
  const [hasError, setHasError] = useState(false);
  const url = resolveAssetUrl(src);

  if (!url || hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}>
        <ImageOff size={32} aria-hidden="true" />
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
    />
  );
};

export default ItemImage;
