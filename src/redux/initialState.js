const initialState = {
  user: {
    profile: {},
    articles: [],
    favorites: [],
  },
  forgotPassword: {
    submitting: false,
    success: false,
    successMessage: '',
    email: '',
    newPassword: '',
    confirmNewpassword: '',
    message: '',
    errors: [],
  },
  currentUser: {
    isLoggedIn: false,
    profile: {},
    articles: [],
    favorites: [],
  },
  login: {
    submitting: false,
    credentials: {
      username: '',
      password: '',
    },
  },
};

export default initialState;
