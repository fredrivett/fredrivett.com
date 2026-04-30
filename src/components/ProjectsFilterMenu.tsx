import React from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown } from "lucide-react";

import { PROJECT_STATES, type ProjectState } from "data/projects";

import Button from "components/Button";

interface Props {
  visibleStates: Set<ProjectState>;
  onToggle: (state: ProjectState) => void;
}

const ProjectsFilterMenu: React.FC<Props> = ({ visibleStates, onToggle }) => {
  const visibleCount = visibleStates.size;
  const totalCount = PROJECT_STATES.length;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="secondary" size="sm" className="gap-1.5">
          Filter
          <span className="opacity-60">
            {visibleCount}/{totalCount}
          </span>
          <ChevronDown className="w-4 h-4 opacity-60" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={4}
          className="min-w-[180px] rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-1 shadow-md z-50"
        >
          {PROJECT_STATES.map((state) => (
            <DropdownMenu.CheckboxItem
              key={state}
              checked={visibleStates.has(state)}
              onCheckedChange={() => onToggle(state)}
              onSelect={(e) => e.preventDefault()}
              className="relative flex items-center pl-7 pr-3 py-1.5 text-sm rounded cursor-pointer outline-none hover:bg-gray-100 dark:hover:bg-gray-900 focus:bg-gray-100 dark:focus:bg-gray-900"
            >
              <DropdownMenu.ItemIndicator className="absolute left-2 inline-flex">
                <Check className="w-3.5 h-3.5" />
              </DropdownMenu.ItemIndicator>
              {state}
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProjectsFilterMenu;
