import { useEffect, useState } from "react";
import "./App.css";
import socket from "./server";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
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

  return (
    <div>
      <div className="App"></div>
    </div>
  );
}

export default App;
