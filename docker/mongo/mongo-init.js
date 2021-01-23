const username = 'fundraise_user';
const password = '1+92[`x,KB&ueG2cFD*8ZYa5Spg2zpwz';

db.auth(username, password);

(db.getSiblingDB('fundraise-test')).createUser({
    user: username,
    pwd: password,
    roles: [
      {
        role: "dbOwner",
        db: 'fundraise-test',
      },
    ],
});
