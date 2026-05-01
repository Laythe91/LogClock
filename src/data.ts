import { Event } from "./types/Event";

const DATA = {
  // 1. Profils publics
  userProfiles: [
    {
      id: "user1",
      firstName: "Lucas",
      lastName: "Martin",
      email: "lucas.martin@example.com",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "user2",
      firstName: "Alice",
      lastName: "Dubois",
      email: "alice.dubois@example.com",
      profileImage: "https://randomuser.me/api/portraits/women/69.jpg",
    },
    {
      id: "user3",
      firstName: "Karim",
      lastName: "Benali",
      email: "karim.benali@example.com",
      profileImage: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      id: "user4",
      firstName: "Sophie",
      lastName: "Leroy",
      email: "sophie.leroy@example.com",
      profileImage: "https://randomuser.me/api/portraits/women/88.jpg",
    },
  ],

  // 2. Données privées (mock login)
  users: [
    {
      id: "user1",
      location: {
        lat: 48.8566,
        lng: 2.3522,
        updatedAt: "2026-03-08T10:00:00.000Z",
      },
      contactsStatusCache: {
        user2: "accepted",
        user3: "pending",
        user4: "blocked",
      },
      myEvents: {
        created: ["event-1111-aaaa"],
        invited: ["event-2222-bbbb", "event-3333-cccc"],
      },
    },
    {
      id: "user2",
      location: {
        lat: 48.8647,
        lng: 2.349,
        updatedAt: "2026-03-08T10:30:00.000Z",
      },
      contactsStatusCache: {
        user1: "accepted",
        user3: "accepted",
      },
      myEvents: {
        created: ["event-2222-bbbb"],
        invited: ["event-1111-aaaa", "event-3333-cccc"],
      },
    },
    {
      id: "user3",
      location: {
        lat: 48.853,
        lng: 2.3499,
        updatedAt: "2026-03-08T11:00:00.000Z",
      },
      contactsStatusCache: {
        user1: "accepted",
        user2: "pending",
        user4: "blocked",
      },
      myEvents: {
        created: ["event-3333-cccc"],
        invited: ["event-1111-aaaa"],
      },
    },
    {
      id: "user4",
      location: {
        lat: 48.86,
        lng: 2.34,
        updatedAt: "2026-03-08T12:00:00.000Z",
      },
      contactsStatusCache: {
        user2: "accepted",
        user3: "pending",
        user1: "accepted",
      },
      myEvents: {
        created: [],
        invited: ["event-2222-bbbb"],
      },
    },
  ],

  // 3. Events (STRICT TYPE EVENT)
  events: [
    {
      id: "event-1111-aaaa",
      creatorId: "user1",
      title: "Déjeuner Meetup",
      description: "Déjeuner entre amis pour discuter du projet",
      dateStart: "2026-03-08T13:00:00.000Z",
      dateEnd: "2026-03-08T14:00:00.000Z",
      location: {
        lat: 48.8566,
        lng: 2.3522,
      },
      participants: {
        user1: "accepted",
        user2: "declined",
        user3: "pending",
      },
    },
    {
      id: "event-2222-bbbb",
      creatorId: "user2",
      title: "Soirée Pizza",
      description: "Soirée pizza chez Alice",
      dateStart: "2026-03-15T19:00:00.000Z",
      dateEnd: "2026-03-15T21:00:00.000Z",
      location: {
        lat: 48.8647,
        lng: 2.349,
      },
      participants: {
        user1: "accepted",
        user2: "accepted",
        user4: "pending",
      },
    },
    {
      id: "event-3333-cccc",
      creatorId: "user3",
      title: "Rando dans les bois",
      description: "Petite randonnée pour se détendre",
      dateStart: "2026-03-10T09:00:00.000Z",
      dateEnd: "2026-03-10T12:00:00.000Z",
      location: {
        lat: 48.853,
        lng: 2.3499,
      },
      participants: {
        user3: "accepted",
        user1: "pending",
        user2: "accepted",
      },
    },
  ] as Event[],
};

export default DATA;
