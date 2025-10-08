import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { api } from '@/lib/api';

export const CatalogScreen = () => {
  const [items, setItems] = useState<Array<{ id: string; name: string; price: number; sizes: string[] }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.catalog();
        setItems(data);
      } catch (e: any) {
        setError(e.message || 'Failed to load catalog');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#0E0F13', padding: 16 }}>
      {loading ? <Text style={{ color: '#E8ECF1' }}>Loading…</Text> : null}
      {error ? <Text style={{ color: '#FF6B6B' }}>{error}</Text> : null}
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ padding: 16, backgroundColor: '#151821', borderRadius: 12, marginBottom: 12 }}>
            <Text style={{ color: '#E8ECF1', fontWeight: '700' }}>{item.name}</Text>
            <Text style={{ color: '#8A90A6' }}>${item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};


