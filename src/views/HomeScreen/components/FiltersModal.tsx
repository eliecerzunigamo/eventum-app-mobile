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
import { styles as registerStyles } from "../../RegisterScreen/utils/styles";

interface Props {
  openFiltersModal: boolean;
  setOpenFiltersModal: (open: boolean) => void;
  setFacultyId: (id: string) => void;
  setProgramId: (id: string) => void;
  setEventType: (id: string) => void;
  selectedFaculty: string;
  selectedProgram: string;
  selectedEventType: string;
}

export const FiltersModal = ({
  openFiltersModal,
  setOpenFiltersModal,
  setFacultyId,
  setProgramId,
  selectedFaculty,
  selectedProgram,
  selectedEventType,
  setEventType,
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
      onRequestClose={() => {
        setOpenFiltersModal(false);
        dispatch({ type: SidebarTypes.Open });
      }}
    >
      <Header
        func={() => {
          setOpenFiltersModal(false);
          dispatch({ type: SidebarTypes.Open });
        }}
        title={"Filtros"}
        leftFunc={() => {
          setOpenFiltersModal(false);
          setFacultyId("default");
          setProgramId("default");
          setEventType("default");
        }}
      />
      <View style={styles.container}>
        <View>
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
          <Text style={{ ...registerStyles.userTypeLabel, fontSize: 14 }}>
            Facultad:
          </Text>
          <CustomPicker
            defaultValue="Seleccione una facultad"
            selectedValue={selectedFaculty}
            setSelectedValue={setFacultyId}
            values={[...faculties, { _id: "default", name: "Todas" }]}
          />

          <Text style={{ ...registerStyles.userTypeLabel, fontSize: 14 }}>
            Programa:
          </Text>
          <CustomPicker
            defaultValue="Seleccione una programa"
            selectedValue={selectedProgram}
            setSelectedValue={setProgramId}
            values={[
              ...currentPrograms,
              { _id: "default", name: "Todas", id: "default" },
            ]}
            isPrimary={false}
          />

          <Text style={{ ...registerStyles.userTypeLabel, fontSize: 14 }}>
            Tipo de evento:
          </Text>
          <CustomPicker
            defaultValue="Seleccione una tipo de evento"
            selectedValue={selectedEventType}
            setSelectedValue={setEventType}
            values={[
              {
                _id: "new",
                name: "Noticia",
              },
              {
                _id: "event",
                name: "Evento",
              },
              {
                _id: "default",
                name: "Todos",
              },
            ]}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.clearButton,
              backgroundColor:
                auth.user?.user_type === "director de programa" ||
                auth.user?.user_type === "docente"
                  ? Colors.Orange
                  : Colors.Blue,
            }}
            onPress={() => {
              setFacultyId("default");
              setProgramId("default");
              setEventType("default");
              setOpenFiltersModal(false);
            }}
          >
            <Text style={styles.clearButtonText}>Limpiar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.clearButton,
              backgroundColor:
                auth.user?.user_type === "director de programa" ||
                auth.user?.user_type === "docente"
                  ? Colors.Orange
                  : Colors.Blue,
            }}
            onPress={() => {
              setOpenFiltersModal(false);
            }}
          >
            <Text style={styles.clearButtonText}>Aplicar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
