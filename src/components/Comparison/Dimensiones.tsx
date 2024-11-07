import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useAppContext } from '../../context/AppContext';

const DimensionesContent = () => {
  const { autos } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState('');

  // Asegura que haya al menos dos autos para comparar
  if (autos.length < 2) {
    return <Text>No hay suficientes autos para comparar.</Text>;
  }

  // Muestra el modal con detalles
  const showDetail = (detail: string) => {
    setSelectedDetail(detail);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dimensiones y Capacidad</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Altura</Text>
        <Text style={styles.description}>La altura es la dimensión vertical del automóvil.</Text>
        
        <View style={styles.chartContainer}>
          {/* Gráfico comparativo para Altura */}
          <View style={[styles.bar, { width: `${autos[0].dimension.alto.valor * 10}%`, backgroundColor: 'purple' }]} />
          <Text>{autos[0].dimension.alto.valor} m</Text>
          
          <View style={[styles.bar, { width: `${autos[1].dimension.alto.valor * 10}%`, backgroundColor: 'red' }]} />
          <Text>{autos[1].dimension.alto.valor} m</Text>
        </View>

        <TouchableOpacity onPress={() => showDetail(autos[0].dimension.alto.detalle)}>
          <Text style={styles.moreDetailsText}>Ver más detalles</Text>
        </TouchableOpacity>
      </View>

      {/* Tarjetas adicionales para Largo y Capacidad de Carga */}
      {/* Similar al código de arriba */}

      {/* Modal para ver detalles adicionales */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{selectedDetail}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeModalText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  description: { fontSize: 14, color: '#555' },
  chartContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  bar: { height: 10, marginRight: 5 },
  moreDetailsText: { color: 'blue', textDecorationLine: 'underline' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalText: { backgroundColor: '#fff', padding: 15, borderRadius: 8 },
  closeModalText: { marginTop: 20, color: 'blue', fontWeight: 'bold' },
});

export default DimensionesContent;
