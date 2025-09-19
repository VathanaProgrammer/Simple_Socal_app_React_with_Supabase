// SupabasePresence.js
import { supabase } from "./SupabaseClient";

let presenceChannel = null;

export function initPresence(user, onOnlineUsersChange) {
  if (!user?.id) return;

  // Create the channel once
  if (!presenceChannel) {
    presenceChannel = supabase.channel("online-users", {
      config: { presence: { key: user.id + "_" + Date.now() } }, // <-- unique per tab
    });

    // When presence syncs, update the online users
    presenceChannel
      .on("presence", { event: "sync" }, () => {
        const state = presenceChannel.presenceState();
        const online = Object.values(state).flatMap((sessions) =>
          sessions.map((s) => ({
            userId: s.userId,
            username: s.username,
          }))
        );

        console.log("ONLINE USERS:", online);
        onOnlineUsersChange(online);
      })
      .on("presence", { event: "join" }, ({ newPresences }) => {
        console.log("User joined:", newPresences);
      })
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        console.log("User left:", leftPresences);
      });

    // Subscribe and start tracking this user
    presenceChannel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        console.log("CHANNEL STATUS:", status);
        presenceChannel.track({
          userId: user.id, // must be unique per user!
          username: user.username,
        });
      } else {
        console.log("CHANNEL STATUS:", status);
      }
    });
  }
}

export function cleanupPresence() {
  if (presenceChannel) {
    presenceChannel.unsubscribe();
    presenceChannel = null;
  }
}
