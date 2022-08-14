<script>
  import app from "./firebase";
  import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    setPersistence,
    inMemoryPersistence,
    GoogleAuthProvider,
  } from "firebase/auth";
  import { onMount } from "svelte";
  import Chatroom from "./Chatroom.svelte";

  let email = "";
  let password = "";
  let user;

  // const login = () => {
  //   const auth = getAuth(app);
  //   signInWithEmailAndPassword(auth, email, password).catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorCode, errorMessage);
  //   });
  // };

  const loginWithGoogle = () => {
    const auth = getAuth(app);

    signInWithPopup(auth, new GoogleAuthProvider());
  };

  const logout = async () => {
    const auth = getAuth(app);
    signOut(auth);
  };

  onMount(async () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (newUser) => {
      user = newUser;
    });
  });
</script>

<main>
  {#if user}
    <Chatroom {user} {logout} />
  {:else}
    <!-- <input type="email" id="email" placeholder="email" bind:value={email} />
    <input
      type="password"
      id="password"
      placeholder="password"
      bind:value={password}
    /> -->
    <!-- <button on:click={login}>Login</button> -->
    <div class="login">
      <button on:click={loginWithGoogle}
        ><img src="/google.png" alt="Google" />Login with Google</button
      >
    </div>
  {/if}
</main>

<style>
</style>
