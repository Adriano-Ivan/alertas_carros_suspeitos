const socket = io();

const sendRegularEmit = setInterval(function () {
  socket.emit("request_alert", true);
}, 1000);

sendRegularEmit();

socket.on("send_alerts", (alerts) => {
  if (alerts.length > 0) {
    console.log(alerts);
  }
});
