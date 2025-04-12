import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';

// Generate random unique IDs (since we can't use uuid in Snack)
const uuidv4 = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

export default function App() {
  const [entries, setEntries] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income');

  const addEntry = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      Alert.alert('请输入有效的金额');
      return;
    }

    const newEntry = {
      id: uuidv4(),
      type,
      amount: value,
      description,
      date: new Date().toLocaleString(),
    };

    setEntries([newEntry, ...entries]);
    setAmount('');
    setDescription('');
  };

  const totalIncome = entries
    .filter((e) => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = entries
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>月底花钱和赚钱结算 App</Text>

      <Text style={styles.label}>金额:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="¥"
      />

      <Text style={styles.label}>描述:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="例如：工资 / 饭钱"
      />

      <View style={styles.buttonRow}>
        <Button
          title="收入"
          onPress={() => setType('income')}
          color={type === 'income' ? 'green' : 'gray'}
        />
        <Button
          title="支出"
          onPress={() => setType('expense')}
          color={type === 'expense' ? 'red' : 'gray'}
        />
      </View>

      <Button title="添加记录" onPress={addEntry} />

      <View style={styles.summary}>
        <Text>总收入: ¥{totalIncome.toFixed(2)}</Text>
        <Text>总支出: ¥{totalExpense.toFixed(2)}</Text>
        <Text>结余: ¥{balance.toFixed(2)}</Text>
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.entryItem,
              { backgroundColor: item.type === 'income' ? '#e0ffe0' : '#ffe0e0' },
            ]}
          >
            <Text>
              [{item.type === 'income' ? '收入' : '支出'}] ¥{item.amount.toFixed(2)} -{' '}
              {item.description}
            </Text>
            <Text style={{ fontSize: 10, color: 'gray' }}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 50 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summary: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  entryItem: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
});
