import { useEffect, useState, useRef } from "react";
import { supabase } from "./SupabaseClient";
import { defaultProfileUrl } from "./defaultImage";
import { useUser } from "./useUser";
import { initPresence, cleanupPresence } from "./SupabasePresence";

function Message() {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (user) {
      initPresence(user, setOnlineUsers);
    }
    return () => cleanupPresence();
  }, [user]);

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, avatar_url")
      .order("username", { ascending: true });

    if (!error && data) setUsers(data.filter((u) => u.id !== user?.id));
    setLoading(false);
  };

  // Get or create chat
  const getOrCreateChat = async (otherUserId) => {
    const { data: existingChats, error } = await supabase
      .from("chats")
      .select("*")
      .or(
        `and(user1_id.eq.${user.id},user2_id.eq.${otherUserId}),and(user1_id.eq.${otherUserId},user2_id.eq.${user.id})`
      )
      .limit(1);

    if (error) {
      console.log("Chat fetch error:", error);
      return null;
    }

    if (existingChats.length > 0) return existingChats[0].id;

    const { data: newChat, error: insertError } = await supabase
      .from("chats")
      .insert([{ user1_id: user.id, user2_id: otherUserId }])
      .select("*");

    if (insertError) {
      console.log("Chat creation error:", insertError);
      return null;
    }

    return newChat[0].id;
  };

  // Fetch messages
  const fetchMessages = async (chatId) => {
    const { data, error } = await supabase
      .from("messages")
      .select("id, sender_id, content, created_at")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    if (!error && data) setMessages(data);
    else console.log("Fetch messages error:", error);
  };

  // Handle user selection
  const handleSelectUser = async (u) => {
    setSelectedUser(u);
    const chat = await getOrCreateChat(u.id);
    if (!chat) return;
    setChatId(chat);

    await fetchMessages(chat);

    // Remove previous channels
    supabase.getChannels().forEach((c) => supabase.removeChannel(c));

    // Realtime messages
    supabase
      .channel(`chat_${chat}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chat}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !chatId) return;

    const { data, error } = await supabase
      .from("messages")
      .insert({
        chat_id: chatId,
        sender_id: user.id,
        content: newMessage.trim(),
      })
      .select()
      .single();

    if (!error && data) {
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    }
  };

  // Scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // -------------------
  // PRESENCE TRACKING
  // -------------------

const isUserOnline = (userId) =>
    onlineUsers.some((u) => u.userId === userId); // fix equality check

const filteredUsers = users.filter(
    (u) =>
      u.username?.toLowerCase().includes(search.toLowerCase()) &&
      u.id !== user?.id
);


  return (
    <section className="mt-2 border shadow bg-white border-gray-300 rounded-[10px] flex flex-col h-full">
      {/* Header */}
      <header className="flex justify-between w-full gap-2 p-4">
        <div className="flex flex-col w-1/2">
          <h1 className="font-medium text-[24px] text-[#373737]">Message</h1>
          <p className="text-[13px] font-normal text-[#373737]">
            Quick, clear, and concise communication
          </p>
        </div>
        <div className="w-1/2">
          <div className="relative w-full h-[50px] bg-[#E8E8E8] rounded-[10px] flex items-center">
            <input
              type="text"
              className="focus:outline-none px-4 w-full text-[16px] font-medium bg-transparent"
              placeholder="Search who you want to talk to here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <iconify-icon
              className="absolute right-3"
              icon="famicons:search"
              width="25"
              height="25"
              style={{ color: "#353535" }}
            />
          </div>
        </div>
      </header>

      <hr className="border-[#D2D2D2] flex-shrink-0" />

      {/* Users */}
      <section className="flex flex-row gap-2 overflow-x-auto p-4 flex-shrink-0 scrollbar-hide">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((u) => (
            <div
              key={u.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleSelectUser(u)}
            >
              <div className="relative h-[45px] w-[45px]">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={u.avatar_url || defaultProfileUrl}
                  alt={u.username}
                />
                <span
                  className={`absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full ${
                    isUserOnline(u.id) ? "bg-[#38CC0B]" : "bg-gray-400"
                  }`}
                ></span>
              </div>
              <p className="text-[#373737] text-[14px] font-medium -mt-1 text-center">
                {u.username}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No users found</p>
        )}
      </section>

      <hr className="border-[#D2D2D2] flex-shrink-0" />

      {/* Chat */}
      {selectedUser ? (
        <section className="flex flex-col min-h-0">
          <header className="p-4 py-2 flex items-center gap-2 border-b flex-shrink-0">
            <img
              className="h-[45px] w-[45px] rounded-full object-cover"
              src={selectedUser.avatar_url || defaultProfileUrl}
              alt=""
            />
            <div className="flex flex-col">
              <p className="text-[#373737] text-[16px] font-medium">
                {selectedUser.username}
              </p>
              <p
                className="text-[13px]"
                style={{
                  color: isUserOnline(selectedUser.id) ? "#03bb0c" : "#999",
                }}
              >
                {isUserOnline(selectedUser.id) ? "Online" : "Offline"}
              </p>
            </div>
          </header>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F4F4F4] min-h-[500px] max-h-[500px] scrollbar-hide">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender_id === user?.id ? "justify-end" : "justify-start"
                } gap-2`}
              >
                {m.sender_id !== user?.id && (
                  <img
                    className="h-[35px] w-[35px] rounded-full object-cover"
                    src={selectedUser.avatar_url || defaultProfileUrl}
                    alt=""
                  />
                )}
                <div
                  className={`px-3 py-2 rounded-lg max-w-[60%] shadow ${
                    m.sender_id === user.id
                      ? "bg-blue-500 text-white"
                      : "bg-white text-[#373737]"
                  }`}
                >
                  <p className="text-[14px]">{m.content}</p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {new Date(m.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 flex-shrink-0">
            <div className="flex bg-white rounded-[10px] shadow items-center px-2">
              <input
                type="text"
                placeholder="Write a message..."
                className="flex-1 px-4 py-2 focus:outline-none text-[16px]"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-9 h-9 flex items-center justify-center"
              >
                <iconify-icon
                  icon="wpf:sent"
                  width="20"
                  height="20"
                  style={{ color: "#fff" }}
                />
              </button>
            </div>
          </div>
        </section>
      ) : (
        <p className="p-4 text-center text-gray-500">
          Select a user to start chatting
        </p>
      )}
    </section>
  );
}

export default Message;
