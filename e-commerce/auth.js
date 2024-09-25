window.addEventListener('load', async function () {

  await Clerk.load({
    afterSignInUrl: "/",
    afterSignUpUrl: "/",
    signInUrl: "/login",
    signUpUrl: "/signup",
    navigate: (to) => {
      window.location.href = to;
    },
    polling: true, // enable session polling
  });

  if (Clerk.user) {

    const userButtonDiv =
      document.getElementById("user-button");
      const userButtonMobileDiv =     document.getElementById("user-button-mobile");

    Clerk.mountUserButton(userButtonDiv);
    Clerk.mountUserButton(userButtonMobileDiv);
  } else {
    document.getElementById("app").innerHTML = `
      <div id="sign-in"></div>
    `;

    const signInDiv =
      document.getElementById("sign-in");

    Clerk.mountSignIn(signInDiv);
  }

})
