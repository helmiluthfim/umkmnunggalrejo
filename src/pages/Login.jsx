import React from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

function Login() {
  return (
    <div>
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  );
}

export default Login;
