import { useEffect, useState } from "react";
import "./App.css";
import socket from "./server";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessageList((prevState) => prevState.concat(message));
    });
    askUserName();
  }, []);

  const askUserName = () => {
    const userName = prompt("당신의 닉네임을 입력하세요");
    console.log("[APP]닉네임", userName);

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
    setMessage("");
  };

  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
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
