const normalizeUser = (user) => ({
  name: {
    firstName: user.first,
    lastName: user.last,
  },
  email: user.email,
  contact: {
    phoneNumber: user.phone,

    address: {
      // country: user.country,
      city: user.city,
      street: user.street,
      streetNumber: user.streetNumber,
    },
  },
  // image: {
  //   url: user.url,
  //   alt: user.alt,
  // },
  roles: user.roles,
  password: user.password,
  // isAdmin: user.isAdmin,
});

export default normalizeUser;
