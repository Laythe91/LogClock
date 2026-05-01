const DATA = {
  users: [
    {
      id: "user1",
      location: {
        lat: 48.8566,
        lng: 2.3522,
        updatedAt: "2026-03-08T10:00:00.000Z",
      },
      friends: {
        user2: {
          status: "accepted",
          addedAt: "2026-03-01T12:00:00.000Z",
        },
        user3: { status: "pending", addedAt: "2026-03-02T14:00:00.000Z" },
        user4: { status: "blocked", addedAt: "2026-03-03T09:00:00.000Z" },
      },
      friendsStatusCache: {
        accepted: ["user2"],
        pending: ["user3"],
        blocked: ["user4"],
        refused: [],
      },
      myEvents: ["event-1111-aaaa", "event-3333-cccc"],
    },
    {
      id: "user2",
      location: {
        lat: 48.8647,
        lng: 2.349,
        updatedAt: "2026-03-08T10:30:00.000Z",
      },
      friends: {
        user1: {
          status: "accepted",
          addedAt: "2026-03-01T12:00:00.000Z",
        },
        user3: { status: "accepted", addedAt: "2026-03-02T15:00:00.000Z" },
      },
      friendsStatusCache: {
        accepted: ["user1", "user3"],
        pending: [],
        blocked: [],
        refused: [],
      },
      myEvents: ["event-2222-bbbb"],
    },
    {
      id: "user3",
      location: {
        lat: 48.853,
        lng: 2.3499,
        updatedAt: "2026-03-08T11:00:00.000Z",
      },
      friends: {
        user1: { status: "pending", addedAt: "2026-03-02T14:00:00.000Z" },
        user2: { status: "accepted", addedAt: "2026-03-02T15:00:00.000Z" },
      },
      friendsStatusCache: {
        accepted: ["user2"],
        pending: ["user1"],
        blocked: [],
        refused: [],
      },
      myEvents: ["event-3333-cccc"],
    },
    {
      id: "user4",
      location: {
        lat: 48.86,
        lng: 2.34,
        updatedAt: "2026-03-08T12:00:00.000Z",
      },
      friends: {
        user1: { status: "blocked", addedAt: "2026-03-03T09:00:00.000Z" },
      },
      friendsStatusCache: {
        accepted: [],
        pending: [],
        blocked: ["user1"],
        refused: [],
      },
      myEvents: ["event-2222-bbbb"],
    },
  ],

  events: [
    {
      id: "event-1111-aaaa",
      creatorId: "user1",
      title: "Déjeuner Meetup",
      description: "Déjeuner entre amis pour discuter du projet",
      dateStart: "2026-03-08T13:00:00.000Z",
      dateEnd: "2026-03-08T14:00:00.000Z",
      location: { lat: 48.8566, lng: 2.3522 },
      createdAt: "2026-03-07T10:00:00.000Z",
    },
    {
      id: "event-2222-bbbb",
      creatorId: "user2",
      title: "Soirée Pizza",
      description: "Soirée pizza chez Alice",
      dateStart: "2026-03-15T19:00:00.000Z",
      dateEnd: "2026-03-15T21:00:00.000Z",
      location: { lat: 48.8647, lng: 2.349 },
      createdAt: "2026-03-07T12:00:00.000Z",
    },
    {
      id: "event-3333-cccc",
      creatorId: "user3",
      title: "Rando dans les bois",
      description: "Petite randonnée pour se détendre",
      dateStart: "2026-03-10T09:00:00.000Z",
      dateEnd: "2026-03-10T12:00:00.000Z",
      location: { lat: 48.853, lng: 2.3499 },
      createdAt: "2026-03-07T15:00:00.000Z",
    },
  ],

  eventParticipants: [
    {
      eventId: "event-1111-aaaa",
      participants: {
        user1: "accepted",
        user2: "accepted",
        user3: "pending",
      },
    },
    {
      eventId: "event-2222-bbbb",
      participants: {
        user1: "accepted",
        user2: "accepted",
        user4: "pending",
      },
    },
    {
      eventId: "event-3333-cccc",
      participants: {
        user3: "accepted",
        user1: "pending",
        user2: "accepted",
      },
    },
  ],

  userProfiles: [
    {
      id: "user1",
      firstName: "Lucas",
      lastName: "Martin",
      email: "lucas.martin@example.com",
      phone: "+33612345678",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "user2",
      firstName: "Alice",
      lastName: "Dubois",
      email: "alice.dubois@example.com",
      phone: "+33687654321",
      profileImage: "https://randomuser.me/api/portraits/women/69.jpg",
    },
    {
      id: "user3",
      firstName: "Karim",
      lastName: "Benali",
      email: "karim.benali@example.com",
      phone: "+33611223344",
      profileImage: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      id: "user4",
      firstName: "Sophie",
      lastName: "Leroy",
      email: "sophie.leroy@example.com",
      phone: "+33699887766",
      profileImage: "https://randomuser.me/api/portraits/women/88.jpg",
    },
  ],
};

export default DATA;
