export const USER = {
  username: 'login',
  registration: '2018-01-08 00:00:00',
  lastLogin: '2018-01-08 00:00:00',
  lastPasswordChange: '2018-01-08 00:00:00',
  status: 'active',
  passwordChangeRequired: true,
  profileAttributes: {
    fullName: '',
    email: '',
  },
  accountNotExpired: true,
  credentialsNotExpired: true,
};

export const USERS = [
  {
    username: 'admin',
    registration: '2018-01-08 00:00:00',
    lastLogin: '2018-01-08 00:00:00',
    lastPasswordChange: '2018-01-08 00:00:00',
    status: 'active',
    passwordChangeRequired: true,
    profileAttributes: {
      fullName: 'admin',
      email: 'admin@entando.com',
    },
  },
  {
    username: 'user1',
    registration: '2018-01-08 00:00:00',
    lastLogin: '2018-01-08 00:00:00',
    lastPasswordChange: '2018-01-08 00:00:00',
    status: 'disabled',
    passwordChangeRequired: true,
    profileAttributes: {
      fullName: 'User Name',
      email: 'user1@entando.com',
    },
  },
  {
    username: 'user2',
    registration: '2018-01-08 00:00:00',
    lastLogin: '2018-01-08 00:00:00',
    lastPasswordChange: '2018-01-08 00:00:00',
    status: 'active',
    passwordChangeRequired: true,
    profileAttributes: {
      fullName: 'User Name2',
      email: 'user2@entando.com',
    },
  },
  {
    username: 'user3',
    registration: '2018-01-08 00:00:00',
    lastLogin: '2018-01-08 00:00:00',
    lastPasswordChange: '2018-01-08 00:00:00',
    status: 'active',
    passwordChangeRequired: true,
    profileAttributes: {
      fullName: 'User Name3',
      email: 'user3@entando.com',
    },
  },
];

export const AUTHORITIES = [
  {
    group: 'free',
    role: 'editUsers',
  },
  {
    group: 'accounting',
    role: 'supervisor',
  },
];

export const EDIT_USER_PROFILE_AUTHORITIES = [{
  group: 'administratos',
  permissions: ['editUserProfile'],
}];
