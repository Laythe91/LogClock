import { EventDetails, EventRole } from "../../../types/Event";

export const getEventRole = (
  event: EventDetails,
  userId: string,
): EventRole => {
  const isOwner = event.creatorId === userId;

  const participant = event.participants.find((p) => p.id === userId);

  const myStatus = participant?.status;

  const isParticipant = participant !== undefined;

  return {
    isOwner,
    isParticipant,
    isInvited: isParticipant && !isOwner,
    myStatus,
  };
};
