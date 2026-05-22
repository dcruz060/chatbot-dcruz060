import { useState } from "react";

interface ProjectImageToggleProps {
  imageSrc: string;
  projectName: string;
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`chevron-icon ${open ? "chevron-open" : ""}`}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectImageToggle({ imageSrc, projectName }: ProjectImageToggleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="project-image-block">
      <button
        type="button"
        className="project-image-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={`project-img-${projectName.replace(/\s+/g, "-")}`}
      >
        <span>View Image</span>
        <IconChevron open={open} />
      </button>
      {open && (
        <img
          id={`project-img-${projectName.replace(/\s+/g, "-")}`}
          src={imageSrc}
          alt={projectName}
          className="project-image"
        />
      )}
    </div>
  );
}
