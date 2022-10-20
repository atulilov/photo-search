import { useState, useRef, useEffect } from "react";

interface UseIntersectProps {
  rootMargin: string;
  threshold: number | number[] | undefined;
  root?: Document | Element | null | undefined;
}

const useIntersect = ({
  root = null,
  rootMargin,
  threshold = 0
}: UseIntersectProps) => {
  const [entry, updateEntry] = useState<any>({});
  const [node, setNode] = useState<any>(null);

  const observer = useRef<any>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver(
      ([ioEntry]) => updateEntry(ioEntry),
      {
        root,
        rootMargin,
        threshold
      }
    );

    const { current: currentObserver } = observer;

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, root, rootMargin, threshold]);

  return [setNode, entry];
};

export default useIntersect;
