import { CSSProperties, ReactNode, createContext, useContext, useState } from "react";

type DragContextType = {
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  draggedCard: { id: number; categoryId: number; title: string; content: string; nickname: string; rect: DOMRect } | null;
  setDraggedCard: (card: { id: number; categoryId: number; title: string; content: string; nickname: string; rect: DOMRect } | null) => void;
  dragOffset: { x: number; y: number } | null;
  setDragOffset: (offset: { x: number; y: number } | null) => void;
  dragPosition: { x: number; y: number; categoryId: number; index: number } | null;
  setDragPosition: (position: { x: number; y: number; categoryId: number; index: number } | null) => void;
  coordinates: { id: number; left: number; right: number; top: number; bottom: number; cards: { id: number; mid: number }[] }[];
  setCoordinates: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        left: number;
        right: number;
        top: number;
        bottom: number;
        cards: {
          id: number;
          mid: number;
        }[];
      }[]
    >
  >;
  getCardCenter: (x: number, y: number) => { x: number; y: number };
  draggedCardStyle: CSSProperties;
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
  const [coordinates, setCoordinates] = useState<
    { id: number; left: number; right: number; top: number; bottom: number; cards: { id: number; mid: number }[] }[]
  >([]);

  const getCardCenter = (x: number, y: number) => {
    return { x: x - dragOffset!.x + draggedCard!.rect.width / 2, y: y - dragOffset!.y + draggedCard!.rect.height / 2 };
  };

  const draggedCardStyle: CSSProperties = isDragging && dragPosition && dragOffset
        ? { position: "absolute", zIndex: "100", top: dragPosition.y - dragOffset.y, left: dragPosition.x - dragOffset.x }
        : {};

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
    setCoordinates,
    getCardCenter,
    draggedCardStyle
  };

  return <DragContext.Provider value={value}>{children}</DragContext.Provider>;
}
