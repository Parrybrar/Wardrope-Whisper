import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { api } from '@/lib/api';

export const RecommendScreen = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onRecommend = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await api.recommend({ preferences: { styles: ['casual'], colors: ['black'] } });
      setResult(data);
    } catch (e: any) {
      setError(e.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0E0F13', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <TouchableOpacity onPress={onRecommend} style={{ backgroundColor: '#7C5CFF', borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>{loading ? 'Getting…' : 'Get Recommendations'}</Text>
      </TouchableOpacity>
      {error ? <Text style={{ color: '#FF6B6B' }}>{error}</Text> : null}
      {result ? <Text style={{ color: '#E8ECF1' }}>{JSON.stringify(result)}</Text> : null}
    </View>
  );
};


