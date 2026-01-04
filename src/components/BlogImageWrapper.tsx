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
      let columnsClass = "columns-1";
      if (columns === 2) columnsClass = "columns-2";
      if (columns === 3) columnsClass = "columns-3";
      return (
        <div className={`${columnsClass} last-mb-0`}>
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

    const gridColsClass = columns === 2 ? "grid-cols-2" : "grid-cols-3";
    return (
      <div className={`grid ${gridColsClass} gap-4`}>
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
