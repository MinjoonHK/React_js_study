import { Card } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";

const UserInformation: React.FC = () => {
  const [userInfo, setUserInfo] = useState(undefined);

  const getUserInfo = async (token: any) => {
    try {
      const decodedToken: any = jwtDecode(token);
      const response = await axios.get("/userinformation", {
        params: { Email: decodedToken.Email },
      });
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    getUserInfo(token);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        margin: "150px",
        justifyContent: "center",
      }}
    >
      <Card
        title={<div style={{ fontSize: "25px" }}>User Information</div>}
        bordered={false}
        style={{
          width: 500,
          border: "gray solid 2px",
        }}
      >
        <div>
          {userInfo ? (
            <>
              <p>{userInfo.LastName}</p>
              <p>{userInfo.FirstName}</p>
              <p>{userInfo.Role}</p>
              <p>{userInfo.Email}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UserInformation;
