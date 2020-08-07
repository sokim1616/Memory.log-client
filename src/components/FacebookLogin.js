import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

const onLoginFacebook = async () => {
  await LoginManager.logInWithPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        return Promise.reject(new Error('User cancelled the login process'));
      }

      console.log(
        `Login success with permissions: ${result.grantedPermissions.toString()}`,
      );
      return AccessToken.getCurrentAccessToken();
    })
    .then((data) => {
      const credential = auth.FacebookAuthProvider.credential(data.accessToken);
      return auth().signInWithCredential(credential);
    })
    .then((currentUser) => {
      facebookSignup(currentUser.user);
    })
    .catch((error) => {
      console.log(`Facebook login fail with error: ${error}`);
    });
};

const facebookSignup = async ({email, uid, photoURL, displayName}) => {
  let resp = await fetch(`http://${Server.server}/user/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password: uid,
      username: photoURL,
      profilepath: displayName,
    }),
  });
  if (resp.status === 200) {
    setToastMessage('페이스북 로그인에 성공하였습니다.');
    await facebookSignin({email, uid});
  } else if (resp.status === 409) {
    await facebookSignin({email, uid});
  } else {
    setToastMessage('죄송합니다. 현재는 페이스북 로그인을 진행할 수 없습니다.');
  }
};

const facebookSignin = async ({email, uid}) => {
  let resp = await fetch(`http://${Server.server}/user/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password: uid}),
  });
  if (resp.status === 200) {
    setToastMessage('로그인에 성공하였습니다.');
    setTimeout(() => changeLogin(true), 1000);
  } else {
    setToastMessage('Unathorized. Please check your username and password.');
  }
};

export default FacebookLogin;
