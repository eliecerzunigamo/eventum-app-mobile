import { View, Text } from "react-native";
import React from "react";
import { eventItemStyles } from "../../HomeInviteScreen/components/utils/styles";
import { Colors } from "../../../common/utils/Enums";

interface Props {
  init_date: string;
  init_time: string;
  end_date?: string;
  end_time: string;
  place: string;
  event_type: string;
}

export default function EventDetails({
  end_date,
  end_time,
  event_type,
  init_date,
  init_time,
  place,
}: Props) {
  return (
    <>
      {event_type === "event" ? (
        <View>
          <View>
            <View style={{ ...eventItemStyles.hourContainer }}>
              <Text style={{ color: Colors.Dark }}>Inicia: </Text>
              <Text
                style={{
                  color: Colors.Dark,
                  fontSize: 12,
                }}
              >
                {String(init_date).replace(/-/g, "/")} {init_time}
              </Text>
            </View>
            <View style={{ ...eventItemStyles.hourContainer }}>
              <Text style={{ color: Colors.Dark }}>Finaliza: </Text>
              <Text
                style={{
                  color: Colors.Dark,
                  fontSize: 12,
                }}
              >
                {end_date ? (
                  <>
                    {String(end_date).replace(/-/g, "/")} {end_time}
                  </>
                ) : (
                  <>
                    <Text>---/--/-- --:--</Text>
                  </>
                )}
              </Text>
            </View>
            <View style={{ ...eventItemStyles.hourContainer }}>
              <Text style={{ color: Colors.Dark }}>Lugar: </Text>
              <Text
                style={{
                  color: Colors.Dark,
                  fontSize: 12,
                }}
              >
                {place}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Text
            style={{
              color: Colors.Dark,
              fontSize: 10,
            }}
          >
            Publicado: {String(init_date).replace(/-/g, "/")} {init_time} -
            Universidad del magdalena
          </Text>
        </View>
      )}
    </>
  );
}
