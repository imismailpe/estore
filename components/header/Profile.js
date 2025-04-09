"use client";

import { signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import LoginButton from "../Auth/LoginButton";
import { useEffect } from "react";
import { getUserData } from "../../utils/functions";
import { setUser } from "../../redux/features/user/userSlice";

const Profile = () => {
  const {user, loggedIn} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const getData = async () => {
    const result = await getUserData(session.user.email);
    const resultjson = await result.json();
    if(resultjson.data){
      const data = resultjson.data[0];
      dispatch(setUser(data));
    }
  }
  useEffect(() => {
    if(session?.user?.email){
      //roleId added to session to save user early. using L758
      dispatch(setUser(session?.user));
      getData();
    }
  },[session]);
  return loggedIn ? (
    <div>
      <div>{user.name}</div>
      <button onClick={signOut}>Logout</button>
    </div>
  ) : (
    <LoginButton method={"google"}>Login with Google</LoginButton>
  );
};
export default Profile;
