import React, { useEffect } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { useAppContext } from '../context/AppContext';
import MenuComponent from '../components/MenuComponent';
import DimensionesContent from './Comparison/Dimensiones';

const ComparisonView = () => {
  const { fetchAutos, selectedCategory } = useAppContext();

  useEffect(() => {
    fetchAutos(); // Llama a fetchAutos solo cuando se monta ComparisonView
  }, []);

  const renderContent = () => {
    switch (selectedCategory) {
      case 'Dimensiones':
        return <DimensionesContent />;
      // Agrega casos para otras categorías si es necesario
      default:
        return <View><Text>Selecciona una categoría del menú</Text></View>;
    }
  };

  return (
    <View style={styles.container}>
      <MenuComponent />
      <View style={styles.contentContainer}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
});

export default ComparisonView;
