import * as yup from "yup";

export const eventSchema = yup.object({
  title: yup.string().required().min(3),

  description: yup.string().notRequired(),

  allDay: yup.boolean().required(),

  dateStart: yup
    .number()
    .required("Date de début obligatoire")
    .test(
      "not-in-past",
      "La date de début ne peut pas être dans le passé",
      (value) => {
        if (!value) return false;

        return value >= Date.now();
      },
    ),

  dateEnd: yup
    .number()
    .required("Date de fin obligatoire")
    .test(
      "is-after-start",
      "La fin doit être après le début",
      function (value) {
        return value >= this.parent.dateStart;
      },
    ),

  participants: yup.array().of(yup.string()).required(),

  location: yup.object({
    lat: yup.number().required(),
    lng: yup.number().required(),
    address: yup.string().notRequired(),
  }),
});
