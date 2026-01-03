import React from "react";

interface BlogImage {
  src: string;
  alt: string;
}

interface BlogImageWrapperProps {
  images: BlogImage[];
  columns?: 1 | 2 | 3;
  caption?: React.ReactNode;
  layout?: "grid" | "columns";
}

const BlogImageWrapper: React.FC<BlogImageWrapperProps> = ({
  images,
  columns = 1,
  caption,
  layout = "grid",
}) => {
  const renderImages = () => {
    if (layout === "columns") {
      return (
        <div className={`columns-${columns} last-mb-0`}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="rounded-xl mb-4"
            />
          ))}
        </div>
      );
    }

    // grid layout
    if (columns === 1) {
      return (
        <>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="rounded-xl mb-4"
            />
          ))}
        </>
      );
    }

    return (
      <div className={`grid grid-cols-${columns} gap-4`}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="rounded-xl w-full"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="blog-img-wrapper">
      {renderImages()}
      {caption && <div className="blog-img-wrapper__desc">{caption}</div>}
    </div>
  );
};

export default BlogImageWrapper;
