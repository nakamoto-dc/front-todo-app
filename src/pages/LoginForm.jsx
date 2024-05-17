import { useState } from "react";
import { Button } from "../components/components";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON形式のデータを送信することを指定
          //   "X-AUTH-TOKEN": ``,
        },
        body: JSON.stringify({
          username: name,
          password: password,
        }),
      });
      if (response.ok) {
        console.log("Login successful", response.headers.get("x-auth-token"));
        console.log("Login successful", response);
        localStorage.setItem("JWT", response.headers.get("x-auth-token"));
        router("/protected");
      } else {
        // Error handling
        throw new Error();
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} method="post">
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="name">
            Name:
          </label>
          <input
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:shadow-inner"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password">
            Password:
          </label>
          <input
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:shadow-inner"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button label={"Submit"} />
      </form>
    </div>
  );
};