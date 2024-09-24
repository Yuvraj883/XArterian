import { Clerk } from '@clerk/clerk-js';


//Authentication using clerk
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const clerkFunction = async()=>{
  const clerk = new Clerk(clerkPubKey);
  await clerk.load({
    afterSignInUrl: "/",
    afterSignUpUrl: "/",
    signInUrl: "/login",
    signUpUrl: "/signup",
    navigate: (to) => {
      window.location.href = to;
    },
    polling: true, // enable session polling
  });

  if (clerk.user) {

    const userButtonDiv =
      document.getElementById("user-button");
      const userButtonMobileDiv =     document.getElementById("user-button-mobile");

    clerk.mountUserButton(userButtonDiv);
    clerk.mountUserButton(userButtonMobileDiv);
  } else {
    document.getElementById("app").innerHTML = `
      <div id="sign-in"></div>
    `;

    const signInDiv =
      document.getElementById("sign-in");

    clerk.mountSignIn(signInDiv);
  }

}
clerkFunction();




