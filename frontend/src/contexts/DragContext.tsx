import { MutableRefObject, ReactNode, createContext, useContext, useRef, useState } from "react";

type DragContextType = {
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  draggedCard: { id: number; categoryId: number; title: string; content: string; nickname: string; rect: DOMRect } | null;
  setDraggedCard: (card: { id: number; categoryId: number; title: string; content: string; nickname: string; rect: DOMRect } | null) => void;
  dragOffset: { x: number; y: number } | null;
  setDragOffset: (offset: { x: number; y: number } | null) => void;
  dragPosition: { x: number; y: number; categoryId: number; index: number } | null;
  setDragPosition: (position: { x: number; y: number; categoryId: number; index: number } | null) => void;
  coordinates: MutableRefObject<{ id: number; xMid: number; top: number; bottom: number; cards: { id: number; mid: number }[] }[]>;
};

type DragProviderProps = {
  children: ReactNode;
};

const DragContext = createContext<DragContextType | undefined>(undefined);

export const useDragContext = (): DragContextType => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error("useDragContext must be used within a DragProvider");
  }
  return context;
};

export default function DragProvider({ children }: DragProviderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedCard, setDraggedCard] = useState<{
    id: number;
    categoryId: number;
    title: string;
    content: string;
    nickname: string;
    rect: DOMRect;
  } | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number; categoryId: number; index: number } | null>(null);
  const coordinates = useRef<{ id: number; xMid: number; top: number; bottom: number; cards: [{ id: number; mid: number }] }[]>([]);

  const value = {
    isDragging,
    setIsDragging,
    draggedCard,
    setDraggedCard,
    dragOffset,
    setDragOffset,
    dragPosition,
    setDragPosition,
    coordinates,
  };

  return <DragContext.Provider value={value}>{children}</DragContext.Provider>;
}
