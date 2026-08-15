import React from "react";

import Button from "components/Button";

interface Props {
  showArchived: boolean;
  archivedCount: number;
  onToggle: (show: boolean) => void;
}

const ArchivedToggle: React.FC<Props> = ({
  showArchived,
  archivedCount,
  onToggle,
}) => {
  if (archivedCount === 0) return null;

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => onToggle(!showArchived)}
      aria-pressed={showArchived}
    >
      {showArchived ? "Hide" : "Show"} {archivedCount} archived
    </Button>
  );
};

export default ArchivedToggle;
