import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useHome, Program } from "../hooks/useHome";
import { toTitle } from "../../../common/utils/toTitle";
import { filtersModalStyles as styles } from "./utils/styles";

interface Props {
  openFiltersModal: boolean;
  setOpenFiltersModal: (open: boolean) => void;
  setFacultyId: (id: string) => void;
  setProgramId: (id: string) => void;
  selectedFaculty: string;
  selectedProgram: string;
}

export const FiltersModal = ({
  openFiltersModal,
  setOpenFiltersModal,
  setFacultyId,
  setProgramId,
  selectedFaculty,
  selectedProgram,
}: Props) => {
  const { faculties, getFacultiesAndPrograms } = useHome();
  const [currentPrograms, setCurrentPrograms] = useState<Program[]>([]);

  useEffect(() => {
    getFacultiesAndPrograms();
  }, []);

  useEffect(() => {
    const selectedPrograms = faculties.find((item) => {
      return item._id === selectedFaculty;
    })?.programs;
    setCurrentPrograms(selectedPrograms ? selectedPrograms : []);
    setProgramId("default");
  }, [selectedFaculty]);

  return (
    <Modal visible={openFiltersModal} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Filtros</Text>
            <TouchableOpacity onPress={() => setOpenFiltersModal(false)}>
              <Icon name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Facultad</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={selectedFaculty}
                style={{ height: 50, width: "100%" }}
                onValueChange={(itemValue: string, itemIndex) =>
                  setFacultyId(itemValue)
                }
              >
                {selectedFaculty === "default" && (
                  <Picker.Item
                    style={{
                      fontSize: 12.5,
                    }}
                    key={"default"}
                    label={toTitle("Seleccione un programa")}
                    value={"default"}
                  />
                )}
                {faculties.map((faculty) => (
                  <Picker.Item
                    style={{
                      fontSize: 12.5,
                    }}
                    key={faculty._id}
                    label={toTitle(faculty.name)}
                    value={faculty._id}
                  />
                ))}
              </Picker>
            </View>
            <Text style={styles.pickerLabel}>Programa</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={selectedProgram}
                style={{ height: 50, width: "100%" }}
                onValueChange={(itemValue: string, itemIndex) =>
                  setProgramId(itemValue)
                }
              >
                {selectedProgram === "default" && (
                  <Picker.Item
                    style={{
                      fontSize: 12.5,
                    }}
                    key={"default"}
                    label={toTitle("Seleccione un programa")}
                    value={"default"}
                  />
                )}
                {currentPrograms.map((program) => (
                  <Picker.Item
                    style={{
                      fontSize: 12,
                    }}
                    key={program.id}
                    label={toTitle(program.name)}
                    value={program.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setFacultyId("default");
              setProgramId("default");
              setOpenFiltersModal(false);
            }}
          >
            <View style={styles.clearButtonTextContainer}>
              <Text style={styles.clearButtonText}>Limpiar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
