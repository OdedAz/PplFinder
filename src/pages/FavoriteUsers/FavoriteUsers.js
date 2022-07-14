import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import Home from "pages/Home";
import * as S from "./style";

const FavoriteUsers = () => {
  console.log("favorit users page")
  const users  =  JSON.parse(sessionStorage.getItem("favoritUsers"));
  console.log({users})
  const isLoading = true;
  const dataSorce = "FavoritUsers"
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} dataSorce={dataSorce}/>
      </S.Content>
    </S.Home>
  );
};

export default FavoriteUsers;
