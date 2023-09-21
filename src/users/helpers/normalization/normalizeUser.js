const normalizeUser = (user) => ({
  name: {
    first: user.first,
    last: user.last,
  },
  phoneNumber: user.phone,
  email: user.email,
  password: user.password,
  address: {
    country: user.country,
    city: user.city,
    street: user.street,
    zip: user.zip,
    houseNumber: user.houseNumber,
  },
  image: {
    url: user.url,
    alt: user.alt,
  },
  roles: user.roles,
  isAdmin: user.isAdmin,
});

export default normalizeUser;
