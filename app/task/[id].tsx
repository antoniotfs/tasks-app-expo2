import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTaskStore } from '../../src/store/useTaskStore';
import { globalStyles } from '../../src/styles/global';

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const tasks = useTaskStore((state) => state.tasks);
  
  const task = tasks.find(t => t._id === id);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Tarefa não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Título:</Text>
        <Text style={styles.value}>{task.text}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{task.completed ? '✅ Concluída' : '⏳ Pendente'}</Text>

        {task.dueDate && (
          <>
            <Text style={styles.label}>Data Limite:</Text>
            <Text style={styles.value}>{new Date(task.dueDate).toLocaleDateString()}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: globalStyles.backgroundColor || '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: '#d32f2f',
    textAlign: 'center',
    marginTop: 40,
  }
});
