"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  ReactNode,
} from "react";

type RegisteredHeading = {
  id: string;
  level: number;
  text: string;
};

type HeadingIdContextType = {
  getOrCreateId: (instanceKey: string, baseId: string) => string;
  registerHeading: (
    instanceKey: string,
    id: string,
    level: number,
    text: string,
  ) => void;
  headings: RegisteredHeading[];
};

const HeadingIdContext = createContext<HeadingIdContextType | null>(null);

export function HeadingIdProvider({ children }: { children: ReactNode }) {
  // Using useRef ensures these maps persist across Strict Mode double-renders
  const idCountsRef = useRef<Map<string, number>>(new Map());
  const instanceIdsRef = useRef<Map<string, string>>(new Map());
  const registeredRef = useRef<Map<string, RegisteredHeading>>(new Map());

  // State to trigger re-renders when headings are registered
  const [headings, setHeadings] = useState<RegisteredHeading[]>([]);

  const getOrCreateId = useCallback(
    (instanceKey: string, baseId: string): string => {
      // If this instance already has an id, return it (handles re-renders)
      const existingId = instanceIdsRef.current.get(instanceKey);
      if (existingId !== undefined) {
        return existingId;
      }

      // Generate a new unique id
      const count = idCountsRef.current.get(baseId) ?? 0;
      idCountsRef.current.set(baseId, count + 1);

      const newId = count === 0 ? baseId : `${baseId}-${count}`;
      instanceIdsRef.current.set(instanceKey, newId);

      return newId;
    },
    [],
  );

  const registerHeading = useCallback(
    (instanceKey: string, id: string, level: number, text: string) => {
      // Only register if not already registered (handles re-renders)
      if (!registeredRef.current.has(instanceKey)) {
        registeredRef.current.set(instanceKey, { id, level, text });
        // Update state to trigger TOC re-render
        setHeadings(Array.from(registeredRef.current.values()));
      }
    },
    [],
  );

  return (
    <HeadingIdContext.Provider
      value={{ getOrCreateId, registerHeading, headings }}
    >
      {children}
    </HeadingIdContext.Provider>
  );
}

export function useHeadingId() {
  const context = useContext(HeadingIdContext);
  if (!context) {
    throw new Error("useHeadingId must be used within a HeadingIdProvider");
  }
  return context;
}
