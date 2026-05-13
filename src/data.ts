import { ApiEvent } from "./types/Event";

const DATA = {
  // =========================
  // 1. PROFILS PUBLICS
  // =========================
  userProfiles: [
    {
      id: "user1",
      firstName: "Lucas",
      lastName: "Martin",
      email: "lucas.martin@example.com",
      phone: "+33687654321",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "user2",
      firstName: "Alice",
      lastName: "Dubois",
      email: "alice.dubois@example.com",
      phone: "+33687654322",
      profileImage: "https://randomuser.me/api/portraits/women/69.jpg",
    },
    {
      id: "user3",
      firstName: "Karim",
      lastName: "Benali",
      email: "karim.benali@example.com",
      phone: "+33687654323",
      profileImage: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      id: "user4",
      firstName: "Sophie",
      lastName: "Leroy",
      email: "sophie.leroy@example.com",
      phone: "+33687654324",
      profileImage: "https://randomuser.me/api/portraits/women/88.jpg",
    },
    {
      id: "user5",
      firstName: "Mehdi",
      lastName: "Haddad",
      email: "mehdi.haddad@example.com",
      phone: "+33687654325",
      profileImage: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: "user6",
      firstName: "Emma",
      lastName: "Morel",
      email: "emma.morel@example.com",
      phone: "+33687654326",
      profileImage: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ],

  // =========================
  // 2. USERS (PRIVATE DATA)
  // =========================
  users: [
    {
      id: "user1",
      location: {
        lat: 48.8566,
        lng: 2.3522,
        updatedAt: "2026-05-01T10:00:00.000Z",
      },
      contactsStatusCache: {
        user2: "accepted",
        user3: "pending",
        user4: "blocked",
        user5: "accepted",
      },
      blockedBy: {},
      myEvents: {
        created: ["event-1111", "event-2222"],
        invited: ["event-3333", "event-4444"],
      },
    },
    {
      id: "user2",
      location: {
        lat: 48.8647,
        lng: 2.349,
        updatedAt: "2026-05-01T10:30:00.000Z",
      },
      contactsStatusCache: {
        user1: "accepted",
        user3: "accepted",
        user4: "accepted",
        user5: "pending",
        user6: "blocked",
      },
      blockedBy: {
        user3: true,
      },
      myEvents: {
        created: ["event-3333"],
        invited: ["event-1111", "event-5555", "event-6666"],
      },
    },
    {
      id: "user3",
      location: {
        lat: 48.853,
        lng: 2.3499,
        updatedAt: "2026-05-01T11:00:00.000Z",
      },
      contactsStatusCache: {
        user1: "accepted",
        user2: "pending",
        user4: "blocked",
        user5: "accepted",
      },
      blockedBy: {
        user2: true,
      },
      myEvents: {
        created: ["event-4444"],
        invited: ["event-1111", "event-2222"],
      },
    },
    {
      id: "user4",
      location: {
        lat: 48.86,
        lng: 2.34,
        updatedAt: "2026-05-01T12:00:00.000Z",
      },
      contactsStatusCache: {
        user1: "accepted",
        user2: "accepted",
        user3: "pending",
        user5: "blocked",
      },
      blockedBy: {
        user1: true,
      },
      myEvents: {
        created: [],
        invited: ["event-3333", "event-7777"],
      },
    },
    {
      id: "user5",
      location: {
        lat: 48.85,
        lng: 2.33,
        updatedAt: "2026-05-02T09:00:00.000Z",
      },
      contactsStatusCache: {
        user1: "accepted",
        user2: "pending",
        user3: "accepted",
        user4: "blocked",
        user6: "accepted",
      },
      blockedBy: {},
      myEvents: {
        created: ["event-5555"],
        invited: ["event-1111", "event-2222"],
      },
    },
    {
      id: "user6",
      location: {
        lat: 48.87,
        lng: 2.36,
        updatedAt: "2026-05-02T09:30:00.000Z",
      },
      contactsStatusCache: {
        user2: "blocked",
        user5: "accepted",
      },
      blockedBy: {
        user2: true,
      },
      myEvents: {
        created: ["event-6666"],
        invited: ["event-3333"],
      },
    },
  ],

  // =========================
  // 3. EVENTS
  // =========================
  events: [
    {
      id: "event-1111",
      creatorId: "user1",
      title: "Déjeuner équipe",
      description: "Réunion équipe projet",
      dateStart: "2026-05-08T12:00:00.000Z",
      dateEnd: "2026-05-08T14:00:00.000Z",
      allDay: false,
      location: { lat: 48.8566, lng: 2.3522 },
      participants: {
        user1: "accepted",
        user2: "accepted",
        user3: "pending",
        user5: "accepted",
      },
    },
    {
      id: "event-2222",
      creatorId: "user1",
      title: "Afterwork",
      description: "Verre entre collègues",
      dateStart: "2026-05-09T18:00:00.000Z",
      dateEnd: "2026-05-09T21:00:00.000Z",
      allDay: false,
      location: { lat: 48.8566, lng: 2.35 },
      participants: {
        user2: "accepted",
        user3: "accepted",
        user4: "pending",
        user5: "accepted",
      },
    },
    {
      id: "event-3333",
      creatorId: "user2",
      title: "Conférence tech",
      description: "Talks dev & IA",
      dateStart: "2026-05-10T09:00:00.000Z",
      dateEnd: "2026-05-10T17:00:00.000Z",
      allDay: false,
      location: { lat: 48.8647, lng: 2.349 },
      participants: {
        user1: "declined",
        user2: "accepted",
        user3: "accepted",
        user4: "accepted",
        user6: "pending",
      },
    },
    {
      id: "event-4444",
      creatorId: "user3",
      title: "Rando nature",
      description: "Randonnée week-end",
      dateStart: "2026-05-12T08:00:00.000Z",
      dateEnd: "2026-05-12T12:00:00.000Z",
      allDay: false,
      location: { lat: 48.853, lng: 2.3499 },
      participants: {
        user3: "accepted",
        user5: "accepted",
        user1: "pending",
      },
    },
    {
      id: "event-5555",
      creatorId: "user5",
      title: "Gaming night",
      description: "Soirée jeux vidéo",
      dateStart: "2026-05-15T20:00:00.000Z",
      dateEnd: "2026-05-16T01:00:00.000Z",
      allDay: false,
      location: { lat: 48.85, lng: 2.33 },
      participants: {
        user5: "accepted",
        user1: "accepted",
        user2: "pending",
      },
    },
    {
      id: "event-6666",
      creatorId: "user6",
      title: "Workshop IA",
      description: "Formation intelligence artificielle",
      dateStart: "2026-05-18T10:00:00.000Z",
      dateEnd: "2026-05-18T16:00:00.000Z",
      allDay: false,
      location: { lat: 48.87, lng: 2.36 },
      participants: {
        user6: "accepted",
        user2: "declined",
        user5: "accepted",
      },
    },
    {
      id: "event-7777",
      creatorId: "user4",
      title: "Anniversaire",
      description: "Fête privée",
      dateStart: "2026-05-20T19:00:00.000Z",
      dateEnd: "2026-05-20T23:00:00.000Z",
      allDay: false,
      location: { lat: 48.86, lng: 2.34 },
      participants: {
        user4: "accepted",
        user1: "declined",
        user3: "pending",
      },
    },
  ] as ApiEvent[],
};

export default DATA;
