import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TaskItem as TaskType } from '../utils/handle-api';

import { useTaskStore } from '../store/useTaskStore';

// TODO (Zustand): Mantenha apenas a prop 'task'. Remova 'updateMode' e 'deleteTask'
interface TaskItemProps {
  task: TaskType;
}

// TODO (Zustand): Importe o useTaskStore e pegue as actions de atualizar e deletar diretamente da store
const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.task} onPress={() => router.push(`/task/${task._id}`)}>
      <View style={styles.contentContainer}>
        <Text style={[styles.text, !!task.completed && styles.textCompleted]}>
          {task.text}
        </Text>
        {task.dueDate && (
          <Text style={[styles.dateText, isOverdue ? styles.dateOverdue : styles.dateOnTime]}>
            Até: {new Date(task.dueDate).toLocaleDateString()}
          </Text>
        )}
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => setEditingTask(task)} accessibilityRole="button">
          <Feather name="edit" size={20} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(task._id)} accessibilityRole="button">
          <AntDesign name="delete" size={20} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  task: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    marginRight: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  dateText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },
  dateOverdue: {
    color: '#e53935',
  },
  dateOnTime: {
    color: '#43a047',
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
  },
  icon: {
    padding: 2,
  },
});

export default TaskItem;
