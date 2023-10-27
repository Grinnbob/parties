export const specialChar = new RegExp(
  /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
);
export const upper = new RegExp("^(?=.*[A-Z])");
export const numerical = new RegExp("^(?=.*[0-9])");
export const email = new RegExp(
  "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
);
