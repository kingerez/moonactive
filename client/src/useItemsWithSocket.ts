import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { StoreItemObject } from './shared/types';

export const useItemsWithSocket = () => {
  const socket = useRef<Socket | null>(null);
  const [items, setItems] = useState<StoreItemObject[]>([]);

  const updateItemsList = useCallback((result: Record<string, StoreItemObject>) => {
    const itemsList = Object.keys(result).map(id => ({
      ...result[id],
      id
    }));

    setItems(itemsList);
  }, []);

  useEffect(() => {
    socket.current = io('http://localhost:3080');

    socket.current.on('connect', () => {
      socket.current!.emit('getItems', (items: Record<string, StoreItemObject>) => {
        updateItemsList(items);
      });
    });

    socket.current.on('itemUpdated', (updatedItem: StoreItemObject, id: string) => {
      setItems(oldValue => oldValue.map(oldItem => oldItem.id === id ? {...updatedItem, id} : oldItem));
    });

    socket.current.on('getItems', (...args) => {console.log('getItems:', args)});
  }, [updateItemsList, setItems]);

  const updateItem = (id: string) => {
    socket.current!.emit('updateItem', id);
  };

  const resetData = () => {
    socket.current!.emit('resetData');
  };

  return {
    items,
    setItems,
    updateItem,
    resetData,
  };
};
