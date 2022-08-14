<script>
  import {
    addDoc,
    serverTimestamp,
    query,
    collection,
    orderBy,
    onSnapshot,
  } from "firebase/firestore";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { db } from "./firebase";
  export let user;
  export let logout;
  let showPopUp = false;
  let message = "";
  let chats = [];
  let NewChats = [];
  console.log(user);
  async function sendMessage() {
    const { uid, displayName, photoURL } = user;

    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      uid,
      photoURL,
      timestamp: serverTimestamp(),
    });

    message = "";
  }

  onMount(() => {
    const Query = query(collection(db, "messages"), orderBy("timestamp"));
    onSnapshot(Query, (querySnapshot) => {
      NewChats = [];
      querySnapshot.forEach((doc) => {
        NewChats.push(doc.data());
        chats = [...NewChats];
      });
    });
    console.log("...Mounted");
  });

  const popup = () => {
    showPopUp = !showPopUp;
  };
</script>

<main>
  {#if showPopUp}
    <div class="popup" transition:slide>
      <div class="user-data">
        <p>Name:{user.displayName}</p>
        <p>Email:{user.email}</p>
        <button on:click={logout}>Logout</button>
      </div>
    </div>
  {/if}
  <div class="header">
    <div class="logo">
      <i class="fas fa-comment" />Chatroom
    </div>
    <img src={user.photoURL} on:click={popup} alt="" />
  </div>
  <div class="messages">
    {#each chats as chat}
      {#if user.uid == chat.uid}
        <div class="message my-message">
          <div class="my-avatar">
            <img src={chat.photoURL} alt="" referrerpolicy="no-referrer" />
          </div>
          <div class="text">
            {chat.text}
          </div>
        </div>
      {:else}
        <div class="message other-message">
          <div class="other-avatar">
            <img src={chat.photoURL} alt="" referrerpolicy="no-referrer" />
          </div>
          <div class="text">
            {chat.text}
          </div>
        </div>
      {/if}
    {/each}
  </div>

  <div class="form">
    <textarea
      class="scrollabletextbox"
      id=" mytextarea"
      name="note"
      bind:value={message}
    />

    <img src="/send_message.png" alt="" on:click={sendMessage} />
  </div>
</main>

<style>
</style>
