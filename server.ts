Deno.serve((req) => {
  const upgrade = req.headers.get("upgrade") || "";
  if (upgrade.toLowerCase() != "websocket") {
    return new Response("request isn't trying to upgrade to websocket.");
  }
  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.onopen = () => console.log("socket opened");
  socket.onmessage = (e) => {
    console.log("socket message:", e.data);
    //socket.send(new Date().toString());
    socket.send(`<div hx-swap-oob='beforeend:#chat_room'><p>42: ${e.data['chat_msg']}}</p></div>` )
  };
  socket.onerror = (e) => console.log("socket errored:", JSON.stringify(e));
  socket.onclose = () => console.log("socket closed");
  return response;
});