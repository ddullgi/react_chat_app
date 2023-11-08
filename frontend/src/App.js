import { useEffect, useState } from "react";
import "./App.css";
import socket from "./server";
import InputField from "./components/InputField/InputField";

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("[APP]message:", message);
    });
    askUserName();
  }, []);

  const askUserName = () => {
    const userName = prompt("당신의 닉네임을 입력하세요");
    console.log("[APP]", userName);

    socket.emit("login", userName, (res) => {
      if (res?.ok) {
        setUser(res.data);
        console.log(user);
      } else {
        console.log("[APP] 연결 안됨");
      }
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit("sendMessage", message, (res) => {
      console.log("[APP]sendMessage res:", res);
    });
  };

  return (
    <div>
      <div className="App">
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
