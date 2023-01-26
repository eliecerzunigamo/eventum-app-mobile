import React, { useContext, useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useHome, Program } from "../hooks/useHome";
import { filtersModalStyles as styles } from "./utils/styles";
import Header from "../../../common/components/Header/Header";
import { Colors } from "../../../common/utils/Enums";
import { SidebarContext } from "../../../common/context/sidebar/SidebarContext";
import { SidebarTypes } from "../../../common/context/sidebar/SideBarTypes";
import CustomPicker from "./CustomPicker";
import { LoginContext } from "../../../common/context/login/LoginContext";

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
  const { dispatch } = useContext(SidebarContext);

  const { auth } = useContext(LoginContext);

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

  console.log(selectedProgram);

  return (
    <Modal
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
      visible={openFiltersModal}
      animationType="fade"
      transparent={true}
    >
      <Header
        func={() => {
          setOpenFiltersModal(false);
          dispatch({ type: SidebarTypes.Open });
        }}
        title={"Filtros"}
        leftFunc={() => {
          setOpenFiltersModal(false);
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Universidad del Magdalena</Text>
        <View style={styles.line} />
        <Text
          style={{
            fontSize: 10,
            color: Colors.Dark,
            marginBottom: 10,
          }}
        >
          Seleccione las facultades y programas de interés
        </Text>
        <CustomPicker
          defaultValue="Facultad"
          selectedValue={selectedFaculty}
          setSelectedValue={setFacultyId}
          values={faculties}
        />

        <CustomPicker
          defaultValue="Programa"
          selectedValue={selectedProgram}
          setSelectedValue={setProgramId}
          values={currentPrograms}
          isPrimary={false}
        />

        <TouchableOpacity
          style={{
            ...styles.clearButton,
            backgroundColor:
              auth.user?.user_type === "director de programa" ||
              auth.user?.user_type === "docente"
                ? Colors.LightOrange
                : Colors.Blue,
          }}
          onPress={() => {
            setFacultyId("default");
            setProgramId("default");
            setOpenFiltersModal(false);
          }}
        >
          <Text style={styles.clearButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
