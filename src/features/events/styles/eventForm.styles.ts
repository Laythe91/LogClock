import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: { padding: 12, backgroundColor: "#eee", borderRadius: 8 },
  submit: {
    padding: 14,
    backgroundColor: "royalblue",
    alignItems: "center",
    borderRadius: 8,
  },
  modal: { flex: 1, padding: 16 },
  contact: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  error: { color: "red", marginTop: 4 },
  dateRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  TextRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  halfBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignItems: "center",
  },
  halfText: {
    flex: 1,
    padding: 12,
    backgroundColor: "royalblue",
    borderRadius: 8,
    alignItems: "center",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
