import React from "react";
import { Text } from "react-native";
import dayjs from "dayjs";

type Props = {
  start: number;
  end: number;
  allDay?: boolean;
};

const EventCard = ({ start, end, allDay }: Props) => {
  const sameDay = dayjs(start).isSame(end, "day");

  if (allDay) {
    return (
      <Text>
        {sameDay
          ? dayjs(start).format("DD/MM/YYYY")
          : `${dayjs(start).format("DD/MM/YYYY")} → ${dayjs(end).format("DD/MM/YYYY")}`}
      </Text>
    );
  }

  if (sameDay) {
    return (
      <Text>
        {dayjs(start).format("DD/MM/YYYY")} • {dayjs(start).format("HH:mm")} -{" "}
        {dayjs(end).format("HH:mm")}
      </Text>
    );
  }

  return (
    <Text>
      {dayjs(start).format("DD/MM/YYYY HH:mm")} →{" "}
      {dayjs(end).format("DD/MM/YYYY HH:mm")}
    </Text>
  );
};

export default EventCard;
